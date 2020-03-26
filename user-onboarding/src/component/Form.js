import React, {useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("An Email is required"),
    role: yup.string(),
    password: yup.string().required("A password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to the terms of service")
});

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user,setUser] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = e => {
        yup 
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(error => {
                setErrors({
                    ...errors,
                    [e.target.name]: error.errors[0]
                });
            });
    };
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                setUser(response.data);
                console.log("YEET", user);

                setFormState({
                    name: "",
                    email: "",
                    role: "",
                    password: ""
                });
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };





    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? 
                <p classname="error">{errors.name}</p> : null}
            </label>
            <br></br>
            <label htmlFor="email">
                Email
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? 
                <p classname="error">{errors.email}</p> : null}
            </label>
            <br></br>
            <label htmlFor="role">
                Role 
                <select id="role" name="role" onChange={inputChange}>
                    <option value="Marketing">Marketing</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Chief Meme Officer">Chief Meme Officer</option>
                    <option value="Corporate Snack Delivery Boi">Corporate Snack Delivery Boi</option>
                    <option value="Useless Heathen">Useless Heathen</option>
                </select>
            </label>
            <br></br>
            <label htmlFor="password">
                Password
                <input
                    id="password"
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 0 ? 
                <p classname="error">{errors.password}</p> : null}
            </label>
            <br></br>
            <label htmlFor="terms">
                Terms of Service
                <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />    
            </label>
            <br></br>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
        );
}