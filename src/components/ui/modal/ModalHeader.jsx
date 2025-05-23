import React from 'react';
import BackPageButton from "@/components/ui/modal/header/back-page/BackPageButton.jsx";
import ModalTitle from "@/components/ui/modal/title/ModalTitle.jsx";
import styles from './ModalHeader.module.css';

const ModalHeader = ({onClose, title, height = 50}) => {
    return (
        <div className={styles.container} style={{
            height: height + 'px',
        }}>
            <BackPageButton onClick={onClose}/>
            <ModalTitle>{title}</ModalTitle>
        </div>
    );
};

export default ModalHeader;