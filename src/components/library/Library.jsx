import React, { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { libraryAtom } from "@/atoms.js";
import Track from "@/components/track/Track.jsx";
import styles from './Library.module.css';
import Loading from "@/components/loading/Loading.jsx";
import usePagination from "@/components/ui/pagination/usePagination.jsx";
import Pagination from "@/components/ui/pagination/Pagination.jsx";

const Library = () => {
    const library = useRecoilValue(libraryAtom);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [inputFilterValue, setInputFilterValue] = useState('');
    const { currentPage, totalPages, paginatedItems, handlePageChange } = usePagination(filteredTracks, 100);

    const inputFilterHandler = (e) => {
        setInputFilterValue(e.target.value);
    };

    useEffect(() => {
        if (inputFilterValue === '') {
            setFilteredTracks(library);
        } else {
            setFilteredTracks(filterTracks());
        }
    }, [inputFilterValue, library]);

    const filterTracks = () => {
        return library.filter(track =>
            track.title.toLowerCase().includes(inputFilterValue.toLowerCase())
        );
    };

    const clearInputFilterValue = () => {
        setInputFilterValue('');
    };

    if (!library || library.length === 0) {
        return (<div><Loading /></div>);
    }

    return (
        <>
            <div className={styles.container}>
                <div>
                    <div className={styles.tracksFilterContainer}>
                        <input
                            type="text"
                            className={styles.tracksFilterInput}
                            onChange={inputFilterHandler}
                            value={inputFilterValue}
                        />
                        <div className={styles.tracksFilterButton} onClick={clearInputFilterValue}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fill="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                                <path
                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                            </svg>
                        </div>
                    </div>
                    <div style={{
                        'display': 'flex',
                        'flexWrap': 'wrap',
                    }}>
                        {paginatedItems.map(track =>
                            <Track key={track.id} track={track} isQueue={false} />
                        )}
                    </div>
                </div>

                <div className={styles.pagination}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

            </div>
        </>
    );
};

export default Library;
