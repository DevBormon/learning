import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const CustomModal = props => {
    const [register, setRegister] = useState(false);



    const toggle = () => {
        setRegister(v => !v);
    };

    const randerContent = () => {
        if (register) {
            return (
                <>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password_confirmation" placeholder="Confirm Password" />
                    </Form.Group>
                </>
            )
        } else {
            return props.children;
        }
    };


    return (
        <Modal animation={false} show={props.show} onHide={props.handleClose}>
            <Form onSubmit={(e) => props.handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>{register ? 'Register' : 'Login'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {randerContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        {register ? 'Login' : 'Register'}
                    </Button>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>

            </Form>
        </Modal>
    );

}

export default CustomModal;