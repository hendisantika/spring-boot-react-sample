/** Skeleton placeholders shown while data is loading. */
const LoadingComponent = ({rows = 3}) => (
    <div className="placeholder-glow" role="status" aria-live="polite">
        <span className="visually-hidden">Loading...</span>
        {Array.from({length: rows}).map((_, i) => (
            <div key={i} className="card mb-3">
                <div className="card-body d-flex align-items-center gap-3">
                    <span className="placeholder rounded-3" style={{width: 48, height: 48}}/>
                    <div className="flex-grow-1">
                        <span className="placeholder col-6 mb-2 d-block"/>
                        <span className="placeholder col-3 d-block"/>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default LoadingComponent;
