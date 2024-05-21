import PaginationType from '@/types/PaginationType'
import { useEffect, useState } from 'react'
import { CSSProperties } from 'styled-components'
import Button from './button'
import { Icon } from './icon'
import Skeleton from './skeleton'

export interface TableColumnDefinition<T> {
    alignment?: 'left' | 'center' | 'right'
    fixedColumn?: boolean
    header: string
    sortable?: boolean
    hide?: boolean
    valueModifier?: (row: T) => React.ReactNode
    width?: number
}

export interface TableColumn<T> {
    [key: string]: TableColumnDefinition<T> | undefined
}

interface TableType<T> {
    columns: TableColumn<T>
    getRowIndex?: (row: T) => any
    disableSort?: boolean
    fixedHeight?: boolean
    requestData: (pagination: PaginationType) => Promise<{
        current?: number
        size?: number
        pageSize: number
        count: number
        result: T[]
    }>
    requestDataDependencies?: any
    initialSort?: {
        sortField?: string
        sortDirection?: 'ASC' | 'DESC'
    }
    pageSize?: number
    pageSizeOptions?: number[]
}

const ApiTable = <T,>({
    columns,
    getRowIndex = (row) => (row as any)?._id,
    disableSort = false,
    fixedHeight = false,
    requestData,
    requestDataDependencies = [],
    initialSort,
    pageSize = 8,
}: TableType<T>) => {
    const [sort, setSort] = useState<[string, 'ASC' | 'DESC']>([
        initialSort?.sortField || 'id',
        initialSort?.sortDirection || 'ASC',
    ])
    const [totalOfPages, setTotalOfPages] = useState<number>(0)
    const [count, setCount] = useState<number>(0)
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
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        setCurrentPage(0)
    }, [pageSize])

    useEffect(() => {
        setLoading(true)
        requestData({
            current: currentPage,
            size: pageSize,
            sortField: sort[0],
            sortDirection: sort[1],
        })
            .then((apiData) => {
                setData(apiData.result)
                setTotalOfPages(apiData.pageSize)
                setCount(apiData.count)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [currentPage, sort, ...requestDataDependencies, pageSize])

    return (
        <div
            className="componentTable"
            style={{ '--page-size': pageSize } as CSSProperties}
        >
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
                        data.map((row: any, rowIndex) => {
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
                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan={innerColumns.length}>
                                Nenhum registro encontrado
                            </td>
                        </tr>
                    )}
                </tbody>

                {(totalOfPages > 1 || pageSize > 10) && (
                    <tfoot>
                        <tr>
                            <td
                                className="stickyColumnPagination"
                                colSpan={Object.keys(columns).length}
                            >
                                <div className="componentTable__pagination">
                                    <Button
                                        variant="secondary"
                                        disabled={currentPage === 0}
                                        leftSpace={
                                            <Icon>
                                                keyboard_double_arrow_left
                                            </Icon>
                                        }
                                        onClick={() => setCurrentPage(0)}
                                    />
                                    <Button
                                        variant="secondary"
                                        disabled={currentPage === 0}
                                        leftSpace={
                                            <Icon>keyboard_arrow_left</Icon>
                                        }
                                        onClick={() =>
                                            setCurrentPage((x) => x - 1)
                                        }
                                    />
                                    {new Array(totalOfPages)
                                        .fill(null)
                                        .map((_, index) => {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant={
                                                        currentPage !== index
                                                            ? 'secondary'
                                                            : 'primary'
                                                    }
                                                    disabled={
                                                        currentPage === index
                                                    }
                                                    onClick={() => {
                                                        setCurrentPage(index)
                                                    }}
                                                    leftSpace={index + 1}
                                                />
                                            )
                                        })}
                                    <Button
                                        variant="secondary"
                                        disabled={
                                            currentPage + 1 === totalOfPages
                                        }
                                        leftSpace={
                                            <Icon>keyboard_arrow_right</Icon>
                                        }
                                        onClick={() =>
                                            setCurrentPage((x) => x + 1)
                                        }
                                    />
                                    <Button
                                        variant="secondary"
                                        disabled={
                                            currentPage + 1 === totalOfPages
                                        }
                                        leftSpace={
                                            <Icon>
                                                keyboard_double_arrow_right
                                            </Icon>
                                        }
                                        onClick={() =>
                                            setCurrentPage(totalOfPages - 1)
                                        }
                                    />
                                    {count > 0 && (
                                        <Button
                                            className="componentTable__pagination_pageShow"
                                            variant="ghost"
                                            disabled={true}
                                            leftSpace={`Mostrando ${data.length} de ${
                                                count === 1
                                                    ? '1 registro'
                                                    : `${count} registros`
                                            }`}
                                            style={{
                                                padding: '0 10px',
                                                width: 'auto',
                                            }}
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    )
}

export default ApiTable
