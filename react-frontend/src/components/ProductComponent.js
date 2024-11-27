import { useProductList } from '../hooks/product';
import LoadingComponent from "./LoadingComponent";

const ProductComponent = () => {
    const { 
        data: products, 
        isLoading, 
        err,
    } = useProductList()
   
    return (
        <div className="container mt-5">
            <h2>Products</h2>
            {
                isLoading && <LoadingComponent />
            }
            {
                err && (
                    <div className="alert alert-danger" role="alert">
                        {err}
                    </div>
                )
            }
            {
                (!isLoading && !err)  && (
                    <ul className="list-group">
                        {products.map(product => (
                            <li key={product.id} className="list-group-item">
                                {product.name} - ${product.price}
                            </li>
                        ))}
                    </ul>
                )
            }
            
        </div>
    );
};

export default ProductComponent;
