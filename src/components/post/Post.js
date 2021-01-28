import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Post({ post }) {
    return (
        <Card className="mb-4" >
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
