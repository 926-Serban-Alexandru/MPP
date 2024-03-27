import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import CarService from '../Services/CarService';

function Add() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    let history = useNavigate();

    const handleSubmitAdd = (e) => {
        e.preventDefault(); // Prevent form submission
        CarService.handleSubmitAdd(make, model, year, history);
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formMake">
                    <Form.Control type="text" placeholder="Enter make" required onChange={(e) => setMake(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formModel">
                    <Form.Control type="text" placeholder="Enter model" required onChange={(e) => setModel(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Control type="text" placeholder="Enter year" required onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmitAdd} type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Add;
