import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {userAtom} from "@/atoms.js";
import {getToken, validateToken} from "@/api/token.js";
import styles from './LoginForm.module.css';
import Loading from "@/components/loading/Loading.jsx";

const LoginForm = () => {

    const [user, setUser] = useRecoilState(userAtom);
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState('');
    const [logging, setLogging] = useState(false);

    const onChangeLogin = (e) => {
        setLoginValue(e.target.value);
    }

    const onChangePassword = (e) => {
        setPasswordValue(e.target.value);
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await loginHandler();
        }
    };

    const loginHandler = async () => {
        setLogging(true);
        setError('');

        const token = await getToken(loginValue, passwordValue);

        if (token) {
            localStorage.setItem('token', token);
            await login(token);
        } else {
            setError('Неверный логин или пароль.');
        }

        setLogging(false);
    }

    const login = async (token) => {
        setLogging(true);
        setError('');

        const user = await validateToken(token);

        if (user) {
            setUser(user);
        } else {
            setError('Неверный токен.');
        }

        setLogging(false);
    }

    useEffect( () => {
        setLogging(true);

        const autoLogin = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await login(token);
                setLogging(false);
            } else {
                setLogging(false);
            }
        }

        autoLogin();
    }, []);

    return (
        <div className={styles.container}>
            {logging &&
                <div className={styles.loadingContainer}><Loading /></div>
            }
            <div className={styles.formContainer}>
                <div className={styles.title}>Войдите в систему.</div>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.label}>Введите логин</div>
                <input
                    type="text"
                    onChange={onChangeLogin}
                    value={loginValue}
                    className={styles.input}
                    onKeyDown={handleKeyDown}
                    style={{
                        'border': error ? '1px solid red' : '1px solid transparent',
                    }}
                />
                <div className={styles.label}>Введите пароль</div>
                <input
                    type="text"
                    onChange={onChangePassword}
                    value={passwordValue}
                    className={styles.input}
                    onKeyDown={handleKeyDown}
                    style={{
                        'border': error ? '1px solid red' : '1px solid transparent',
                    }}
                />
                <button onClick={loginHandler} className={styles.button}>
                    Войти
                </button>
            </div>

        </div>
    );
};

export default LoginForm;
