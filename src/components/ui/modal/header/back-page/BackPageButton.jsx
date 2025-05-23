import React from 'react';
import styles from './BackPageButton.module.css';
import SvgBack from "@/assets/svg/SvgBack.jsx";

const BackPageButton = ({onClick}) => {
    return (
        <div className={styles.button} onClick={onClick}>
            <SvgBack />
        </div>
    );
};

export default BackPageButton;