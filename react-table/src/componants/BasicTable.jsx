import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    console.log(data)

    const tableInstance = useTable({
        columns: columns,
        data: data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup,index) => (
                    <tr key={index-1} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column,index) => (
                            <th key={index+1} {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row,index)=>{
                        prepareRow(row)
                        return(
                            <tr key={index} {...row.getRowProps()}>
                                {
                                    row.cells.map((cell,index) =>{
                                        <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
