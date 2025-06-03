import React from "react";

type SelectionPageProps = {
    selectZone: (zone: string) => void;
};

const SelectionPage: React.FC<SelectionPageProps> = ({ selectZone }) => (
    <div className="page">
        <h1>Select a Zone</h1>
        <div className="selection-buttons">
            <button onClick={() => selectZone("Este")}>Este</button>
            <button onClick={() => selectZone("Central")}>Central</button>
            <button onClick={() => selectZone("Oeste")}>Oeste</button>
            <button onClick={() => selectZone("Sur")}>Sur</button>
        </div>
        <div className="apt-button">
        <button onClick={() => selectZone("Apts")}>Apts</button>
        </div>
    </div>
);

export default SelectionPage;
