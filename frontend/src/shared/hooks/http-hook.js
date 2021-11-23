import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController(); // handles errors if the state no longer exists before the function returns data, e.g. if you switch pages while loading
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });

                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl //clean up controllers to completed requests
                );

                console.log(responseData);

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        }, []);

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {  // clean up function runs when the component un-mounts
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort()); // this warning is fine, the value for ...Requests.current is intend to have changed
        };
    }, []);

    return { isLoading, error, sendRequest, clearError }
};