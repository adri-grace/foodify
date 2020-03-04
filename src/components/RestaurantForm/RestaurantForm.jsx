import React, { Component } from 'react';
import styles from './Restaurant.module.css';
import userService from '../../utils/userService';
import restaurantService from '../../utils/restaurantService';

class RestaurantForm extends Component {
    state = this.getInitialState();
    getInitialState() {
        return {
            title: '',
            cuisine: '',
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
            const { title, cuisine } = this.state;
            // get loggedIn user ID and store it in a variable
            const addedBy = userService.getUser()._id;
            // call restaurantService .create function
             // pass in values to create a restaurant
                // 1. title
                // 2. cuisine
                // 3. addedBy
            await restaurantService.create({ title, cuisine, addedBy});

            this.setState(this.getInitialState(), () => {
                this.props.handleGetRestaurants();
                this.props.history.push('/restaurants');
            });
        } catch (error) {
            this.setState({
                title: '',
                cuisine: '',
                error: error.message
            })
        }

    }
    isFormValid() {
        return (
            this.state.title &&
            this.state.cuisine);
    }
    render() {
        return (
            <section className={styles.section}>
                {
                    this.state.error && <p>{this.state.error}</p>
                }
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>New Restaurant Form</legend>
                        <label htmlFor="title">Title</label>
                        <input
                            type="title"
                            id="title"
                            value={this.state.title}
                            name="title"
                            onChange={this.handleChange} />

                        <label htmlFor="cuisine">Cuisine</label>
                        <input
                            type="cuisine"
                            id="cuisine"
                            value={this.state.cuisine}
                            name="cuisine"
                            onChange={this.handleChange}
                        />
                        <button type="submit" disabled={!this.isFormValid()}>Add Restaurant</button>
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default RestaurantForm;