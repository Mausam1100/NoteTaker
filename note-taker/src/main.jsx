import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster 
      position="top-right" 
      containerStyle={{
        top: 75
      }} 
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #617AFA'
        }}}
    />
    <App />
  </StrictMode>,
)
