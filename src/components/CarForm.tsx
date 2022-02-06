import { Field, Formik, Form } from "formik";
import { Button, Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Car } from "../types";
import { TextField } from "./FormFields";
import "../styles.css";

export type CarFormValues = Omit<Car, "id">;

interface Props {
    onSubmit: (values: CarFormValues) => void;
}

export const CarForm = ({ onSubmit }: Props) => {
    return (
        <Formik
            initialValues={{
                manufacturer: "",
                type: "",
                engineCapactiy: 0,
                color: "",
                bodyStyle: "",
                manufactureDate: new Date(),
                manufacturerWebSite: "",
            }}
            onSubmit={(values, { resetForm }) => {
                resetForm();
                values.manufactureDate = new Date(values.manufactureDate);
                onSubmit(values);
            }}
            validationSchema={Yup.object({
                manufacturer: Yup.string().required(
                    "Manufacturer is required!"
                ),
                type: Yup.string().required("Type is required!"),
                engineCapactiy: Yup.number().required(
                    "Engine Capactiy is Required!"
                ),
                color: Yup.string(),
                bodyStyle: Yup.string(),
                manufactureDate: Yup.date().required(
                    "Manufacture Date is required!"
                ),
                manufacturerWebSite: Yup.string().matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    "Enter correct url!"
                ),
            })}
        >
            {({ isValid, dirty, resetForm }) => {
                return (
                    <Form className="form">
                        <Field
                            label="Manufacturer *"
                            placeholder="Audi"
                            name="manufacturer"
                            type="text"
                            component={TextField}
                        />
                        <Field
                            label="Type *"
                            placeholder="A5"
                            name="type"
                            type="text"
                            component={TextField}
                        />
                        <Field
                            label="Engine Capacity [ccm] *"
                            placeholder="2000"
                            name="engineCapactiy"
                            type="number"
                            component={TextField}
                        />
                        <Field
                            label="Color"
                            placeholder="Red"
                            name="color"
                            type="text"
                            component={TextField}
                        />
                        <Field
                            label="Body Style"
                            placeholder="Coupe"
                            name="bodyStyle"
                            type="text"
                            component={TextField}
                        />
                        <Field
                            label="Manufacture Date *"
                            name="manufactureDate"
                            type="date"
                            component={TextField}
                        />
                        <Field
                            label="Manufacture Website"
                            placeholder="https://www.audi.com"
                            name="manufacturerWebSite"
                            type="text"
                            component={TextField}
                        />
                        <Container>
                            <Row>
                                <Col>
                                    <Button
                                        variant="warning"
                                        onClick={() => resetForm()}
                                    >
                                        Reset Form
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={!dirty || !isValid}
                                    >
                                        Add New Car
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                );
            }}
        </Formik>
    );
};
