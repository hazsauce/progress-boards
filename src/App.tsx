import React, { useState } from "react";
import SelectionPage from "./SelectionPage";
import ZonePage from "./ZonePage";
import "./styles.css";

const App: React.FC = () => {
    const [zone, setZone] = useState<string | null>(null);

    if (zone === "Este") return <ZonePage zone="Este" count={10} goBack={() => setZone(null)} />;
    if (zone === "Central") return <ZonePage zone="Central" count={12} goBack={() => setZone(null)} />;
    if (zone === "Oeste") return <ZonePage zone="Oeste" count={28} goBack={() => setZone(null)} />;
    if (zone === "Sur") return <ZonePage zone="Sur" count={25} goBack={() => setZone(null)} />;
    if (zone === "Apts") return <ZonePage zone="Apts" count={24} goBack={() => setZone(null)} />;
    return <SelectionPage selectZone={setZone} />;
};

export default App;
