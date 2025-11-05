import useFetch from "../useFetch";

function Header() {
    const { data: me, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);
    return ( 
        <>
        <div className="d-flex justify-content-between">
        <h2 className="mb-4">Workasana</h2>
        <h5 className="mb-4">{me?.user?.name}</h5>
        </div>
        </>
    );
}

export default Header;