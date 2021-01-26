import React, { useState, useEffect } from 'react'
import { Card, Container, Col, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isObjectEmpty } from '../helpers/helpers';
import { loginUser, registerUser } from '../actions/authActions';
import { useHistory } from 'react-router-dom';

export default function SignUp() {

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch(); // nos permite llamar o lanzar acciones
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const history = useHistory();

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    })

    // email y password vienen de onSubmitCallback que se les asigna valor en SignInForn
    const login = ({ email, password, firstName, lastName }) => {
        const errors = {};
        setErrors(errors)

        if (!validator.isEmail(email)) {
            errors.email = "El correo electrónico es inválido";
        }

        if (!validator.isLength(password, { min: 8, max: 30 })) {
            errors.password = "La contraseña debe tener entre 8 y 30 letras";
        }

        if (validator.isEmpty(firstName)) {
            errors.firstName = "El nombre es obligatorio";
        }

        if (validator.isEmpty(lastName)) {
            errors.lastName = "El apellido es obligatorio";
        }

        if (!isObjectEmpty(errors)) {
            setErrors(errors);
            return;
        }

        // llamar a nuestra función login que tenemos en authActions
        dispatch(registerUser({ email, password, firstName, lastName })).then(response => {
            dispatch(loginUser({ email, password }));
        })
            .catch(error => {
                setErrors({ registerError: error.response.data.message })
            });

    }
    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} >
                    <Card body>

                        {errors.registerError && <Alert variant="danger">{errors.registerError}</Alert>}

                        <h3>Crear cuenta</h3>
                        <hr />
                        <SignUpForm errors={errors} onSubmitCallback={login} ></SignUpForm>
                        <div className="mt-4">
                            <Link to="/signin" >
                                ¿Ya tienes una cuenta? Inicia sesión aquí</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
