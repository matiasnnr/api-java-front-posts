import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

export default function Navigation() {

    const { loggedIn, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to="/">
                React Java Posts
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
            <Navbar.Collapse id="main-menu">
                <Nav className="mr-auto">
                    {loggedIn && <Nav.Link>Crear Post</Nav.Link>}
                </Nav>
                <Nav>
                    {
                        !loggedIn
                            ? (
                                <>
                                    <Nav.Link as={NavLink} to="/signup">Crear cuenta</Nav.Link>
                                    <Nav.Link as={NavLink} to="/signin">Iniciar sesión</Nav.Link>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavDropdown title={user.sub} id="menu-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/posts" >Posts</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => dispatch(logoutUser())} >Cerrar sesión</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            )
                    }

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
