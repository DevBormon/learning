import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Alert, Button } from 'react-bootstrap';
import CourceDetails from '../components/CourceDetails';

const Home = () => {
    const [show, setShow] = useState(true);
    const cources = useSelector(({ cources }) => cources);

    const randerView = () => {
        if (cources.length > 0) {
            return (
                <Row>
                    {cources.map((cource, i) => {
                        return <CourceDetails cource={cource} key={i} />;
                    })}
                </Row>
            );
        } else {
            return (
                <Alert show={show} variant="success" className='mt-5'>
                    <Alert.Heading>How's it going?!</Alert.Heading>
                    <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                        lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                        fermentum.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                            Close me y'all!
                        </Button>
                    </div>
                </Alert>

            );

        }
    }

    return (
        <Container>
            {randerView()}
        </Container>
    );
}

export default Home;
