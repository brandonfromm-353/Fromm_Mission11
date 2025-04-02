import './App.css'
import ProjectsPage from './pages/ProjectsPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  //Changed this to use the CartProvider and routes to handle routing for the application.
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App
