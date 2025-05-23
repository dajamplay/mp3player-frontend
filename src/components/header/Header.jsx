import React from 'react';
import {Link} from "react-router-dom";
import styles from './Header.module.css';
import SvgUser from "@/assets/svg/SvgUser.jsx";
import SvgPlaylist from "@/assets/svg/SvgPlaylist.jsx";
import SvgLibrary from "@/assets/svg/SvgLibrary.jsx";
import SvgQueue from "@/assets/svg/SvgQueue.jsx";

const Header = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.menu}>
                <Link to="/" className={styles.menuItem}>
                    <SvgQueue />
                    <div className={styles.menuItemTitle}>Очередь</div>
                </Link>
                <Link to="/library" className={styles.menuItem}>
                    <SvgLibrary />
                    <div className={styles.menuItemTitle}>Библиотека</div>
                </Link>
                <Link to="/playlists" className={styles.menuItem}>
                    <SvgPlaylist />
                    <div className={styles.menuItemTitle}>Плейлисты</div>
                </Link>
                <Link to="/settings" className={styles.menuItem}>
                    <SvgUser />
                    <div className={styles.menuItemTitle}>Профиль</div>
                </Link>
            </nav>
        </div>
    );
};

export default Header;
