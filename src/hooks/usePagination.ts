import { useState } from 'react'

interface usePaginationType {
    pageSize?: number
    records?: any[]
}

const usePagination = ({ pageSize = 10, records = [] }: usePaginationType) => {
    const [currentPage, setCurrentPage] = useState(0)

    const rangeMin = currentPage * pageSize
    const rangeMax = currentPage * pageSize + pageSize - 1

    const slice = records.filter(
        (_, index) => index >= rangeMin && index <= rangeMax
    )

    const numberOfPages = Math.ceil(records.length / pageSize)

    const firstPage = () => {
        setCurrentPage(0)
    }

    const goTo = (page: number) => {
        setCurrentPage(page)
    }

    const pageBack = () => {
        setCurrentPage((x) => x - 1)
    }

    const pageNext = () => {
        setCurrentPage((x) => x + 1)
    }

    const lastPage = () => {
        setCurrentPage(records.length - 1)
    }

    return {
        slice,
        currentPage,
        firstPage,
        pageBack,
        pageNext,
        lastPage,
        goTo,
        numberOfPages,
    }
}

export default usePagination
