import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { myCourses } from '../services/service';
import CourceDetails from '../components/CourceDetails';

const MyCourses = () => {
    const [my_cources, setMyCources] = useState([]);

    const handleCourser = useCallback(async () => {
        let my_cources = await myCourses();
        setMyCources(my_cources);
    }, []);



    useEffect(() => {
        handleCourser();

    }, [handleCourser]);




    return (
        <Container>
            <Row>
                {my_cources.map((corce, i) => {
                    return <CourceDetails cource={corce} key={i} />;
                })}
            </Row>
        </Container>
    );
}

export default MyCourses;
