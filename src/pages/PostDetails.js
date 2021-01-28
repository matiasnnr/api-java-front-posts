import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import { Card, Jumbotron, Button } from 'react-bootstrap';
import moment from 'moment';

export default function PostDetails() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
            setPost(response.data);
        }).catch(e => {
            history.push('/');
        })
    }, []);

    return (
        <div className="pb-4">
            {post && (
                <>
                    <Jumbotron>
                        <h1>{post.title}</h1>
                        <p>Creado por {post.user.firstName}, {moment(post.createdAt).fromNow()}</p>
                    </Jumbotron>

                    <Card>
                        <Card.Header>
                            <Button className="mr-2" variant="primary" size="sm" onClick={() => { }}>Descargar</Button>
                            <Button variant="primary" size="sm" onClick={() => { }}>Copiar al portapapeles</Button>
                        </Card.Header>
                        <Card.Body>
                            <pre>{post.content}</pre>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    )
}