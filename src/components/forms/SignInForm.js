import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SignInForm({ errors, onSubmitCallback }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        onSubmitCallback({ email, password });
    }

    return (
        <Form onSubmit={submitForm} >
            <Form.Group controls="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controls="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    isInvalid={errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" >Iniciar sesión</Button>
        </Form>
    )
}
