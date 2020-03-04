import React from 'react';
import styles from './Login.module.css';
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = (props) => {
    return (<main className={styles.Login}>
        <h1>Login Page</h1>
        <LoginForm {...props} />
    </main>);
}

export default Login;