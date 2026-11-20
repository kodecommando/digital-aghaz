import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { installExtensionErrorGuard } from './lib/extensionGuard';

installExtensionErrorGuard();

createRoot(document.getElementById('root')!).render(<App />);
