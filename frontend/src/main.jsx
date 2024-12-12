import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter , Route, Routes } from 'react-router-dom';


// createRoot 查找 HTML 文件中 id="root" 的 DOM 元素并将 React 应用挂载到该元素上。
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </StrictMode>,
)
