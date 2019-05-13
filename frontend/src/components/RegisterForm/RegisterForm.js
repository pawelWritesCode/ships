import React, {Component} from './react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const RegisterForm = (props) => {

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
            <FormGroup>
                <Label>Re-type Password</Label>
                <Input type="password" name="password" className="loginForm-password-retype" placeholder="Retype your password" />
            </FormGroup>
            <Button className="loginForm-button" color="success">Zarejestruj</Button>
        </Form>
    )
}

export default RegisterForm