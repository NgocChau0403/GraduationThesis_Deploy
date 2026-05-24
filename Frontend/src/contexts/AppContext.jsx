/**
 * AppContext.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * ĐÂY LÀ GÌ?
 *   Global state container của toàn bộ ứng dụng.
 *   Đây là "nguồn sự thật duy nhất" (single source of truth) cho:
 *     - Dataset nào đang được active
 *     - Lịch sử import
 *     - Admin đã từng dùng hệ thống hay chưa
 *
 * TẠI SAO DÙNG CONTEXT THAY VÌ PROPS?
 *   Nhiều màn hình không có quan hệ cha-con trực tiếp đều cần activeDataset:
 *     RoleSelectionPage → AdminConfirmModal → DataSelectionPage
 *     CompleteStep (trong import flow) → cần set activeDataset
 *     StudentDashboardPage → cần đọc activeDataset
 *   Nếu dùng props: phải truyền qua 3-4 layer trung gian = "prop drilling" ❌
 *   Context: mọi component đều có thể useAppContext() trực tiếp ✅
 *
 * STRATEGY KHỞI TẠO: "localStorage first, backend confirm"
 *   Bước 1: Đọc localStorage ngay → UI hiển thị tức thì (không bị trắng màn hình)
 *   Bước 2: Gọi backend để xác nhận → cập nhật nếu có thay đổi
 *   Lý do: Nếu chờ backend xong mới render → latency gây trải nghiệm tệ
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  loadPersistedState,
  saveActiveDataset,
  saveFirstUseFlag,
} from "../services/persistenceService";
import { getActiveDataset, getImportHistory } from "../services/datasetApi";

// ─── Tạo Context ───────────────────────────────────────────────────────────
// Khởi tạo với null để useAppContext() có thể phát hiện nếu dùng ngoài Provider
const AppContext = createContext(null);

// ─── Default Dataset ───────────────────────────────────────────────────────
// OULAD là dataset mặc định của hệ thống theo đúng spec đã chốt.
// Được dùng khi backend chưa có bất kỳ cấu hình nào (lần đầu khởi động).
const DEFAULT_DATASET = {
  id: "SAMPLE_OULAD",
  name: "OULAD Sample Dataset",
  type: "sample",
  source: "OULAD",
  setAt: null,
};

// ─── Provider Component ────────────────────────────────────────────────────
export function AppProvider({ children }) {
  // activeDataset: Dataset đang được toàn hệ thống dùng
  // null → chưa load xong; object → đã có data
  const [activeDataset, setActiveDatasetState] = useState(null);

  // importHistory: Danh sách các lần import thành công trước đó
  // Dùng trong DataSelectionPage để Admin chọn lại dataset cũ
  const [importHistory, setImportHistory] = useState([]);

  // isFirstUse: Admin đã từng vào hệ thống chưa?
  // true → chưa → sau khi chọn role Admin thì vào DataSelectionPage thẳng
  // false → rồi → hiển thị popup xác nhận dataset
  const [isFirstUse, setIsFirstUse] = useState(true);

  // isLoading: true trong khi đang fetch từ backend lần đầu
  // Các component dùng flag này để: disable button, hiện spinner, tránh navigate sai
  const [isLoading, setIsLoading] = useState(true);

  // ─── Initialization Effect ──────────────────────────────────────────────
  useEffect(() => {
    async function initializeAppState() {
      // BƯỚC 1: Đọc localStorage ngay (synchronous, không cần await)
      // → UI có data để render ngay lập tức, không bị trắng màn hình
      const persisted = loadPersistedState();      setIsFirstUse(persisted.isFirstUse);

      if (persisted.activeDataset) {
        // Có cache → hiển thị ngay (optimistic)
        setActiveDatasetState(persisted.activeDataset);
      }

      // BƯỚC 2: Đồng bộ với backend (asynchronous)
      // → Xác nhận state thật, cập nhật nếu có thay đổi từ server
      try {
        const [serverActiveDataset, serverHistory] = await Promise.all([
          getActiveDataset(),   // GET /api/datasets/active
          getImportHistory(),   // GET /api/datasets/history
        ]);

        // Server là nguồn sự thật cuối cùng
        // Nếu server trả về dataset → dùng của server (override cache)
        if (serverActiveDataset) {
          setActiveDatasetState(serverActiveDataset);
          saveActiveDataset(serverActiveDataset); // Cập nhật cache
        } else if (!persisted.activeDataset) {
          // Server trả về null VÀ không có cache → dùng OULAD làm default
          setActiveDatasetState(DEFAULT_DATASET);
          saveActiveDataset(DEFAULT_DATASET);
        }
        // Nếu server trả về null NHƯNG có cache → giữ nguyên cache (đã set ở Bước 1)

        setImportHistory(serverHistory || []);
      } catch (error) {
        // Backend không respond → dùng localStorage cache (offline-first)
        // Nếu cả 2 đều không có → dùng default OULAD
        console.warn(
          "[AppContext] Backend unavailable, using cached/default state:",
          error.message
        );

        if (!persisted.activeDataset) {
          setActiveDatasetState(DEFAULT_DATASET);
        }
      } finally {
        // Luôn tắt loading dù thành công hay thất bại
        // → UI không bị "treo" ở trạng thái loading mãi mãi
        setIsLoading(false);
      }
    }

    initializeAppState();
  }, []); // Chỉ chạy 1 lần khi app mount

  // ─── Actions ────────────────────────────────────────────────────────────

  /**
   * Set dataset mới làm active.
   * Cập nhật cả in-memory state lẫn localStorage cache.
   *
   * useCallback: Đảm bảo reference function ổn định — tránh re-render
   * không cần thiết ở các component dùng function này làm dependency.
   *
   * @param {ActiveDataset} dataset
   */
  const setActiveDataset = useCallback((dataset) => {
    setActiveDatasetState(dataset);
    saveActiveDataset(dataset);
  }, []);

  /**
   * Đánh dấu admin đã dùng hệ thống lần đầu.
   * Sau lần này, mọi lần chọn role Admin sẽ thấy popup xác nhận thay vì
   * đi thẳng vào DataSelectionPage.
   */
  const markAsUsed = useCallback(() => {
    setIsFirstUse(false);
    saveFirstUseFlag(false);
  }, []);

  /**
   * Refresh danh sách import history từ backend.
   * Gọi sau mỗi lần import thành công để DataSelectionPage
   * hiển thị dataset mới vừa import.
   */
  const refreshImportHistory = useCallback(async () => {
    try {
      const history = await getImportHistory();
      setImportHistory(history || []);
    } catch (error) {
      console.warn("[AppContext] Failed to refresh import history:", error.message);
    }
  }, []);

  // ─── Context Value ───────────────────────────────────────────────────────
  // Tất cả state và action được expose ra ngoài qua object này.
  // Các component chỉ destructure những gì mình cần.
  const contextValue = {
    // State
    activeDataset,      // Dataset đang active (có thể null khi đang load)
    importHistory,      // Danh sách import đã thực hiện
    isFirstUse,         // Admin lần đầu dùng không?
    isLoading,          // Đang fetch backend không?

    // Actions
    setActiveDataset,       // fn(dataset) → set dataset mới
    refreshImportHistory,   // fn() → refresh history từ backend
    markAsUsed,             // fn() → đánh dấu đã dùng lần đầu
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Custom Hook ───────────────────────────────────────────────────────────
/**
 * Hook để access AppContext từ bất kỳ component nào.
 *
 * Tại sao không dùng useContext(AppContext) trực tiếp?
 * → Guard clause: nếu vô tình dùng ngoài <AppProvider>, lỗi rõ ràng thay vì
 *   âm thầm nhận được null và crash sau đó ở chỗ khác khó debug hơn.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error(
      "[useAppContext] Must be used within <AppProvider>. " +
      "Wrap your app with <AppProvider> in main.jsx."
    );
  }

  return context;
}

