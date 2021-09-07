import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Form, Col } from 'react-bootstrap';
import { setCourses } from '../redux/actions';
import CourceDetails from '../components/CourceDetails';

const UploadCourses = () => {
    const formRef = useRef(null);
    const [my_cources, setMyCources] = useState([]);
    const user = useSelector(({ auth: { user } }) => user);

    const cources = useSelector(({ cources }) => cources);



    const dispatch = useDispatch();

    const addMyCource = useCallback((payload) => { dispatch(setCourses(payload)); }, [dispatch]);

    useEffect(() => {
        if (user != null && cources.length > 0) {
            let my_cources = cources.filter(cource => cource.user_id === user.id);
            setMyCources(my_cources);
            formRef.current.reset();
        }
    }, [user, cources, setMyCources, formRef]);

    const handleSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target);
        addMyCource(data);

        // let formDataObj = Object.fromEntries(data.entries())
        // console.log(formDataObj);
    }


    return (
        <Container>
            <Form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <Row>
                    <Col xs={6} md={4}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Cource Name" />
                        </Form.Group>
                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" placeholder="Cource price" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Video</Form.Label>
                            <Form.Control type="file" name="video" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>PDF</Form.Label>
                            <Form.Control type="file" name="pdf" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Details</Form.Label>
                    <Form.Control as="textarea" name="details" rows={3} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Row>
                {my_cources.map((corce, i) => {
                    return <CourceDetails cource={corce} key={i} />;
                })}
            </Row>
        </Container>
    );
}

export default UploadCourses;
