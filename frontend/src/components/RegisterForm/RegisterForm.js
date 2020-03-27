import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import { register } from '../../services/auth';
import { authenticationStates } from '../../helpers/states';

const RegisterForm = (props) => {
    const attemptRegister = async (e) => {
        const clickedElement = e.target;
        const form = clickedElement.closest('form');
        const formContainer = clickedElement.closest('.form-container');
        const infoBox = formContainer.querySelector('.infoMessageBox');
        infoBox.textContent = '';

        const validationResult = validate(form);

        if(!validationResult.isValid) {
            for(let i = 0, max = validationResult.errors.length; i < max; i++) {
                infoBox.textContent += i !== max - 1 ? validationResult.errors[i] + ', ' : validationResult.errors[i];
            }

            return;
        }

        const usernameInput = form.querySelector('.loginForm-username');
        const passwordInput = form.querySelector('.loginForm-password');
        const retypedPasswordInput = form.querySelector('.loginForm-password-retype');

        try {
            const response = await register(usernameInput.value, passwordInput.value, retypedPasswordInput.value);

            if(response.status === 201) {
                const responseJson = await response.json();
                infoBox.textContent = responseJson.message + ' You can now log-in!';

                setTimeout(() => {
                    props.changeType(authenticationStates.login);
                }, 3000);
            }
        }
        catch(e) {
            infoBox.textContent = 'Błąd, spróboj ponwanie wprowadzić dane, upewnij się, że wpisane hasła są identyczne';
        }
    }

    /**
     * This method validates form
     *
     * @param form
     * @returns {{isValid: boolean, errors: Array}}
     */
    const validate = (form) => {
        const result = {
            isValid: true,
            errors: []
        }

        const usernameInput = form.querySelector('.loginForm-username');
        const passwordInput = form.querySelector('.loginForm-password');
        const retypedPasswordInput = form.querySelector('.loginForm-password-retype');

        if(usernameInput.value.length <= 5) {
            result.errors.push('Login musi być dłuższy niż 5 znaków');
            result.isValid = false;
        }

        if(passwordInput.value.length <= 5) {
            result.errors.push('Hasło musi być dłuższe niż 5 znaków');
            result.isValid = false;
        }

        if(passwordInput.value !== retypedPasswordInput.value) {
            result.errors.push('Hasła się nie zgadzją');
            result.isValid = false;
        }

        return result;
    }


    return (
        <div className="form-container">
            <Form>
                <FormGroup>
                    <Label>Login</Label>
                    <Input type="text" name="username" className="loginForm-username" placeholder="Podaj swój login" />
                </FormGroup>
                <FormGroup>
                    <Label>Hasło</Label>
                    <Input type="password" name="password" className="loginForm-password" placeholder="Podaj hasło" />
                </FormGroup>
                <FormGroup>
                    <Label>Powtórz hasło</Label>
                    <Input type="password" name="password" className="loginForm-password-retype" placeholder="Przepisz hasło" />
                </FormGroup>
                <Button className="loginForm-button" color="success" onClick={(e) => { attemptRegister(e)} }>Zarejestruj</Button>
            </Form>
            <div className="infoMessageBox">

            </div>
        </div>

    )
}

export default RegisterForm