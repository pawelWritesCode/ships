import React, {Component} from 'react';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';
import { login } from '../../services/auth';
import { authenticationStates } from "../../helpers/states";

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: authenticationStates.login
        }

        this.changeForm = this.changeForm.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    /**
     * This method render form according to given type
     * @param type
     * @returns {*}
     */
    changeForm(e) {
        const clickedElement = e.target;
        switch(clickedElement.value) {
            case authenticationStates.login: {
                const newState = {...this.state};
                newState.type = authenticationStates.register;
                return this.setState(newState);
            }
            case authenticationStates.register: {
                const newState = {...this.state};
                newState.type = authenticationStates.login;
                return this.setState(newState);
            }
            default: {
                const newState = {...this.state};
                newState.type = authenticationStates.login;
                return this.setState(newState);
            }
        }
    }

    renderForm() {
        switch(this.state.type) {
            case authenticationStates.login: {
                return <LoginForm/>
            }
            case authenticationStates.register: {
                return <RegisterForm changeType={this.changeType} />
            }
            default: {
                return <LoginForm/>
            }
        }
    }

    changeType(type) {
        console.log('typ: ', type);
        const newState = {...this.state};
        newState.type = type;
        this.setState(newState);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12">
                            {this.renderForm()}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-12">
                            <Button color="primary" onClick={this.changeForm} value={this.state.type}> {
                                this.state.type == authenticationStates.login ?
                                    "Przejdź do rejestracji" :
                                    "Przejdź do logowania"
                            }
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}

export default Authentication