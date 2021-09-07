import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { removeCart } from '../redux/actions';
import '../App.css';
import { Link } from 'react-router-dom';

const Carts = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL.split('/');
    const url = BASE_URL[0] + '/' + BASE_URL[1] + '/' + BASE_URL[2] + '/storage/';

    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const redux_carts = useSelector(({ carts }) => carts);
    // const user = useSelector(({ auth: { user } }) => user);

    const dispatch = useDispatch();

    const handleRemove = useCallback((payload) => { dispatch(removeCart(payload)); }, [dispatch]);

    useEffect(() => {
        if (redux_carts !== null) {
            let total = 0;
            // setCarts(carts => [...carts, redux_carts.products]);
            setCarts(redux_carts.products);
            redux_carts.products.forEach(cart => {
                total += cart.price;
            });
            setTotal(total);
        }
    }, [redux_carts, setCarts, setTotal]);





    return (
        <Container>

            <div className="col-sm-12 col-md-10 col-md-offset-1">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, i) => {
                            return (
                                <tr key={i}>
                                    <td className="col-sm-8 col-md-6">
                                        <div className="media">
                                            <Link className="thumbnail pull-left" to={"/details/" + cart.id}> <img className="media-object" src={url + 'images/' + cart.image} style={{ width: "72px", height: "72px" }} alt="" /> </Link>

                                        </div>
                                    </td>
                                    <td className="col-md-1 text-left"><strong className="label label-danger">{cart.name}</strong></td>
                                    <td className="col-sm-1 col-md-1" style={{ textAlign: "center" }}>1</td>
                                    <td className="col-sm-1 col-md-1 text-center"><strong>₹{cart.price}</strong></td>
                                    <td className="col-sm-1 col-md-1">
                                        <button type="button" className="btn btn-danger" onClick={() => handleRemove(cart.id)}><span className="fa fa-remove"></span> Remove</button>
                                    </td>
                                </tr>
                            );
                        })}

                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h3>Total</h3></td>
                            <td className="text-right">
                                <h3><strong>₹{total}</strong></h3>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {carts.length > 0 ? <td>
                                <Link to="/checkout">
                                    <button type="button" className="btn btn-success">Checkout <span className="fa fa-play"></span></button>
                                </Link>
                            </td> : null}

                        </tr>
                    </tbody>
                </table>
            </div>


        </Container >
    );
}

export default Carts;
