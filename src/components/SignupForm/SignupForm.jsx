import React, { Component } from 'react';
import styles from './SignupForm.module.css';
import userService from '../../utils/userService';

class SignupForm extends Component {
    state = this.getInitialState();
    getInitialState() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            error: ''
        };
    }
    isFormValid = () => {
        return (
            this.state.name &&
            this.state.email &&
            this.state.password &&
            this.state.password === this.state.passwordConfirm
        );
    }
    handleChange = e => {
        this.setState({
            error: '',
            ...{ [e.target.name]: e.target.value }
        })
    }
    handleSubmit = async e => {
        e.preventDefault();
        if (!this.isFormValid()) return;
        try {
            // pass the data from state to a service module
            const { name, email, password } = this.state; // this is called object destructuring
            // service module makes an AJAX call to server 
            // server creates new DB record
            await userService.signup({ name, email, password });
            // clear the form
            this.setState(this.getInitialState(), () => {
                this.props.handleSignUpOrLogin();
                this.props.history.push('/');
            });
        } catch (error) {
            this.setState({
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                error: error.message
            })
        }

    }
    render() {
        return (
            <section className={styles.section}>
                {
                    this.state.error && <p>{this.state.error}</p>
                }
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Sign up</legend>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            name="name"
                            id="name"
                            onChange={this.handleChange} />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            name="email"
                            id="email"
                            onChange={this.handleChange} />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            value={this.state.password}
                            name="password"
                            id="password"
                            onChange={this.handleChange} />

                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={this.state.passwordConfirm}
                            name="passwordConfirm"
                            id="passwordConfirm"
                            onChange={this.handleChange} />

                        <button disabled={!this.isFormValid()} type="submit">Sign up</button>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default SignupForm;
