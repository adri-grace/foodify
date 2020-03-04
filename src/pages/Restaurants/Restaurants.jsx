import React, { useState } from 'react';
import styles from './Restaurants.module.css';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';

const Restaurants = (props) => {
    const [formVisible, setVisibility] = useState(false);
    return (<main className={styles.Restaurants}>
        <h1>Restaurants</h1>
        <button onClick={() => setVisibility(!formVisible)}>
            {formVisible ? 'Hide Form' : 'Show Form'}
        </button>

        {formVisible &&
            <RestaurantForm {...props} />
        }

        {
            props.restaurants.map(({ title, cuisine, addedBy, _id }) => (
                <section key={_id}>
                    <h2>{title}</h2>
                    <p>Cuisine: {cuisine}</p>
                    <small>Added by: {addedBy.name}</small>
                </section>
            ))
        }

    </main>);
}

export default Restaurants;