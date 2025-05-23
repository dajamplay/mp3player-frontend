import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    return (
        <div className={styles.paginationContainer}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Назад
            </button>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                    key={page + 1}
                    onClick={() => handlePageClick(page + 1)}
                    className={currentPage === page + 1 ? styles.activeButton : ''}
                >
                    {page + 1}
                </button>
            ))}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Вперед
            </button>
        </div>
    );
};

export default Pagination;
