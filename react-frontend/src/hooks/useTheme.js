import {useEffect, useState} from 'react';

const STORAGE_KEY = 'theme';

const initialTheme = () => {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
        // storage unavailable (private mode) - fall back to system preference
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/** Light / dark mode using Bootstrap 5.3 color modes (data-bs-theme). */
export const useTheme = () => {
    const [theme, setTheme] = useState(initialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) {
            // ignore
        }
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return {theme, toggle};
};
