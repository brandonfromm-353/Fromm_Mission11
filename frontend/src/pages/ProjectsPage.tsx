import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import Welcome from '../components/Welcome';
import CartSummary from './CartSummary';

function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container mt-4">
            <CartSummary />
            <br />
            <Welcome />
            <br />
            <div className='row'>
                {/* This section contains the category filter and uses 3 out of the 12 columns in bootstrap grid */}
                <div className='col-md-3'>
                <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                </div>
                {/* uses 9 in the boostrap grid */}
                <div className='col-md-9'>
                <BookList selectedCategories={selectedCategories}/>
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;