import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import AuthProvider from './AuthProvider.tsx'
import EmailProvider from './EmailProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <EmailProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmailProvider>
    </AuthProvider>
  </React.StrictMode>
)
