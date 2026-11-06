import {useCallback, useEffect, useState} from 'react';

/**
 * Loads a list from the API and exposes helpers to reload it and to create a new item.
 */
export const useResource = (fetchAll, createOne, label) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState('');

    const reload = useCallback(async () => {
        setIsLoading(true);
        setErr('');
        try {
            const response = await fetchAll();
            setData(response.data ?? []);
        } catch (e) {
            setErr(`Could not load ${label}. Make sure the API gateway and services are running.`);
        } finally {
            setIsLoading(false);
        }
    }, [fetchAll, label]);

    const create = useCallback(async (payload) => {
        const response = await createOne(payload);
        setData((current) => [...current, response.data]);
        return response.data;
    }, [createOne]);

    useEffect(() => {
        reload();
    }, [reload]);

    return {data, isLoading, err, reload, create};
};
