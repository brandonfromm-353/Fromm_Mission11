import './App.css'
import BookList from './BookList'
import CategoryFilter from './CategoryFilter'
import Welcome from './Welcome'
import { useState } from 'react'

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
    <div className="container mt-4">
      <div className='row bg-primary text-white'>
        <Welcome />
      </div>
      <br />
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </div>
        <div className='col-md-9'>
          <BookList selectedCategories={selectedCategories}/>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
