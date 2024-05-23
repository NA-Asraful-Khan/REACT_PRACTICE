import React, { useMemo, useState } from 'react';
import { useTable, useColumnOrder, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { GlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';
import { Checkbox } from './Checkbox';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedCountry, setSelectedCountry] = useState('');

    const defaultColumn = useMemo(() => ({
        Filter: ColumnFilter,
    }), []);

    // Extract unique countries
    const uniqueCountries = useMemo(() => {
        const countries = new Set(data.map(item => item.country));
        return Array.from(countries).sort((a, b) => b.localeCompare(a)); // Sort in descending order
    }, [data]);

    const filteredData = useMemo(() => {
        if (selectedCountry) {
            return data.filter(item => item.country === selectedCountry);
        }
        return data;
    }, [data, selectedCountry]);

    const {
        getTableProps,
        getTableBodyProps,
        footerGroups,
        headerGroups,
        rows,
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
        selectedFlatRows,
        setColumnOrder,
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: 10 }, // Initial pagination state
            defaultColumn,
        },
        useColumnOrder,// Hook for Column Ordering
        useGlobalFilter, // Hook for global filtering
        useSortBy, // Hook for sorting
        usePagination, // Hook for pagination
        useRowSelect, // Hook for row selection
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
                },
                ...columns,
            ]);
        }
    );
    // Sorting by column on click 
    const handleSort = column => {
        setSortDirection(prevDirection => (prevDirection === 'desc' ? 'asc' : 'desc'));
        column.toggleSortBy(sortDirection === 'desc', false);
    };
    // Download Functionality 
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows.map(row => row.original));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredData');
        XLSX.writeFile(workbook, 'FilteredData.xlsx');
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = columns.map(col => col.Header);
        const tableRows = rows.map(row => columns.map(col => row.original[col.accessor]));

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save('FilteredData.pdf');
    };

    const printData = () => {
        const printableContent = `
            <html>
                <head>
                    <title>Print Data</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        table, th, td {
                            border: 1px solid black;
                        }
                        th, td {
                            padding: 8px;
                            text-align: left;
                        }
                        .print-button {
                            margin: 10px 0;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <button class="print-button" onclick="window.print()">Print</button>
                    <table>
                        <thead>
                            <tr>
                                ${columns.map(col => `<th>${col.Header}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map(row => `
                                <tr>
                                    ${columns.map(col => `<td>${row.original[col.accessor]}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(printableContent);
        printWindow.document.close();
        // Add a small delay to ensure the content is fully loaded before printing
        printWindow.onload = () => {
            printWindow.print();
        };
    };
    // Change Column Order
    const changeOrder = () => {
        setColumnOrder(['id', 'first_name', 'last_name', 'phone', 'country', 'date_of_birth'])
    }

    return (
        <>
        {/* Column Hiding */}
            <div>
                {
                    allColumns.map((column)=>(
                        <div key={column.id}>
                            <label>
                                <input type="checkbox"{...column.getToggleHiddenProps()} />
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
            {/* Change Column Order */}
            <button onClick={changeOrder}>Change Column Order</button>
            {/* Country filter dropdown */}
            <div>
                <label htmlFor="countryFilter">Filter by Country: </label>
                <select
                    id="countryFilter"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                >
                    <option value="">All Countries</option>
                    {uniqueCountries.map(country => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            {/* Global filter component */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            {/* Table component */}
            <div className="table-container">
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
                                                ? ' 🔽' // Descending sort indicator
                                                : ' 🔼' // Ascending sort indicator
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
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
                {/* <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            </table>
            </div>
            {/* Selected rows information */}
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map(row => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>

            {/* Download buttons */}
            <button onClick={downloadExcel}>Download Excel</button>
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={printData}>Print Data</button>

            {/* Pagination controls */}
            <div>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
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
                    | Go to page:{' '}
                    <input
                        style={{ width: '50px' }}
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(pageNumber);
                        }}
                    />
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
