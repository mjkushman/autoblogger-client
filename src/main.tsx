import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App} from './app'
import './index.css'


// Get the root
const root = document.getElementById('root');
if(!root) throw new Error('No root element found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
