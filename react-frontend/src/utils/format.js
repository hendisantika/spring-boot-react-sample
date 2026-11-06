const idr = new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0});
const number = new Intl.NumberFormat('id-ID');

export const formatCurrency = (value) => idr.format(Number(value) || 0);
export const formatNumber = (value) => number.format(Number(value) || 0);

export const initials = (name = '') => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    const lettered = words.filter((w) => /^\p{L}/u.test(w));
    return (lettered.length ? lettered : words).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';
};

const HUES = [250, 200, 160, 30, 340, 280, 190, 10];

/** Stable accent hue per name, used for avatar backgrounds. */
export const hueFor = (name = '') => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
    return HUES[Math.abs(hash) % HUES.length];
};
