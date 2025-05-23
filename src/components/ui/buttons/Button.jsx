import React from 'react';
import styles from './Button.module.css';

const Button = ({ type = 'primary', children, onClick }) => {
    const buttonStyles = {
        primary: {
            backgroundColor: '#0d6efd',
            color: '#fff',
            border: '1px solid #0d6efd',
        },
        secondary: {
            backgroundColor: '#6c757d',
            color: '#fff',
            border: '1px solid #6c757d',
        },
        success: {
            backgroundColor: '#198754',
            color: '#fff',
            border: '1px solid #198754',
        },
        danger: {
            backgroundColor: '#dc3545',
            color: '#fff',
            border: '1px solid #dc3545',
        },
        warning: {
            backgroundColor: '#ffc107',
            color: '#000',
            border: '1px solid #ffc107',
        },
        info: {
            backgroundColor: '#0dcaf0',
            color: '#000',
            border: '1px solid #0dcaf0',
        },
    };

    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{...buttonStyles[type]}}
        >
            {children}
        </button>
    );
};

export default Button;
