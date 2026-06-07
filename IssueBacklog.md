## Vấn đề về các task evaluation
- Ưu tiên chạy Profile [DONE], Import [DONE], Task Availability, SQL Correctness, AI Explaination
- Phần 8, 9 để sau để kiểm tra chạy tốt
- Phần 5 và phần 6 không cần viết vào thesis, phần 6 tự kiểm tra bằng mắt 
- [DONE] Bổ sung thêm link cho từng task 
- Check các chart bị fail từ Visualized Evaluation để fix
- System performance: bổ sung log thời gian chạy cho tất cả các bước

## Vấn đề về các tasks:
- Cần check lại task S-T02, S-T04 vì đang giống nhau, cả 2 cùng về risk
- Review là note lại mục đích, logic phần SQL, cách đọc chart cho từng task

## Vấn đề về UI:
- Highlight phần AI explanation: các màu đỏ chỉ dùng cho các risk, vàng cho warning
- [DONE] Dashboard đang bị overview, không scroll được để xem hết nội dung 
- Button Run Analysis View đang không cần thiết
- Các task insufficient thì click vào sẽ hiển thị lý do ở phần chart

## Vấn đề SQL:
- các task đang bị runout time khi chạy SQL
- Test SQL: chạy happy case trước, rồi chạy các trường hợp VS với cùng một SQL nhưng khác student thì kết quả thế nào?
- Viết script tạo index để không bị lỗi timeout
- Load dataset khác, cần kiểm tra lại

## Vấn đề về Ai explanation
- Hỏi Ai cần thông tin gì để đánh giá, có thể dùng file log
- Implement task-aware summarizer thay cho giới hạn row data truyền vào câu prompt
- (để sau) Phần 7: lấy file log cho codex đánh giá, human survey 

## Task 6/6/2026
- [DONE] viết evaluation md của bug 20 rows theo format -> gửi thầy 

