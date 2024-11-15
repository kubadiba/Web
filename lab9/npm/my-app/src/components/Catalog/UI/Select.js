
import React from 'react';
import '../Catalog.css';


export function SelectFilter({ onChange, options }) {
    return (
        <div className="filter-container">
            <select onChange={onChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
