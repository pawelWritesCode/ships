import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Form, FormGroup , Label, Input, Button} from 'reactstrap';

class LoginForm extends Component {
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
                <Button className="loginForm-button" color="success">Zaloguj</Button>
            </Form>
        )
    }
}

export default LoginForm