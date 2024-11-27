import { useOrderList } from "../hooks/order";
import LoadingComponent from "./LoadingComponent";

const OrderComponent = () => {
    const { 
        data: orders,
        isLoading,
        err,
    } = useOrderList()

    return (
        <div className="container mt-5">
            <h2>Orders</h2>
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
                (!isLoading && !err)  &&  (
                    <ul className="list-group">
                        {orders.map(order => (
                            <li key={order.id} className="list-group-item">
                                {order.product} - {order.quantity}
                            </li>
                        ))}
                    </ul>
                )
             }
            
        </div>
    );
};

export default OrderComponent;
