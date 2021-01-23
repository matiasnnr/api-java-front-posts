import React, { useState, useEffect } from 'react'
import { Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignInForm from '../components/forms/SignInForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isObjectEmpty } from '../helpers/helpers';
import { loginUser } from '../actions/authActions';
import { useHistory } from 'react-router-dom';

export default function SignIn() {

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
    const login = ({ email, password }) => {
        const errors = {};
        setErrors(errors)

        if (!validator.isEmail(email)) {
            errors.email = "El correo electrónico es inválido";
        }

        if (validator.isEmpty(password)) {
            errors.password = "La contraseña no puede estar vacía";
        }

        if (!isObjectEmpty(errors)) {
            setErrors(errors);
            return;
        }

        // llamar a nuestra función login que tenemos en authActions
        dispatch(loginUser({ email, password })).then(response => {

        })
            .catch(error => {

            });

    }
    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} >
                    <Card body>
                        <h3>Iniciar sesión</h3>
                        <hr />
                        <SignInForm errors={errors} onSubmitCallback={login} ></SignInForm>
                        <div className="mt-4">
                            <Link to="/signup" >No tienes una cuenta? Regístrate aquí</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
