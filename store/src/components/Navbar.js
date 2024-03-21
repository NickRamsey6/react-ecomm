import { Button, Container, Navbar, Modal, NavItem } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';
import Nav from 'react-bootstrap/Nav';

function NavbarComponent() {
    const cart = useContext(CartContext);
    const [ show, setShow ] =useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); //Forward user to Stripe
            }
        });
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand='sm'   sticky='top'>
                <Nav className="justify-content-center">
                    <NavItem>
                        <Navbar.Brand href='/'>Tuscan Stone Pizza</Navbar.Brand>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/'>Home</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/'>About Us</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/'>Locations</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/'>Contact Us</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link href='/store'>Order Now</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Navbar.Toggle />
                    </NavItem>
                </Nav>
                <Navbar.Collapse className='justify-content-end'>
                    <Button onClick={handleShow}>Cart ({productsCount}) items</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                            <>
                                <p>Items in your cart:</p>
                                {cart.items.map((currentProduct, index) => (
                                    <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                                ))}

                                <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                                <Button variant='success' onClick={checkout}>
                                    Purchase Items!</Button> 
                            </>
                        :
                                <h1>There are no items in your cart!</h1>
                        }
                </Modal.Body>
            </Modal>
        </>
    )

}

export default NavbarComponent;