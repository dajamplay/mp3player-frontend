import {useState, useMemo, useEffect} from 'react';

const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items, itemsPerPage]);

    const paginatedItems = useMemo(() => {
        return items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect( () => {
        setCurrentPage(1);
    },[items])

    return {
        currentPage,
        totalPages,
        paginatedItems,
        handlePageChange
    };
};

export default usePagination;
