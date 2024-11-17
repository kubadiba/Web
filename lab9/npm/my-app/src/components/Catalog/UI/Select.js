import React from 'react';
import '../Catalog.css';

export function SelectFilter({ value, onChange, options }) {
    return (
        <div className="filter-container">
            <select value={value} onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
