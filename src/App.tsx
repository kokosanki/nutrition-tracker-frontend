import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import Signup from './pages/Signup/Signup.tsx'

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
