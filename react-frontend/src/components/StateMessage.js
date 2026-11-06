/** Empty / error state with an optional action button. */
const StateMessage = ({icon, title, message, variant = 'secondary', action}) => (
    <div className="card state-card text-center">
        <div className="card-body py-5">
            <span className={`state-icon bg-${variant}-subtle text-${variant}-emphasis mb-3`}>
                <i className={`bi ${icon}`}/>
            </span>
            <h2 className="h5 fw-semibold">{title}</h2>
            <p className="text-body-secondary mb-3 mx-auto" style={{maxWidth: 420}}>{message}</p>
            {action}
        </div>
    </div>
);

export default StateMessage;
