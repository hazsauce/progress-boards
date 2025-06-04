import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";

import SelectionPage from "./SelectionPage";
import ZonePage from "./ZonePage";
import LoginPage from "./LoginPage";
import './styles.css';

// Main App Component
const App: React.FC = () => {
    // Admin state controlled by localStorage
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");

    // Called after a successful login
    const handleLoginSuccess = () => {
        localStorage.setItem("isAdmin", "true");
        setIsAdmin(true);
    };

    return (
        <Router>
            <Routes>
                {/* Public selection screen (home) */}
                <Route path="/" element={<SelectionPage selectZone={(zone) => window.location.href = `/zone/${zone}`} />} />


                {/* Hidden admin login page — only accessible if you go directly to /login */}
                <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

                {/* Dynamic zone pages like /zone/Oeste or /zone/Sur */}
                <Route path="/zone/:zoneName" element={<ZoneRoute isAdmin={isAdmin} />} />

                {/* Catch-all route: redirect to home if unknown path */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;

// ✅ ZoneRoute: Handles routing to the correct ZonePage
const ZoneRoute: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
    const { zoneName } = useParams<{ zoneName: string }>();

    // Fallback: if no zone name in URL, redirect home
    if (!zoneName) return <Navigate to="/" />;

    // Define the button count for each zone
    const zoneCounts: Record<string, number> = {
        Este: 10,
        Central: 12,
        Oeste: 28,
        Sur: 25,
        Apts: 24,
    };

    const count = zoneCounts[zoneName];

    // Redirect to home if zone doesn't exist
    if (!count) return <Navigate to="/" />;

    return (
        <ZonePage
            zone={zoneName}
            count={count}
            goBack={() => window.history.back()} // allows "Back" navigation
            isAdmin={isAdmin}
        />
    );
};
