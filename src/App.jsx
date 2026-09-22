import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Equipment from './pages/Equipment.jsx'
import EquipmentDetails from './pages/EquipmentDetails.jsx'
import NewBooking from './pages/NewBooking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import GuestRoute from './routes/GuestRoute.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetails />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/equipment/:id/book" element={<NewBooking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
