import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

function Header() {
    const { data: me } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loginToken');
        navigate('/login', { replace: true });
    };

    return (
        <>
            {/* Scoped custom styles for gradient & glass effects */}
            <style>{`
                .header-gradient {
                    background: linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #f59e0b 100%);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                }
                .glass-pill {
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(8px);
                }
                .glass-btn {
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    color: #ffffff;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .glass-btn:hover {
                    background: rgba(255, 255, 255, 0.35) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
                    color: #ffffff !important;
                }
                .glass-btn:active {
                    transform: translateY(0);
                }
            `}</style>

            <header className="d-flex justify-content-between align-items-center px-4 py-3 rounded-bottom-4 shadow-lg header-gradient text-white sticky-top" style={{ zIndex: 1030 }}>
                <h2 className="fw-bold mb-0 fs-3" style={{ letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                    Workasana
                </h2>
                
                <div className="d-flex align-items-center gap-3">
                    {me?.user?.name && (
                        <span className="glass-pill px-3 py-2 rounded-pill fw-medium fs-6">
                            👋 Hello, {me.user.name}
                        </span>
                    )}
                    
                    {me && (
                        <button
                            className="glass-btn btn px-4 py-2 rounded-pill fw-semibold"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;