const PageHeader = ({icon, title, subtitle, action}) => (
    <header className="page-header d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
            <span className="page-icon"><i className={`bi ${icon}`}/></span>
            <div>
                <h1 className="h3 fw-bold mb-1">{title}</h1>
                <p className="text-body-secondary mb-0">{subtitle}</p>
            </div>
        </div>
        {action}
    </header>
);

export default PageHeader;
