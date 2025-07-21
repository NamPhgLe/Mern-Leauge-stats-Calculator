import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = window.location.hostname.includes('localhost')
    ? 'http://localhost:5000'
    : import.meta.env.VITE_API_URL;

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState<null | boolean>(null);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/member/protected`, { withCredentials: true })
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <p>Checking authentication...</p>;
    if (!isAuth) return <Navigate to="/signin" />;

    return <>{children}</>;
};

export default RequireAuth;
