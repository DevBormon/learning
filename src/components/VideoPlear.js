import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import { downloadAPI } from '../services/service';


const VideoPlear = props => {
    const BASE_URL = process.env.REACT_APP_BASE_URL.split('/');
    const url = BASE_URL[0] + '/' + BASE_URL[1] + '/' + BASE_URL[2] + '/storage/';

    const handeleDownload = (id) => {
        downloadAPI({
            id: id,
            type: 'video'
        });
    }


    return (
        <Modal animation={false} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Video Play</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Player>
                    <source src={url + 'videos/' + props.video} />
                </Player>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handeleDownload(props.id)}>Download</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default VideoPlear;