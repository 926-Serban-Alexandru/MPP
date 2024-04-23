package com.example.CarBidder.controller;

import com.example.CarBidder.model.car.Car;
import com.example.CarBidder.model.car.CarDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarController {

    @Autowired
    private CarDao carDao;

    @GetMapping("/car/get-all")
    public List<Car> getAllCars() {
        return carDao.getAllCars();
    }

    @GetMapping("/car/get-one/{carId}")
    public Car getOneCar(@PathVariable int carId) {
        return carDao.getOneCar(carId);
    }

    @PostMapping("/car/save")
    public Car save(@RequestBody Car car) {
        return carDao.save(car);
    }

    @DeleteMapping("/delete/{carId}")
    public void deleteCar(@PathVariable int carId) {
        carDao.delete(carId);
    }

    @PutMapping("/update/{carId}")
    public Car updateCar(@PathVariable int carId, @RequestBody Car updatedCar) {
        return carDao.updateCar(carId, updatedCar);
    }
}
