// DateRangeFilter.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DateRangeFilter = ({ column: { filterValue = [], setFilter } }) => {
    const handleChange = (dates) => {
        setFilter(dates);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DatePicker
                selectsRange
                startDate={filterValue[0] || null}
                endDate={filterValue[1] || null}
                onChange={handleChange}
                isClearable={true}
                placeholderText="Select date range"
            />
        </div>
    );
};
