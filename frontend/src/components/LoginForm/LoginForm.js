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
     * This method attempt to login user from
     * @param e
     */
    async attemptLogin(e) {
        e.preventDefault();
        const clickedElement = e.target;
        const form = clickedElement.closest('form');
        const loginInput = form.querySelector('.loginForm-login');
        const passInput = form.querySelector('.loginForm-password');
        const user = await login(loginInput.value, passInput.value);

        if(user) {
            window.location.replace('/');
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label>Login</Label>
                    <Input type="text" name="login" className="loginForm-login" placeholder="Type your login" />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password" className="loginForm-password" placeholder="Type your password" />
                </FormGroup>
                <Button className="loginForm-button" color="success" onClick={this.attemptLogin}>Zaloguj</Button>
            </Form>
        )
    }
}

export default LoginForm