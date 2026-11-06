import {useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {useProductList} from '../hooks/product';
import {useToast} from '../context/ToastContext';
import {formatCurrency, formatNumber, hueFor, initials} from '../utils/format';
import LoadingComponent from './LoadingComponent';
import PageHeader from './PageHeader';
import StatCard from './StatCard';
import StateMessage from './StateMessage';

const emptyForm = {name: '', price: ''};

const ProductComponent = () => {
    const {data: products, isLoading, err, reload, create} = useProductList();
    const notify = useToast();
    const nameRef = useRef(null);
    const [query, setQuery] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [validated, setValidated] = useState(false);
    const [saving, setSaving] = useState(false);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q ? products.filter((p) => p.name?.toLowerCase().includes(q)) : products;
    }, [products, query]);

    const stats = useMemo(() => {
        const prices = products.map((p) => Number(p.price) || 0);
        const total = prices.reduce((a, b) => a + b, 0);
        return {
            count: products.length,
            average: prices.length ? total / prices.length : 0,
            highest: prices.length ? Math.max(...prices) : 0,
        };
    }, [products]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(true);
        if (!event.currentTarget.checkValidity()) return;

        setSaving(true);
        try {
            const created = await create({name: form.name.trim(), price: Number(form.price)});
            notify(`"${created.name}" added to the catalog`);
            setForm(emptyForm);
            setValidated(false);
        } catch (e) {
            notify('Failed to save the product. Please try again.', 'danger');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <PageHeader
                icon="bi-box-seam"
                title="Products"
                subtitle="Browse the catalog served by product-service."
                action={
                    <button type="button" className="btn btn-primary" onClick={() => nameRef.current?.focus()}>
                        <i className="bi bi-plus-lg me-1"/> Add product
                    </button>
                }
            />

            <div className="row g-3 mb-4">
                <StatCard icon="bi-boxes" label="Total products" value={formatNumber(stats.count)}/>
                <StatCard icon="bi-calculator" label="Average price" value={formatCurrency(stats.average)} tone="info"/>
                <StatCard icon="bi-gem" label="Highest price" value={formatCurrency(stats.highest)} tone="warning"/>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="input-group search-box mb-3">
                        <span className="input-group-text"><i className="bi bi-search"/></span>
                        <input type="search" className="form-control" placeholder="Search products..."
                               aria-label="Search products" value={query}
                               onChange={(e) => setQuery(e.target.value)}/>
                    </div>

                    {isLoading && <LoadingComponent/>}

                    {!isLoading && err && (
                        <StateMessage icon="bi-wifi-off" variant="danger" title="Something went wrong" message={err}
                                      action={<button className="btn btn-outline-danger" onClick={reload}>
                                          <i className="bi bi-arrow-clockwise me-1"/>Try again</button>}/>
                    )}

                    {!isLoading && !err && filtered.length === 0 && (
                        <StateMessage icon="bi-inbox" title={query ? 'No matching products' : 'No products yet'}
                                      message={query ? `Nothing matches "${query}".` : 'Add your first product using the form.'}/>
                    )}

                    {!isLoading && !err && filtered.length > 0 && (
                        <div className="row row-cols-1 row-cols-md-2 g-3">
                            {filtered.map((product) => (
                                <div key={product.id} className="col">
                                    <div className="card product-card h-100">
                                        <div className="card-body d-flex gap-3">
                                            <span className="avatar" style={{'--hue': hueFor(product.name)}}>
                                                {initials(product.name)}
                                            </span>
                                            <div className="flex-grow-1 min-w-0">
                                                <div className="d-flex justify-content-between align-items-start gap-2">
                                                    <h2 className="h6 fw-semibold mb-1 text-truncate" title={product.name}>{product.name}</h2>
                                                    <span className="badge rounded-pill bg-body-tertiary text-body-secondary border">#{product.id}</span>
                                                </div>
                                                <div className="price">{formatCurrency(product.price)}</div>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 pt-0 pb-3 px-3">
                                            <Link to={`/orders?product=${encodeURIComponent(product.name)}`}
                                                  className="btn btn-sm btn-outline-primary w-100">
                                                <i className="bi bi-cart-plus me-1"/> Order this
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-lg-4">
                    <div className="card form-card sticky-lg-top">
                        <div className="card-body p-4">
                            <h2 className="h5 fw-semibold mb-1">New product</h2>
                            <p className="text-body-secondary small mb-4">Add an item to the catalog.</p>
                            <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="product-name" className="form-label">Name</label>
                                    <input id="product-name" ref={nameRef} className="form-control" required maxLength={255}
                                           placeholder="e.g. Mechanical Keyboard" value={form.name}
                                           onChange={(e) => setForm({...form, name: e.target.value})}/>
                                    <div className="invalid-feedback">Please enter a product name.</div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="product-price" className="form-label">Price</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">Rp</span>
                                        <input id="product-price" type="number" className="form-control" required min="1"
                                               step="any" placeholder="250000" value={form.price}
                                               onChange={(e) => setForm({...form, price: e.target.value})}/>
                                        <div className="invalid-feedback">Price must be greater than 0.</div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={saving}>
                                    {saving
                                        ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true"/>Saving...</>
                                        : <><i className="bi bi-check2-circle me-1"/>Save product</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductComponent;
