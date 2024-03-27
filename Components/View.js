import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Load the car details from localStorage
    const storedCarList = JSON.parse(localStorage.getItem('carList'));
    if (storedCarList) {
      const selectedCar = storedCarList.find(item => item.id === id);
      setCar(selectedCar);
    }
  }, [id]);

  return (
    <div style={{ margin: '10rem' }}>
      {car ? (
        <div>
          <h2>Car Details</h2>
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.production_year}</p>
        </div>
      ) : (
        <p>No car found with the provided ID</p>
      )}
    </div>
  );
}

export default View;
