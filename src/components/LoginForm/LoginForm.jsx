import React, { Component } from 'react';
import styles from './LoginForm.module.css';
import userService from '../../utils/userService';

class LoginForm extends Component {
    state = this.getInitialState();
    getInitialState() {
        return {
            email: '',
            password: '',
            error: ''
        };
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
            const { email, password } = this.state;
            // service module makes an AJAX call to server
            await userService.login({ email, password });
            // check if a user exists, then check for password match
            // then create a token and send it to the client
            // clear the form
            this.setState(this.getInitialState(), () => {
                // add token to state
                this.props.handleSignUpOrLogin();
                //route the user back to restaurants page
                this.props.history.push('/restaurants');
            });
        } catch (error) {
            this.setState({
                email: '',
                password: '',
                error: error.message
            })
        }

    }
    isFormValid() {
        return (
            this.state.email &&
            this.state.password);
    }
    render() {
        return (
            <section className={styles.section}>
                {
                    this.state.error && <p>{this.state.error}</p>
                }
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Log In</legend>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={this.state.email}
                            name="email"
                            onChange={this.handleChange} />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={this.state.password}
                            name="password"
                            onChange={this.handleChange}
                        />
                        <button type="submit" disabled={!this.isFormValid()}>Login</button>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default LoginForm;