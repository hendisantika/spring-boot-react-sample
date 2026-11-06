import {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useOrderList} from '../hooks/order';
import {useProductList} from '../hooks/product';
import {useToast} from '../context/ToastContext';
import {formatCurrency, formatNumber, hueFor, initials} from '../utils/format';
import LoadingComponent from './LoadingComponent';
import PageHeader from './PageHeader';
import StatCard from './StatCard';
import StateMessage from './StateMessage';

const OrderComponent = () => {
    const {data: orders, isLoading, err, reload, create} = useOrderList();
    const {data: products} = useProductList();
    const notify = useToast();
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState({product: searchParams.get('product') ?? '', quantity: 1});
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const preset = searchParams.get('product');
        if (preset) setForm((f) => ({...f, product: preset}));
    }, [searchParams]);

    const priceOf = useMemo(() => {
        const map = new Map(products.map((p) => [p.name, Number(p.price) || 0]));
        return (name) => map.get(name);
    }, [products]);

    const stats = useMemo(() => {
        const items = orders.reduce((sum, o) => sum + (Number(o.quantity) || 0), 0);
        const revenue = orders.reduce((sum, o) => sum + (priceOf(o.product) ?? 0) * (Number(o.quantity) || 0), 0);
        return {count: orders.length, items, revenue};
    }, [orders, priceOf]);

    const selectedPrice = priceOf(form.product);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        if (!event.currentTarget.checkValidity()) return;

        setSaving(true);
        try {
            const created = await create({product: form.product, quantity: Number(form.quantity)});
            notify(`Order #${created.id} placed for ${created.quantity} × ${created.product}`);
            setForm({product: '', quantity: 1});
            setValidated(false);
        } catch (e) {
            notify('Failed to place the order. Please try again.', 'danger');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <PageHeader
                icon="bi-receipt"
                title="Orders"
                subtitle="Orders served by order-service through the API gateway."
                action={
                    <button type="button" className="btn btn-outline-secondary" onClick={reload} disabled={isLoading}>
                        <i className="bi bi-arrow-clockwise me-1"/> Refresh
                    </button>
                }
            />

            <div className="row g-3 mb-4">
                <StatCard icon="bi-receipt-cutoff" label="Total orders" value={formatNumber(stats.count)}/>
                <StatCard icon="bi-basket" label="Items ordered" value={formatNumber(stats.items)} tone="info"/>
                <StatCard icon="bi-cash-stack" label="Estimated revenue" value={formatCurrency(stats.revenue)} tone="success"/>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    {isLoading && <LoadingComponent/>}

                    {!isLoading && err && (
                        <StateMessage icon="bi-wifi-off" variant="danger" title="Something went wrong" message={err}
                                      action={<button className="btn btn-outline-danger" onClick={reload}>
                                          <i className="bi bi-arrow-clockwise me-1"/>Try again</button>}/>
                    )}

                    {!isLoading && !err && orders.length === 0 && (
                        <StateMessage icon="bi-cart-x" title="No orders yet" message="Place your first order using the form."/>
                    )}

                    {!isLoading && !err && orders.length > 0 && (
                        <div className="card table-card">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="ps-4 d-none d-sm-table-cell">Order</th>
                                        <th scope="col" className="ps-3 ps-sm-2">Product</th>
                                        <th scope="col" className="text-center">Qty</th>
                                        <th scope="col" className="text-end pe-3 pe-sm-4">Subtotal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order) => {
                                        const price = priceOf(order.product);
                                        return (
                                            <tr key={order.id}>
                                                <td className="ps-4 text-body-secondary fw-medium d-none d-sm-table-cell">#{order.id}</td>
                                                <td className="ps-3 ps-sm-2">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="avatar avatar-sm" style={{'--hue': hueFor(order.product)}}>
                                                            {initials(order.product)}
                                                        </span>
                                                        <div>
                                                            <div className="fw-semibold">{order.product}</div>
                                                            {price !== undefined &&
                                                                <div className="small text-body-secondary d-none d-sm-block">{formatCurrency(price)} / item</div>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis px-2 px-sm-3">
                                                        {order.quantity}
                                                    </span>
                                                </td>
                                                <td className="text-end pe-3 pe-sm-4 fw-semibold text-nowrap">
                                                    {price !== undefined ? formatCurrency(price * order.quantity) : '—'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-lg-4">
                    <div className="card form-card sticky-lg-top">
                        <div className="card-body p-4">
                            <h2 className="h5 fw-semibold mb-1">New order</h2>
                            <p className="text-body-secondary small mb-4">Pick a product and quantity.</p>
                            <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="order-product" className="form-label">Product</label>
                                    <select id="order-product" className="form-select" required value={form.product}
                                            onChange={(e) => setForm({...form, product: e.target.value})}>
                                        <option value="">Select a product...</option>
                                        {products.map((p) => (
                                            <option key={p.id} value={p.name}>{p.name}</option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">Please choose a product.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="order-quantity" className="form-label">Quantity</label>
                                    <input id="order-quantity" type="number" className="form-control" required min="1"
                                           step="1" value={form.quantity}
                                           onChange={(e) => setForm({...form, quantity: e.target.value})}/>
                                    <div className="invalid-feedback">Quantity must be at least 1.</div>
                                </div>
                                <div className="summary d-flex justify-content-between align-items-center mb-4">
                                    <span className="text-body-secondary">Total</span>
                                    <span className="fs-5 fw-bold">
                                        {selectedPrice !== undefined ? formatCurrency(selectedPrice * (Number(form.quantity) || 0)) : '—'}
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                                    {saving
                                        ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"/>Placing...</>
                                        : <><i className="bi bi-bag-check me-1"/>Place order</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderComponent;
