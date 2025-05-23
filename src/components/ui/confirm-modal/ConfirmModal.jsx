import React from 'react';
import styles from './ConfirmModal.module.css';
import ReactDOM from 'react-dom';
import Button from "@/components/ui/buttons/Button.jsx";

const ConfirmModal = ({ message, resolve }) => {

    const handleConfirm = () => resolve(true);
    const handleCancel = () => resolve(false);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>{message}</h1>
            </div>

            <div className={styles.buttonsContainer}>
                <div className={styles.button}>
                    <Button type={'success'} onClick={handleConfirm}>Да</Button>
                </div>
                <div className={styles.button}>
                    <Button type={'warning'} onClick={handleCancel}>Отмена</Button>
                </div>
            </div>
        </div>
    );
};

export const confirmModal = async (message) => {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const cleanup = () => ReactDOM.unmountComponentAtNode(container);

        const resolveWithCleanup = (result) => {
            cleanup();
            resolve(result);
        };

        ReactDOM.render(
            <ConfirmModal message={message} resolve={resolveWithCleanup} />,
            container
        );
    });
};