import {createContext, useCallback, useContext, useState} from 'react';

const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({children}) => {
    const [toasts, setToasts] = useState([]);

    const notify = useCallback((message, variant = 'success') => {
        const id = Date.now() + Math.random();
        setToasts((current) => [...current, {id, message, variant}]);
        setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3500);
    }, []);

    const dismiss = (id) => setToasts((current) => current.filter((t) => t.id !== id));

    return (
        <ToastContext.Provider value={notify}>
            {children}
            <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast show align-items-center border-0 text-bg-${t.variant}`} role="status">
                        <div className="d-flex">
                            <div className="toast-body d-flex align-items-center gap-2">
                                <i className={`bi ${t.variant === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}/>
                                {t.message}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto"
                                    aria-label="Close" onClick={() => dismiss(t.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
