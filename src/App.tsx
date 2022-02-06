import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { v1 as uuid } from "uuid";
import axios from "axios";
import { CarForm, CarFormValues } from "./components/CarForm";
import { CarTable } from "./components/CarTable";
import { Car } from "./types";
import "./styles.css";

const LOCAL_STORAGE_KEY = "RSZOFTCARREGISTRATION";

const loadCars = (setCars: React.Dispatch<React.SetStateAction<Car[]>>) => {
    const localCars = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localCars != null) {
        const cars: Array<Car> = JSON.parse(localCars);
        setCars(cars);
    }
    return getDefaultCarsFromServer(setCars);
};

const getDefaultCarsFromServer = (
    setCars: React.Dispatch<React.SetStateAction<Car[]>>
) => {
    axios.get("http://localhost:3001/cars").then((response) => {
        const cars: Array<Car> = convertJSONToArrayList(response.data);
        saveCarsToLocalStorage(cars);
        setCars(cars);
    });
};

const saveCarsToLocalStorage = (cars: Array<Car>) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
};

const convertJSONToArrayList = (data) => {
    const cars: Array<Car> = [];
    for (const car of data) {
        cars.push({
            ...car,
            manufactureDate: new Date(car.manufactureDate),
        });
    }
    return cars;
};

const App = () => {
    const [cars, setCars] = useState<Array<Car>>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    useEffect(() => {
        loadCars(setCars);
    }, []);

    const onSubmit = (newCar: CarFormValues) => {
        const newCarWithId: Car = {
            id: uuid(),
            ...newCar,
        };
        const newCars = [...cars, newCarWithId];
        saveCarsToLocalStorage(newCars);
        setCars(newCars);
    };

    return (
        <div className="body">
            <h3>Car Registration</h3>
            <Button
                className="ShowButton"
                variant="primary"
                onClick={() => setShowForm(!showForm)}
            >
                {!showForm ? "Show Form" : "Hide Form"}
            </Button>
            {showForm ? <CarForm onSubmit={onSubmit} /> : null}
            <CarTable cars={cars} />
        </div>
    );
};

export default App;
