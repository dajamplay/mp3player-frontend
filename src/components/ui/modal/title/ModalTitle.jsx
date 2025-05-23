import React from 'react';
import styles from './ModalTitle.module.css';

const ModalTitle = ({children}) => {
    return (
        <div className={styles.title}>
            {children}
        </div>
    );
};

export default ModalTitle;