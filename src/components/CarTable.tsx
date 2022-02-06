import React from "react";
import { Table } from "react-bootstrap";
import { Car } from "../types";

export const CarTable = ({ cars }: { cars: Array<Car> }) => {
    return (
        <div className="CarTable">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Type</th>
                        <th>Engine Capacity [ccm]</th>
                        <th>Color</th>
                        <th>Body Style</th>
                        <th>Manufacture Date</th>
                        <th>Manufacture Website</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(cars).map((car: Car) => (
                        <tr key={car.id}>
                            <td>{car.manufacturer}</td>
                            <td>{car.type}</td>
                            <td>{car.engineCapactiy}</td>
                            <td>{car.color ? car.color : "-"}</td>
                            <td>{car.bodyStyle ? car.bodyStyle : "-"}</td>
                            <td>
                                {
                                    car.manufactureDate
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </td>
                            <td>
                                {car.manufacturerWebSite
                                    ? car.manufacturerWebSite
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
