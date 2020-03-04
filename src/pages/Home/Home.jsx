import React from 'react';
import styles from "./Home.module.css";

const Home = (props) => {
    return (
        <main className={styles.Home}>
            <div className="container"><div className="row d-flex justify-content-center my-5"><h1>Featured Restaurants</h1></div></div>
            
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-4 pa-3">
                        {
                        props.featuredRestaurants.map(({title, cuisine, addedBy, _id}) => (
                        <section  key={_id}>
                            <h2>{title}</h2>
                            <p>Cuisine: {cuisine}</p>
                            <small>Added by: {addedBy.name}</small>
                        </section>
                        ))
                    }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;