import React, { useMemo, useState } from 'react';
import { useTable, useSortBy ,useGlobalFilter} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { GlobalFilter } from './GlobalFilter';

export const FilteringTable = () => {
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
        state,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [],
            },
        },
        useGlobalFilter,
        useSortBy
    );

    const {globalFIlter} = state

    const handleSort = (column) => {
        setSortDirection(prevDirection => prevDirection === 'desc' ? 'asc' : 'desc');
        column.toggleSortBy(sortDirection === 'desc', false);
    };

    return (
        <>
        <GlobalFilter filter={globalFIlter} setFilter={setGlobalFilter} />
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
        </>
    );
};
