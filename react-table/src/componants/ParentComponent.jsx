import React, { useState, useMemo } from 'react';
import { FilteringTable } from './FilteringTable';
import { ColumnFilter } from './ColumnFilter';
import { COLUMNS } from './columns';

export const ParentComponent = () => {
    const [columnFilters, setColumnFilters] = useState(
        COLUMNS.reduce((acc, column) => {
            acc[column.accessor] = '';
            return acc;
        }, {})
    );

    const handleColumnFilterChange = (columnId, value) => {
        setColumnFilters((prevFilters) => ({
            ...prevFilters,
            [columnId]: value,
        }));
    };

    return (
        <>
            <div>
                {COLUMNS.map((column) => (
                    <ColumnFilter
                        key={column.accessor}
                        column={{ ...column, filterValue: columnFilters[column.accessor] }}
                        setFilter={(value) => handleColumnFilterChange(column.accessor, value)}
                    />
                ))}
            </div>
            <FilteringTable setColumnFilters={(cb) => cb(Object.entries(columnFilters).map(([id, value]) => ({ id, value })))} />
        </>
    );
};
