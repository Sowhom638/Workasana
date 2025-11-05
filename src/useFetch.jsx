import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('loginToken');
            const headers = {
                'Content-Type': 'application/json'
            }
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                headers: headers
            })
            if (response.status === 401) {
                // Token is expired/invalid → log out
                localStorage.removeItem('loginToken'); // Removing expired token from localstorage
                navigate('/login', { replace: true });
                return;
            }
            if (!response.ok) {
                throw new Error("Failed to fetch data");

            }
            const result = await response.json();
            setData(result);
        }
        fetchData().catch(err => setError(err.message)).finally(() => setLoading(false));
    }, [url])

    return { data, loading, error };
}

export default useFetch;