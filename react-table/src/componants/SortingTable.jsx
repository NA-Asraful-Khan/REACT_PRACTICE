import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';

export const SortingTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [sortDirection, setSortDirection] = useState('desc');

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [],
            },
        },
        useSortBy
    );

    const handleSort = (column) => {
        setSortDirection(prevDirection => prevDirection === 'desc' ? 'asc' : 'desc');
        column.toggleSortBy(sortDirection === 'desc', false);
    };

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
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
                                        : ' 🔽🔼'}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    );
};
