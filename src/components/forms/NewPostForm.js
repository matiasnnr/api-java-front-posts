import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { exposures } from '../../helpers/exposures';

export default function NewPostForm({ errors, onSubmitCallback, postTitle = "", postContent = "", postExposureId = exposures.PUBLIC, postExpirationTime = 60, textButton = "Crear post" }) {

    const [title, setTitle] = useState(postTitle);
    const [content, setContent] = useState(postContent);
    const [expirationTime, setExpirationTime] = useState(postExpirationTime);
    const [exposureId, setExposureId] = useState(postExposureId);

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ title, content, expirationTime, exposureId });
    }

    return (
        <Form onSubmit={submitForm} >
            <Form.Group controls="title">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Snippet para recorrer un array"
                    isInvalid={errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Row>
                <Col md="6" xs="12" >
                    <Form.Group controlId="expirationTime" >
                        <Form.Label>Tiempo de expiración</Form.Label>
                        <Form.Control
                            disabled={exposureId == exposures.PRIVATE}
                            as="select"
                            value={expirationTime}
                            onChange={e => setExpirationTime(e.target.value)}
                        >
                            <option value="30">30 minutos</option>
                            <option value="60">1 hora</option>
                            <option value="120">2 horas</option>
                            <option value="360">6 horas</option>
                            <option value="720">12 horas</option>
                            <option value="1440">1 día</option>
                            <option value="43200">{`1 mes (30 días)`}</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.expirationTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md="6" xs="12" >
                    <Form.Group controlId="exposureId" >
                        <Form.Label>Tipo de post</Form.Label>
                        <div>
                            <Form.Check
                                value={exposures.PRIVATE}
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposureId == exposures.PRIVATE}
                                inline
                                label="Privado"
                                name="exposureId"
                                type="radio"
                            >

                            </Form.Check>

                            <Form.Check
                                value={exposures.PUBLIC}
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposureId == exposures.PUBLIC}
                                inline
                                label="Público"
                                name="exposureId"
                                type="radio"
                            >

                            </Form.Check>
                        </div>
                        <Form.Control.Feedback type="invalid">
                            {errors.expirationTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controls="content">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    isInvalid={errors.content}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" >{textButton}</Button>
        </Form>
    )
}
