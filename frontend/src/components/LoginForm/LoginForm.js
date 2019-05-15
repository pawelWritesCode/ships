import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Form, FormGroup , Label, Input, Button} from 'reactstrap';
import {login} from "../../services/auth";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.attemptLogin = this.attemptLogin.bind(this);
    }

    /**
     * This method validates form
     *
     * @param form
     * @returns {{isValid: boolean, errors: Array}}
     */
    validate(form) {
        const result = {
            isValid: true,
            errors: []
        }

        const loginInput = form.querySelector('.loginForm-login');
        const passInput = form.querySelector('.loginForm-password');

        return result;
    }

    /**
     * This method attempt to login user from
     * @param e
     */
    async attemptLogin(e) {
        e.preventDefault();

        const clickedElement = e.target;
        const form = clickedElement.closest('form');
        const formContainer = clickedElement.closest('.form-container');
        const errorMessageBox = formContainer.querySelector('.errorMessageBox');
        errorMessageBox.textContent = '';
        const validationResult = this.validate(form);

        if(!validationResult.isValid) {

            for(let i = 0, max = validationResult.errors.length; i < max; i++) {
                errorMessageBox.textContent += i !== max - 1 ? validationResult.errors[i] + ', ' : validationResult.errors[i];
            }

            return;
        }

        const loginInput = form.querySelector('.loginForm-login');
        const passInput = form.querySelector('.loginForm-password');
        try {
            const user = await login(loginInput.value, passInput.value);

            if(user) {
                window.location.replace('/');
            }
        }
        catch (e) {
            errorMessageBox.textContent = e;
        }
    }

    render() {
        return (
            <div className="form-container">
                <Form>
                    <FormGroup>
                        <Label>Login</Label>
                        <Input type="text" name="login" className="loginForm-login" placeholder="Podaj swój login" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Hasło</Label>
                        <Input type="password" name="password" className="loginForm-password" placeholder="Podaj swoje hasło" />
                    </FormGroup>
                    <Button className="loginForm-button" color="success" onClick={this.attemptLogin}>Zaloguj</Button>
                </Form>
                <div className="errorMessageBox" style={{color: 'red'}}>

                </div>
            </div>

        )
    }
}

export default LoginForm