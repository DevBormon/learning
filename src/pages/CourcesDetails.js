import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { addCart } from '../redux/actions';
import '../App.css';

const CourcesDetails = props => {
    const BASE_URL = process.env.REACT_APP_BASE_URL.split('/');
    const url = BASE_URL[0] + '/' + BASE_URL[1] + '/' + BASE_URL[2] + '/storage/';

    const [course, setCourse] = useState([]);
    const [status, setStatus] = useState(false);

    const cources = useSelector(({ cources }) => cources);
    const redux_carts = useSelector(({ carts }) => carts);

    const dispatch = useDispatch();

    const setCart = useCallback((payload) => { dispatch(addCart(payload)); }, [dispatch]);

    useEffect(() => {
        if (cources.length > 0) {
            let course = cources.filter(cource => cource.id === parseInt(props.match.params.id));
            if (redux_carts !== null) {
                redux_carts.products.forEach(cart => {
                    console.log(cart.id, course[0].id);

                    if (cart.id === course[0].id) {
                        setStatus(true);
                    }
                });
            }
            setCourse(course);
        }

    }, [props, redux_carts, cources, setCourse, setStatus]);



    return (
        <Container>
            {course.map((corce, i) => {
                return (
                    <div className="card-wrapper" key="{i}">
                        <div className="card">
                            <div className="product-imgs">
                                <div className="img-display">
                                    <div className="img-showcase">
                                        <img src={url + 'images/' + corce.image} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="product-content">
                                <h2 className="product-title">{corce.name}</h2>
                                <div className="product-price">
                                    <p className="new-price">Price: <span>₹{corce.price}</span></p>
                                </div>
                                <div className="product-detail">
                                    <h2>about this courses:</h2>
                                    <p>{corce.details}</p>

                                </div>
                                <div className="purchase-info">
                                    {status ?
                                        <button type="button" className="btn" desabled>Already in cart <i className="fas fa-shopping-cart"></i></button>
                                        :

                                        <button type="button" className="btn" onClick={() => setCart(course)}>Add to Cart <i className="fas fa-shopping-cart"></i></button>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>

                );
            })}
        </Container>
    );
}

export default CourcesDetails;
