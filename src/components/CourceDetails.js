import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import VideoPlear from '../components/VideoPlear';
import { downloadAPI } from '../services/service';

const CourceDetails = props => {
    const [show, setShow] = useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL.split('/');
    const url = BASE_URL[0] + '/' + BASE_URL[1] + '/' + BASE_URL[2] + '/storage/';

    const getWords = (str, i) => {
        return str.split(/\s+/).slice(0, i).join(" ") + '...';
    }

    const handleClose = () => setShow(false);

    const handeleDownload = (id) => {
        downloadAPI({
            id: id,
            type: 'pdf'
        });
    }

    return (
        <Col xs="6" sm="6" className="mt-2">
            <Card>
                <Card.Img variant="top" src={url + 'images/' + props.cource.image} />
                <Card.Body>
                    <Card.Title>{props.cource.name}</Card.Title>
                    <Card.Text>
                        {props.cource.details !== null ? getWords(props.cource.details, 10) : null}
                    </Card.Text>
                    {props.cource.is_video && typeof props.cource.video != 'undefined' ? <Button variant="primary" onClick={() => setShow(true)}>Play Video</Button> : null}
                </Card.Body>

                <Card.Body>
                    {props.cource.is_pdf && typeof props.cource.pdf != 'undefined' ?

                        <Button variant="primary" onClick={() => handeleDownload(props.cource.id)}>Download Pdf</Button>

                        : null}
                    <br />
                    <Card.Link as={Link} to={'details/' + props.cource.id}>Details</Card.Link>
                </Card.Body>
            </Card>

            <VideoPlear show={show} id={props.cource.id} video={props.cource.video} handleClose={handleClose} />
        </Col>
    );
}

export default CourceDetails;