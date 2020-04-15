import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {register} from "../../services/auth";
import {authenticationStates} from "../../helpers/states";
import {changeUser} from "../../services/user";

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
    }

    async attemptChangePassword(e) {
        const clickedElement = e.target;
        const form = clickedElement.closest('form');
        const formContainer = clickedElement.closest('.form-container');
        const infoBox = formContainer.querySelector('.infoMessageBox');
        infoBox.textContent = '';

        const validationResult = this.validate(form);

        if(!validationResult.isValid) {
            for(let i = 0, max = validationResult.errors.length; i < max; i++) {
                infoBox.textContent += i !== max - 1 ? validationResult.errors[i] + ', ' : validationResult.errors[i];
            }

            return;
        }

        const passwordInput = form.querySelector('.loginForm-password');

        try {
            const response = await changeUser({username: this.props.username, password: passwordInput.value})

            infoBox.textContent = response.status === 200 ? 'Hasło zostało pomyślnie zmienione!' : "Błąd servera";

            setTimeout(() => {
                this.props.displayForm(false)
            }, 3000);
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
    validate(form) {
        const result = {
            isValid: true,
            errors: []
        }

        const passwordInput = form.querySelector('.loginForm-password');
        const retypedPasswordInput = form.querySelector('.loginForm-password-retype');

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

    render() {
        return (
            <div className="form-container">
                <Form>
                    <FormGroup>
                        <Label>Hasło</Label>
                        <Input type="password" name="password" className="loginForm-password" placeholder="Podaj hasło" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Powtórz hasło</Label>
                        <Input type="password" name="password" className="loginForm-password-retype" placeholder="Przepisz hasło" />
                    </FormGroup>
                    <Button className="loginForm-button" color="success" onClick={(e) => { this.attemptChangePassword(e)} }>Zmień Hasło</Button>
                </Form>
                <div className="infoMessageBox">

                </div>
            </div>
        );
    }
}

export default ChangePasswordForm;