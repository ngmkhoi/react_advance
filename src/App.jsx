import '@/App.css'
import AppRoute from '@/components/AppRoute'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "@/components/AuthProvider/index.jsx";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
            <AppRoute />
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
