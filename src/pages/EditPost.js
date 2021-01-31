import React, { useState, useEffect } from 'react';
import { Card, Container, Col, Row, Alert } from 'react-bootstrap';
import NewPostForm from '../components/forms/NewPostForm';
import validator from 'validator';
import { isObjectEmpty } from '../helpers/helpers';
import { useHistory, useParams } from 'react-router-dom';
import { exposures } from '../helpers/exposures';
import { CREATE_POST_ENDPOINT, POST_DETAILS_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserPost } from '../actions/postActions';
import { useDispatch } from 'react-redux';

export default function EditPost() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [errors, setErrors] = useState({})
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
            setPost(response.data);
        }).catch(e => {
            history.push('/');
        })
    }, []);

    const editPost = async ({ title, content, expirationTime, exposureId }) => {
        const errors = {};
        setErrors(errors)

        if (validator.isEmpty(title)) {
            errors.title = "El título es obligatorio";
        }

        if (validator.isEmpty(content)) {
            errors.content = "El contenido es obligatorio";
        }

        if (!isObjectEmpty(errors)) {
            setErrors(errors);
            return;
        }

        expirationTime = exposureId == exposures.PRIVATE ? 0 : expirationTime;

        try {
            const res = await axios.post(CREATE_POST_ENDPOINT, { title, content, expirationTime, exposureId });
            await dispatch(getUserPost()); // obtiene los posts del usuario y actualiza la lista con el post nuevo en el state global de redux
            toast.info("El post se ha creado", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000 // 2 segundos
            });
            history.push(`/post/${res.data.postId}`)
        } catch (e) {
            setErrors({ newpost: e.response.data.message })
        }

    }

    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col sm="12" lg={{ span: 10, offset: 1 }} >
                    <Card body>

                        {errors.newpost && <Alert variant="danger">{errors.newpost}</Alert>}

                        <h3>Editar post</h3>
                        <hr />
                        {
                            post
                            &&
                            <NewPostForm
                                errors={errors}
                                onSubmitCallback={editPost}
                                postTitle={post.title}
                                postContent={post.content}
                                postExposureId={post.exposureId}
                                postExpirationTime={post.expirationTime}
                                textButton="Editar post"
                            />
                        }
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
