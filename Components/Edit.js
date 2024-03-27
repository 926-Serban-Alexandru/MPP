import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import CarService from '../Services/CarService';

function Edit() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [id, setId] = useState('');
    let history = useNavigate();

    useEffect(() => {
        setMake(localStorage.getItem('Make'))
        setModel(localStorage.getItem('Model'))
        setYear(localStorage.getItem('Year'))
        setId(localStorage.getItem('Id'))
    }, [])

    const handleSubmitEdit = (e) => {
        e.preventDefault(); // Prevent form submission
        CarService.handleSubmitEdit(id, make, model, year, history);
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formMake">
                    <Form.Control type="text" placeholder="Enter make" value={make} required onChange={(e) => setMake(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formModel">
                    <Form.Control type="text" placeholder="Enter model" value={model} required onChange={(e) => setModel(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Control type="text" placeholder="Enter year" value={year} required onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Button onClick={handleSubmitEdit} type="submit">Update</Button>
            </Form>
        </div>
    )
}

export default Edit;
