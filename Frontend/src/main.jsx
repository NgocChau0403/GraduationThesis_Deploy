import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './contexts/AppContext.jsx'

// AppProvider wraps everything — bao gồm cả BrowserRouter bên trong App.
// Lý do đặt ở đây (main.jsx) thay vì App.jsx:
//   → Global state không nên phụ thuộc vào routing context
//   → Mọi component trong toàn cây đều có thể useAppContext() ngay lập tức
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)

