import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { Provider as ReduxProvider } from 'react-redux'
import { persistor, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </ReduxProvider>,
)
