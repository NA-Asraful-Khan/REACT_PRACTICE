import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

export const FilteringTable = ({ setColumnFilters }) => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [sortDirection, setSortDirection] = useState('desc');

    const defaultColumn = useMemo(()=>{
        return{
            Filter:ColumnFilter
        }
    })

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        setFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [],
            },
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );

    useEffect(() => {
        setColumnFilters((filters) => {
            filters.forEach(({ id, value }) => {
                setFilter(id, value);
            });
        });
    }, [setFilter, setColumnFilters]);

    const { globalFilter } = state;

    const handleSort = (column) => {
        setSortDirection((prevDirection) => (prevDirection === 'desc' ? 'asc' : 'desc'));
        column.toggleSortBy(sortDirection === 'desc', false);
    };

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    onClick={() => handleSort(column)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    );
};
