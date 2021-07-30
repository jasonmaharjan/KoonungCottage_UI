import { Link } from "react-router-dom";
import "./categoriesUI.css";

const CategoriesUI = ({ categories, update }) => {
    return (
        <ul className="categories-list">
            {categories.map((category) => (
                <Link to={`?categoryId=${category.value}`}>
                    <li className="categories-list-item" key={category.value}>
                        {category.label}
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default CategoriesUI;
