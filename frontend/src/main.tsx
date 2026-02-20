import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '0.85rem',
            fontWeight: 500,
            background: '#1e1b3a',
            color: '#f1f5f9',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#1e1b3a',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#1e1b3a',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);

