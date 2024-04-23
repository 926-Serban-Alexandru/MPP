package com.example.CarBidder.model.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarDao {

    @Autowired
    private CarRepository repository;

    public Car save(Car car) {
        return repository.save(car);
    }

    public List<Car> getAllCars() {
        List<Car> cars = new ArrayList<>();
        Streamable.of(repository.findAll())
                .forEach(cars::add);
        return cars;
    }

    public Car getOneCar(int carId) {
        Optional<Car> optionalCar = repository.findById(carId);

        // Return the car if present, otherwise return null
        return optionalCar.orElse(null);
    }


    public void delete(int carId) {
        repository.deleteById(carId);
    }

    public Car updateCar(int carId, Car updatedCar) {
        Optional<Car> optionalCar = repository.findById(carId);

        if (optionalCar.isPresent()) {
            Car existingCar = optionalCar.get();
            // Update fields except the ID
            existingCar.setMake(updatedCar.getMake());
            existingCar.setModel(updatedCar.getModel());
            existingCar.setProduction_year(updatedCar.getProduction_year());

            // Save the updated car
            return repository.save(existingCar);
        } else {
            return null;
        }

    }
}
