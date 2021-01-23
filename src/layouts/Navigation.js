import React from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={NavLink} to="/">
                React Java Posts
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
            <Navbar.Collapse id="main-menu">
                <Nav className="mr-auto">
                    <Nav.Link>Create Post</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to="/">Create Post</Nav.Link>
                    <Nav.Link as={NavLink} to="/signin">Iniciar sesión</Nav.Link>
                    <NavDropdown title="Matías Núñez" id="menu-dropdown">
                        <NavDropdown.Item>Posts</NavDropdown.Item>
                        <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
