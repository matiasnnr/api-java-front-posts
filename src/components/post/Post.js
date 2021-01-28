import React from 'react'
import { Badge, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { exposures } from '../../helpers/exposures';

export default function Post({ post, renderControls }) {
    return (
        <Card className="mb-4" >
            {
                renderControls
                &&
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        <Badge
                            variant={post.exposure.id === exposures.PUBLIC ? "success" : "dark"}
                            className="mr-2"
                        >
                            {post.exposure.type}
                        </Badge>
                        {
                            post.expired && post.exposure.id === exposures.PUBLIC
                            && <Badge variant="danger" className="mr-2">Expiró</Badge>
                        }
                    </div>
                    <div>
                        <Button variant="primary" size="sm" className="mr-2">Editar</Button>
                        <Button variant="primary" size="sm">Eliminar</Button>
                    </div>
                </Card.Header>
            }
            <Card.Body>
                <Card.Title>
                    <Link to={`/post/${post.postId}`} >{post.title}</Link>
                </Card.Title>
                <Card.Text>
                    Creado por {post.user.firstName}, {moment(post.createdAt).fromNow()}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
