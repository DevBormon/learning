import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payment } from '../redux/actions';
// import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
    const formRef = useRef(null);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const redux_carts = useSelector(({ carts }) => carts);

    const dispatch = useDispatch();

    const triggerPayment = useCallback((payload) => { dispatch(payment(payload)); }, [dispatch]);

    useEffect(() => {
        formRef.current.reset();
        if (redux_carts !== null) {
            let total = 0;
            let count = 0;
            setCarts(redux_carts.products);
            redux_carts.products.forEach(cart => {
                total += cart.price;
                count += 1;
            });
            setTotal(total);
            setCount(count);
        }

    }, [redux_carts, setCarts, setTotal, setCount, formRef]);

    const handleExpiry = event => {
        let code = event.keyCode;
        let allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }

        event.target.value = event.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/'
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/'
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2'
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
        ).replace(
            /^([0]+)\/|[0]+$/g, '0'
        ).replace(
            /[^\d/]|^[/]*$/g, ''
        ).replace(
            /\/\//g, '/'
        );
    }

    const handlePayment = (e) => {

        e.preventDefault();
        const data = new FormData(e.target);
        data.append('type', total > 0 ? 'paid' : 'free');
        triggerPayment(data);

        // let formDataObj = Object.fromEntries(data.entries())
        // console.log(formDataObj);

        // const stripe = await loadStripe('pk_test_51IfMycSENtCZkrCCXs0Lok5oDjKEUwRS8pUH3lmAugkVRgs0QQPQbInLonPBwCdkHrYFxnnxCpxRugrZarJSWf0v00uBbK6c3S');

        // const token = await stripe.tokens.create({
        //     card: {
        //         number: '4242424242424242',
        //         exp_month: 9,
        //         exp_year: 2022,
        //         cvc: '314',
        //     },
        // });
        // console.log(token);
    }

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Checkout form</h2>
                <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3"><span className="text-muted">Your cart</span> <span className="badge badge-secondary badge-pill">{count}</span></h4>
                    <ul className="list-group mb-3">
                        {carts.map((cart, i) => {
                            return (
                                <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{cart.name}</h6>
                                        <small className="text-muted">Brief description</small>
                                    </div>
                                    <span className="text-muted">₹{cart.price}</span>
                                </li>
                            )
                        })}



                        <li className="list-group-item d-flex justify-content-between"><span>Total (INR)</span> <strong>₹{total}</strong></li>
                    </ul>

                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Payment</h4>
                    <form ref={formRef} className="needs-validation" onSubmit={(e) => handlePayment(e)}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">Name on card</label>
                                <input type="text" className="form-control" id="cc-name" name="name" disabled={total === 0 ? true : false} />
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback">Name on card is required</div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">Credit card number</label>
                                <input type="text" className="form-control" id="cc-number" name="card_no" disabled={total === 0 ? true : false} />
                                <div className="invalid-feedback">Credit card number is required</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">Expiration</label>
                                <input type="text" onChange={(e) => handleExpiry(e)} className="form-control" id="cc-expiration" name="expiry_month_year" disabled={total === 0 ? true : false} />
                                <div className="invalid-feedback">Expiration date required</div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-cvv">CVV</label>
                                <input type="text" className="form-control" id="cc-cvv" name="cvv" disabled={total === 0 ? true : false} />
                                <div className="invalid-feedback">Security code required</div>
                            </div>
                        </div>

                        <hr className="mb-4" />
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                    </form>
                </div>

            </div>

        </div>

    );
}

export default Checkout;
