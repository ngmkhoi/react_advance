import '@/App.css'
import AppRoute from '@/components/AppRoute'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "@/components/AuthProvider/index.jsx";

function App() {
  // console.log('🔵 App component rendered - Nếu thấy log này = full reload hoặc React re-render');
  
  return (
    <BrowserRouter>
        <AuthProvider>
            <AppRoute />
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
