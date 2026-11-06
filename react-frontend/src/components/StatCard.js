const StatCard = ({icon, label, value, tone = 'primary'}) => (
    <div className="col-12 col-sm-4">
        <div className="card stat-card h-100">
            <div className="card-body d-flex align-items-center gap-3">
                <span className={`stat-icon bg-${tone}-subtle text-${tone}-emphasis`}>
                    <i className={`bi ${icon}`}/>
                </span>
                <div className="min-w-0">
                    <div className="text-body-secondary small">{label}</div>
                    <div className="fs-5 fw-semibold text-truncate">{value}</div>
                </div>
            </div>
        </div>
    </div>
);

export default StatCard;
