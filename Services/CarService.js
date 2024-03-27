import { v4 as uuid } from "uuid";

const CarService = {
  handleSubmitAdd: (make, model, year, history) => {
    const uniqueId = uuid().slice(0, 8);
    const newCar = { id: uniqueId, make, model, production_year: year };
    const cars = JSON.parse(localStorage.getItem('carList')) || [];
    const updatedCars = [...cars, newCar];
    localStorage.setItem('carList', JSON.stringify(updatedCars));
    history("/");
  },

  handleSubmitEdit: (id, make, model, year, history) => {
    const cars = JSON.parse(localStorage.getItem('carList')) || [];
    const index = cars.findIndex(car => car.id === id);
    if (index !== -1) {
      const updatedCar = { ...cars[index], make, model, production_year: year };
      const updatedCars = [...cars.slice(0, index), updatedCar, ...cars.slice(index + 1)];
      localStorage.setItem('carList', JSON.stringify(updatedCars));
      history("/");
    } else {
      console.error("Car not found");
    }
  }
};

export default CarService;
