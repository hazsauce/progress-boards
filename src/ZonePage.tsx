import React, { useState } from "react";

const saveProgress = (zone: string, data: boolean[]) => {
    localStorage.setItem(`progress_${zone}`, JSON.stringify(data));
};

const loadProgress = (zone: string, length: number): boolean[] => {
    const saved = localStorage.getItem(`progress_${zone}`);
    if (saved) return JSON.parse(saved);
    return Array(length).fill(false);
};

type ZonePageProps = {
    zone: string;
    count: number;
    goBack: () => void;
};

const ZonePage: React.FC<ZonePageProps> = ({ zone, count, goBack }) => {
    const [progress, setProgress] = useState<boolean[]>(() => loadProgress(zone, count));
    const [poppingIndexes, setPoppingIndexes] = useState<Set<number>>(new Set());

    const toggleButton = (index: number) => {
        const newProgress = [...progress];
        newProgress[index] = !newProgress[index];
        setProgress(newProgress);
        saveProgress(zone, newProgress);

        // Trigger pop animation on button
        setPoppingIndexes((prev) => new Set(prev).add(index));

        // Remove pop animation class after 300ms (animation duration)
        setTimeout(() => {
            setPoppingIndexes((prev) => {
                const copy = new Set(prev);
                copy.delete(index);
                return copy;
            });
        }, 300);
    };

    return (
        <div className="page">
            <h1>{zone}</h1>
            <div className="grid">
                {progress.map((active, i) => (
                    <button
                        key={i}
                        className={`square ${active ? "active" : ""} ${poppingIndexes.has(i) ? "popping" : ""}`}
                        onClick={() => toggleButton(i)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <button className="back-button" onClick={goBack}>
                Back
            </button>
        </div>
    );
};

export default ZonePage;
