import React from "react";
import Button from "@/components/ui/buttons/Button.jsx";
import styles from './DialogWindow.module.css';

function DialogWindow({ isOpen, title, children, onClose, onSubmit }) {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles.backgroundContainer} onClick={onClose}/>

            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>

                <div className={styles.bodyContainer}>
                    {children}
                </div>

                <div className={styles.buttonsContainer}>
                    <Button onClick={onSubmit} type={'success'}>Ok</Button>
                    <Button onClick={onClose} type={'danger'}>Отмена</Button>
                </div>
            </div>

        </>
    );
}

export default DialogWindow;
