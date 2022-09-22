import { CategoryPreviewContainer, Preview, CategoryTitle } from './category-preview.styles.jsx';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, products}) => {
    return (
        <CategoryPreviewContainer>
            <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4).map(product => 
                        <ProductCard key={product.id} product={product} />
                    )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;