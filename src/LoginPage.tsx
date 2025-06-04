import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    onLoginSuccess: () => void;
};

const ADMIN_PASSWORD = "HazSauce";

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem("isAdmin", "true");
            setSuccess(true);
            setError("");
            onLoginSuccess();
        } else {
            setError("Incorrect password");
        }
    };

    const goToSelectionPage = () => {
        navigate("/");
    }

    return (
        <div className="login-page">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
            {success && (
                <>
                    <button onClick={goToSelectionPage}>Go to Selection Page</button>
                </>
            )}
        </div>
    );
};

export default LoginPage;