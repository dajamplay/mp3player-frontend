import React from 'react';
import {useRecoilState} from "recoil";
import {userAtom} from "@/atoms.js";
import Button from "@/components/ui/buttons/Button.jsx";
import Loading from "@/components/loading/Loading.jsx";
import styles from './Settings.module.css';

const Settings = () => {

    const [user, setUser] = useRecoilState(userAtom);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    }

    if (!user) {
        return (<div><Loading /></div>);
    }

    return (
        <div className={styles.container}>
            <h1>Настройки</h1>
            <div>Добро пожаловать,</div>
            <div style={{
                marginBottom: '15px',
            }}>{user?.display_name}!</div>
            <Button type={'danger'} onClick={logout}>Выход</Button>
        </div>
    );
};

export default Settings;