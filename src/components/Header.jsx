import { MdDangerous } from "react-icons/md";
import useFetch from "../useFetch";

function Header() {
    const { data: me, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);
    function handleLogout() {
        localStorage.removeItem('loginToken');
        window.location.reload();
        navigate('/login', { replace: true });
    }
    return (
        <>
            <div className="d-flex justify-content-between">
                <h2 className="mb-4">Workasana</h2>
                <div className="d-flex gap-2">
                    <h5 className="mb-4">{me?.user?.name}</h5>
                    {me && me?.user && <button className="mb-4 border border-danger p-1 rounded" style={{height: "fit-content"}} onClick={handleLogout}>Logout</button>}
                </div>

            </div>
        </>
    );
}

export default Header;