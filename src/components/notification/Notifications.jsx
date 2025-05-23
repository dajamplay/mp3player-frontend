import React, { useState, useEffect } from 'react';
import styles from './Notification.module.css';
import { emitter } from "@/emitter.js";

const Notifications = () => {
    const [notification, setNotification] = useState('');
    const [isShow, setIsShow] = useState(false);

    let timer;

    const closeNotification = () => {
        clearTimeout(timer);
        setIsShow(false);
        setNotification('');
    }

    const openNotification = ({ message}) => {
        clearTimeout(timer);
        setIsShow(true);
        setNotification(message);

        timer = setTimeout(() => {
            closeNotification();
        }, 3000);
    }

    useEffect( () => {
        emitter.off('notify');
        emitter.on('notify', openNotification);
        return () => {emitter.off('notify')};
    }, [])

    return (
        <>
            <div className={styles.container} onClick={closeNotification} style={{
                'top': isShow ? '0' : '-150px',
            }}>
                <div className={styles.message}>{notification}</div>
            </div>
        </>
    );
};

export default Notifications;
