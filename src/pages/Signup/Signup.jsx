import React from 'react';
import styles from './Signup.module.css';
import SignupForm from "../../components/SignupForm/SignupForm";

const Signup = (props) => {
    return (<div className={styles.Signup}>
        <h1>Sign up page</h1>
        <SignupForm
            {...props}
            handleSignUpOrLogin={props.handleSignUpOrLogin}
        />
    </div>);
}

export default Signup;