package com.example.CarBidder.model.car;

import jakarta.persistence.*;

@Entity
@Table(name = "CAR")
public class Car {

    @Column(name = "ID")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "MAKE")
    private String make;

    @Column(name = "MODEL")
    private String model;

    @Column(name = "PRODUCTION_YEAR")
    private int production_year;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String manufacturer) {
        this.make = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }



    public int getProduction_year() {
        return production_year;
    }

    public void setProduction_year(int year) {
        this.production_year = year;
    }



    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", manufacturer='" + make + '\'' +
                ", model='" + model + '\'' +
                ", year=" + production_year +
                '}';
    }
}
