import { Field, ErrorMessage } from "formik";
import "../styles.css";

export const TextField = ({ field, label, placeholder, type }: any) => {
    return (
        <div className="formElement">
            <label>{label}</label>
            <Field type={type} placeholder={placeholder} {...field} />
            <div style={{ color: "red" }}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    );
};
