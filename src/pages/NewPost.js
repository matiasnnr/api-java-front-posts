import React, { useState } from 'react';
import { Card, Container, Col, Row, Alert } from 'react-bootstrap';
import NewPostForm from '../components/forms/NewPostForm';
import validator from 'validator';
import { isObjectEmpty } from '../helpers/helpers';
import { useHistory } from 'react-router-dom';
import { exposures } from '../helpers/exposures';
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getUserPost } from '../actions/postActions';
import { useDispatch } from 'react-redux';

export default function NEwPost() {

    const [errors, setErrors] = useState({})
    const history = useHistory();
    const dispatch = useDispatch();

    const createPost = async ({ title, content, expirationTime, exposureId }) => {
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

        expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime;

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

                        <h3>Crear post</h3>
                        <hr />
                        <NewPostForm errors={errors} onSubmitCallback={createPost} ></NewPostForm>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
