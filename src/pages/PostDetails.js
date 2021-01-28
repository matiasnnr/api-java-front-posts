import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import { Card, Jumbotron, Button } from 'react-bootstrap';
import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

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
                            <Button
                                className="mr-2"
                                variant="primary"
                                size="sm"
                                onClick={() => {

                                }}
                            >
                                Descargar
                                </Button>
                            <CopyToClipboard
                                onCopy={() => {
                                    toast.info("Copiado al portapapeles", {
                                        position: toast.POSITION.BOTTOM_CENTER,
                                        autoClose: 2000 // 2 segundos
                                    })
                                }}
                                text={post.content}
                            >
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {

                                    }}
                                >
                                    Copiar al portapapeles
                            </Button>
                            </CopyToClipboard>
                        </Card.Header>
                        <Card.Body>
                            <SyntaxHighlighter showLineNumbers={true}>
                                {post.content}
                            </SyntaxHighlighter>
                        </Card.Body>
                    </Card>
                </>
            )}
        </div>
    )
}