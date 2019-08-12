import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { appState } from "../../helpers/states";
import { logout } from "../../services/auth";

class ButtonSection extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            state: appState.menu
        }
    }

     buttons(state) {
        switch (state) {
            case appState.menu: {
                return (
                    <React.Fragment>
                    <Button color="primary" size="lg">Profil </Button>
                    <Button color="primary" size="lg">Ranking </Button>
                    <Button onClick={this.logout} color="warning" size="lg">Wyloguj </Button>
                    </React.Fragment>
                )
            }
            default: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg">Profil </Button>
                        <Button color="primary" size="lg">Ranking </Button>
                        <Button onClick={this.logout} color="warning" size="lg">Wyloguj </Button>
                    </React.Fragment>
                )
            }
        }
     }

     logout() {
        logout();
        window.location.reload();
     }

    render() {
        return (
            <div className="button-section-container">
                <div className="button-section">
                    {this.buttons(this.state)}
                </div>
            </div>
        )
    }
}

export default ButtonSection