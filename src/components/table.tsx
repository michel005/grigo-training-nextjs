import usePagination from '@/hooks/usePagination'
import { SortUtils } from '@/utils/sortUtils'
import { useState } from 'react'
import Button from './button'
import { Icon } from './icon'
import Skeleton from './skeleton'
import { TableColumn } from '@/components/apiTable'

interface TableType<T> {
    columns: TableColumn<T>
    data: T[]
    getRowIndex?: (row: T) => any
    loading?: boolean
    disableSort?: boolean
    fixedHeight?: boolean
    requestData?: (pagination: {
        current: number
        size: number
    }) => Promise<T[]>
}

const Table = <T,>({
    columns,
    data,
    getRowIndex = (row) => (row as any)?._id,
    loading,
    disableSort = false,
    fixedHeight = false,
}: TableType<T>) => {
    const [sort, setSort] = useState<[string, 'ASC' | 'DESC']>(['id', 'ASC'])
    const [hover, setHover] = useState<string | null>(null)
    const [rowHover, setRowHover] = useState<number | null>(null)
    const innerColumns = Object.keys(columns)
        .filter((column) =>
            !!columns[column]?.hide ? !columns[column]?.hide : true
        )
        .map((column) => ({
            ...columns[column],
            column,
        }))
    const pageSize = 10

    const pagination = usePagination({
        pageSize,
        records: disableSort
            ? data
            : data.sort((x, y) => SortUtils.sort(x, y, sort[0], sort[1])),
    })

    return (
        <div className="componentTable">
            <table
                className={`componentTable__table ${fixedHeight && 'componentTable__fixedHeight'}`}
            >
                <thead>
                    <tr>
                        {innerColumns.map((column) => {
                            return (
                                <th
                                    key={column.column}
                                    className={`${hover === column.column && 'componentTable__hoverColumn'} ${column.alignment || 'left'} ${column.fixedColumn && 'stickyColumn'}`}
                                    style={{
                                        width: !!column.width
                                            ? `${column.width}px`
                                            : 'auto',
                                    }}
                                    onMouseOver={() => setHover(column.column)}
                                    onMouseOut={() => setHover(null)}
                                >
                                    <Button
                                        disabled={disableSort}
                                        variant="link"
                                        className={column.alignment || 'left'}
                                        style={{ textDecoration: 'none' }}
                                        rightSpace={
                                            (column.sortable === undefined
                                                ? true
                                                : column.sortable) &&
                                            sort[0] === column.column && (
                                                <Icon>
                                                    {sort[1] === 'DESC'
                                                        ? 'keyboard_arrow_up'
                                                        : 'keyboard_arrow_down'}
                                                </Icon>
                                            )
                                        }
                                        onClick={() => {
                                            if (
                                                disableSort ||
                                                column.sortable === false
                                            ) {
                                                return
                                            }
                                            setSort(([col, dir]) => {
                                                return [
                                                    column.column,
                                                    col === column.column &&
                                                    dir === 'ASC'
                                                        ? 'DESC'
                                                        : 'ASC',
                                                ]
                                            })
                                        }}
                                    >
                                        <p>{column.header}</p>
                                    </Button>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {loading &&
                        new Array(fixedHeight ? pageSize : 1)
                            .fill(null)
                            .map((_, index) => (
                                <tr key={index}>
                                    <td colSpan={innerColumns.length}>
                                        <Skeleton height={40} />
                                    </td>
                                </tr>
                            ))}
                    {!loading &&
                        pagination.slice.map((row, rowIndex) => {
                            return (
                                <tr
                                    className={
                                        rowHover === rowIndex - 1 ||
                                        rowHover === rowIndex + 1
                                            ? 'componentTable__closeToHoveredRow'
                                            : ''
                                    }
                                    key={getRowIndex?.(row)}
                                    onMouseOver={() => setRowHover(rowIndex)}
                                    onMouseOut={() => setRowHover(null)}
                                >
                                    {innerColumns.map((column) => {
                                        return (
                                            <td
                                                key={`row_${rowIndex}_column_${column.column}`}
                                                style={{
                                                    width: `${column.width || 200}px`,
                                                    maxWidth: `${column.width || 200}px`,
                                                    minWidth: `${column.width || 200}px`,
                                                }}
                                                className={`${hover === column.column && 'componentTable__hoverColumn'} ${column.alignment || 'left'} ${column.fixedColumn && 'stickyColumn'}`}
                                            >
                                                {column.valueModifier
                                                    ? column.valueModifier(row)
                                                    : row?.[column.column]}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    {!loading && pagination.slice.length === 0 && (
                        <tr>
                            <td colSpan={innerColumns.length}>
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    )}
                </tbody>
                {pagination.numberOfPages > 1 && (
                    <tfoot>
                        <tr>
                            <td
                                className="stickyColumnPagination"
                                colSpan={Object.keys(columns).length}
                            >
                                <div className="componentTable__pagination">
                                    <Button
                                        disabled={pagination.currentPage === 0}
                                        leftSpace={
                                            <Icon>keyboard_arrow_left</Icon>
                                        }
                                        onClick={() => pagination.pageBack()}
                                    />
                                    {new Array(pagination.numberOfPages)
                                        .fill(null)
                                        .map((_, pageNumber) => {
                                            return (
                                                <Button
                                                    key={pageNumber}
                                                    onClick={() => {
                                                        pagination.goTo(
                                                            pageNumber
                                                        )
                                                    }}
                                                    variant={
                                                        pageNumber ===
                                                        pagination.currentPage
                                                            ? 'primary'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {pageNumber + 1}
                                                </Button>
                                            )
                                        })}
                                    <Button
                                        disabled={
                                            pagination.currentPage + 1 ===
                                            pagination.numberOfPages
                                        }
                                        leftSpace={
                                            <Icon>keyboard_arrow_right</Icon>
                                        }
                                        onClick={() => pagination.pageNext()}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    )
}

export default Table
