import { useEffect, useState } from "react";
import './CategoryFilter.css';

function CategoryFilter({selectedCategories, setSelectedCategories}: {selectedCategories: (string[]),  setSelectedCategories: (categories: string[]) => void})
{
    const [categories, setCategories] = useState<string[]>([]);

    // fetches the categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://localhost:5004/api/Book/GetCategoryTypes");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // handles the checkboxes and update them when one gets checked or unchecked
    function handleCheckboxChange({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((x) => x !== target.value)
            : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }

    // the physical component that displays the categories and checkboxes
    return (
        <div className="card p-1 shadow-sm">
            <h5 className="card-title text-center mb-3">Categories</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="form-check">
                        <input 
                            type="checkbox" 
                            id={c} 
                            value={c} 
                            className="form-check-input" 
                            onChange={handleCheckboxChange}
                            checked={selectedCategories.includes(c)}
                        />
                        <label htmlFor={c} className="form-check-label">{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;