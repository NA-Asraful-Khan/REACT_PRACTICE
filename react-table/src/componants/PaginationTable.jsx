import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [sortDirection, setSortDirection] = useState('desc');
    

    const defaultColumn = useMemo(() => ({
        Filter: ColumnFilter
    }), []);

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        headerGroups,
        page,
        prepareRow,
        setPageSize,
        state: { globalFilter, pageIndex, pageSize },
        setGlobalFilter,
        gotoPage,
        nextPage,
        previousPage,
        pageCount,
        canPreviousPage,
        canNextPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Initial pagination state
            defaultColumn
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

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
                    {page.map((row) => {
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
            {/* Pagination Controls */}
            <div>
                <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageCount}
                    </strong>{' '}
                </span>
                <span>
                    |Go to page:{" "}
                    <input type="number" defaultValue={pageIndex+1} onChange={e=>{
                        const pageNumber = e.target.value ? Number(e.target.value)-1:0
                        gotoPage(pageNumber)
                    }} />
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
