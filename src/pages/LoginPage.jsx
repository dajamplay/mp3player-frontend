import React from 'react';
import LoginForm from "@/components/login-form/LoginForm.jsx";

const LoginPage = () => {
    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
