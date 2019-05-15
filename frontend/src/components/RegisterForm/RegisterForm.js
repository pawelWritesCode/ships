import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {register} from '../../services/auth'

const RegisterForm = (props) => {
    const attemptRegister = async (e) => {
        const clickedElement = e.target;
        const form = clickedElement.closest('form');
        const usernameInput = form.querySelector('.loginForm-username');
        const firstNameInput = form.querySelector('.loginForm-first-name');
        const lastNameInput = form.querySelector('.loginForm-last-name');
        const passwordInput = form.querySelector('.loginForm-password');
        const retypedPasswordInput = form.querySelector('.loginForm-password-retype');

        const response = await register(usernameInput.value, passwordInput.value, retypedPasswordInput.value, firstNameInput.value, lastNameInput.value);

        if(response) {
            //handle response
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" name="username" className="loginForm-username" placeholder="Type your username" />
            </FormGroup>
            <FormGroup>
                <Label>First name</Label>
                <Input type="text" name="first_name" className="loginForm-first-name" placeholder="Your first name" />
            </FormGroup>
            <FormGroup>
                <Label>Last name</Label>
                <Input type="text" name="last_name" className="loginForm-last-name" placeholder="Your last name" />
            </FormGroup>

            <FormGroup>
                <Label>Password</Label>
                <Input type="password" name="password" className="loginForm-password" placeholder="Type your password" />
            </FormGroup>
            <FormGroup>
                <Label>Re-type Password</Label>
                <Input type="password" name="password" className="loginForm-password-retype" placeholder="Retype your password" />
            </FormGroup>
            <Button className="loginForm-button" color="success" onClick={(e) => { attemptRegister(e)} }>Zarejestruj</Button>
        </Form>
    )
}

export default RegisterForm