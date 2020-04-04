import React, {Component} from 'react';
import { getUser } from "../../../services/user";
import ChangePasswordForm from "../../ChangePasswordForm";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changePasswordForm: false,
            user: null,
        };

        this.displayForm = this.displayForm.bind(this)
    }

    componentDidMount() {
        getUser()
            .then((response) => {
                if(response.status !== 200) {
                    this.setState({...this.state, user: { username: "Undefined"}})
                    return Promise.reject(response.statusText);
                }

                return response.json()
            })
            .then(user => {
                this.setState({...this.state, user: user})
            })
    }

    displayForm(boolFlag) {
        this.setState({...this.state, changePasswordForm: boolFlag})
    }

    render() {
        const username = this.state.user ? this.state.user.username : "Undefined"

        return (
            <div>
                <div>Login: {username}</div>
                {this.state.changePasswordForm ?
                    <ChangePasswordForm displayForm={this.displayForm} username={this.state.user.username}/> :
                    <button className="btn btn-info" onClick={() => this.displayForm(true)}>Zmień hasło</button>
                }
            </div>
        );
    }
}

export default Profile;