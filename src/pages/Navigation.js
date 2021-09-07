import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, NavDropdown, Nav, Button, Form, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { login, register, logout } from '../redux/actions';

const Navigation = () => {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);

    const status = useSelector(({ auth }) => auth.autoLogin);
    const user = useSelector(({ auth }) => auth.user);
    const redux_carts = useSelector(({ carts }) => carts);

    const dispatch = useDispatch();
    const setLogin = useCallback((payload) => { dispatch(login(payload)); }, [dispatch]);
    const setRegister = useCallback((payload) => { dispatch(register(payload)); }, [dispatch]);
    const setLogout = useCallback(() => { dispatch(logout()); }, [dispatch]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (status) {
            setShow(false);
        }
        if (redux_carts !== null) {
            let count = 0;
            // setCarts(carts => [...carts, redux_carts.products]);
            redux_carts.products.forEach(cart => {
                count += 1;
            });
            setCount(count);
        }
    }, [status, redux_carts, setShow, setCount]);

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        let obj = Object.fromEntries(data.entries());
        if (typeof obj.name === 'undefined') {
            setLogin(data);
        } else {
            setRegister(data);
        }
        console.log(obj.name);
    }


    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>

                    </Nav>
                    <Nav>
                        {status ?
                            <>
                                <Nav.Link as={Link} to="/carts">Carts<Badge bg="secondary">{count}</Badge></Nav.Link>
                                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/upload">Upload Courses</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/my-courses">Your Courses</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="" onClick={setLogout}>Lgo Out</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <Button variant="primary" onClick={() => handleShow()}>Login</Button>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <CustomModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
            </CustomModal>
        </Container>
    );
}

export default Navigation;
