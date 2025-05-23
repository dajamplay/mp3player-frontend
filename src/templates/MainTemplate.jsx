import React from 'react';
import styles from '@/templates/MainTemplate.module.css';

const MainTemplate = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default MainTemplate;