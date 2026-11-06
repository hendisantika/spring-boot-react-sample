const Footer = () => (
    <footer className="border-top py-4 mt-5">
        <div className="container d-flex flex-column flex-sm-row justify-content-between gap-2 small text-body-secondary">
            <span>MicroShop &middot; Spring Boot microservices + React</span>
            <span className="d-flex gap-3">
                <span><i className="bi bi-hdd-network me-1"/>Eureka</span>
                <span><i className="bi bi-signpost-split me-1"/>Spring Cloud Gateway</span>
            </span>
        </div>
    </footer>
);

export default Footer;
