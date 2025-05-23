import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RecoilRoot } from 'recoil';
import './app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RecoilRoot>
          <App />
      </RecoilRoot>
  </StrictMode>
)
