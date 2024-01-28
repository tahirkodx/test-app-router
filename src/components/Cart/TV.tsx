"use client";
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TV = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="ms-2" onClick={handleShow}>TV</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SABC TV License required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><small>Please enter your details to allow us to link your existing SABC TV license to this TV purhase.</small></p>
                    <p><small><span>Please note:</span> The linking of your TV license is only valid for te next 24 hours.</small></p>
                    <Form>
                        <Form.Group>
                            <Form.Label className='fw-2'>Please select your TV License Type</Form.Label>
                            <Form.Select aria-label="TV License Type">
                                <option>Select</option>
                                <option value="1">Business</option>
                                <option value="2">Holiday Home</option>
                                <option value="3">Dealer</option>
                                <option value="4">Domestic</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="radio" label="TV License Number" id="LicenseNumber" name="number"/>
                            <Form.Check type="radio" label="ID Number" id="IDNumber" name="number"/>
                            <Form.Check type="radio" label="Easypay Transaction Number" id="EasypayNumber" name="number"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TV;
