import React, { Fragment, useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import Car from './Car';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [carList, setCarList] = useState([]);
    const [selectedCars, setSelectedCars] = useState([]);

    let history = useNavigate();

    useEffect(() => {
        // Load Car list from localStorage on component mount
        const storedCarList = JSON.parse(localStorage.getItem('carList'));
        if (storedCarList) {
            setCarList(storedCarList);
        } else {
            setCarList(Car);
        }
    }, []);

    const handleDelete = (id) => {
        setItemIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        const updatedCarList = carList.filter(item => item.id !== itemIdToDelete);
        // Update Car list in localStorage
        localStorage.setItem('carList', JSON.stringify(updatedCarList));
        setCarList(updatedCarList);
        setShowModal(false);
        history('/');
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const handleEdit = (id, make, model, year) => {
        localStorage.setItem('Make', make);
        localStorage.setItem('Model', model);
        localStorage.setItem('Year', year);
        localStorage.setItem('Id', id);
    };

    const handleAdd = (newCar) => {
        const updatedCarList = [...carList, newCar];
        // Update Car list in localStorage
        localStorage.setItem('carList', JSON.stringify(updatedCarList));
        setCarList(updatedCarList);
        // Navigate to home page to reflect the changes
        history('/');
    };

    const handleCheckboxChange = (id) => {
        const index = selectedCars.indexOf(id);
        if (index === -1) {
            setSelectedCars([...selectedCars, id]);
        } else {
            setSelectedCars(selectedCars.filter(carId => carId !== id));
        }
    };

    const handleExport = () => {
        // Filter out selected cars
        const selectedCarData = carList.filter(car => selectedCars.includes(car.id));
        // Convert selected car data to JSON
        const jsonData = JSON.stringify(selectedCarData, null, 2);
        // Create a Blob with JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
        // Create a temporary link element
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'selected_cars.json');
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const handleMultipleDelete = () => {
        const updatedCarList = carList.filter(item => !selectedCars.includes(item.id));
        // Update Car list in localStorage
        localStorage.setItem('carList', JSON.stringify(updatedCarList));
        setCarList(updatedCarList);
        setSelectedCars([]); // Clear selected cars after deletion
    };

    return (
        <Fragment>
            <div style={{ margin: "10rem" }}>
                <Table striped border hover size="sm">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Actions</th>
                            <th>Export/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carList && carList.length > 0 ?
                                carList.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.make}</td>
                                            <td>{item.model}</td>
                                            <td>{item.production_year}</td>
                                            <td>
                                                <Link to={'/edit'}>
                                                    <Button onClick={() => handleEdit(item.id, item.make, item.model, item.production_year)}>Edit</Button>
                                                </Link>
                                                &nbsp;
                                                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                                                &nbsp;
                                                <Link to={`/view/${item.id}`}>
                                                    <Button variant="info">View</Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleCheckboxChange(item.id)}
                                                    checked={selectedCars.includes(item.id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                "No data available"
                        }
                    </tbody>
                </Table>
                <br />
                <div className='d-grid gap-2' style={{ marginBottom: '20px' }}>
                    <Link to="/create" style={{ width: '100%' }}>
                        <Button size="lg" style={{ width: '100%' }}>Create</Button>
                    </Link>
                    <Button onClick={handleExport} size="lg" style={{ width: '100%' }}>Export</Button>
                    <Button onClick={handleMultipleDelete} size="lg" style={{ width: '100%' }}>Multiple Delete</Button>
                </div>
            </div>
            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>On second thought...</Button>
                    <Button variant="danger" onClick={confirmDelete}>Aye</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Home;



