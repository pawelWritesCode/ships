import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { appState } from "../../helpers/states";
import { logout } from "../../services/auth";

class ButtonSection extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            state: appState.idle
        }
    }

     buttons(state) {
        switch (state.state) {
            case appState.idle: {
                return (
                    <React.Fragment>
                    <Button color="primary" size="lg">Nowy pokój</Button>
                    <Button color="primary" size="lg">Profil</Button>
                    <Button color="primary" size="lg">Ranking</Button>
                    <Button onClick={this.logout} color="warning" size="lg">Wyloguj</Button>
                    </React.Fragment>
                )
            }
            case appState.playing: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg">Ustawienia</Button>
                        <Button color="warning" size="lg">Zakończ gre</Button>
                    </React.Fragment>
                )
            }
            case appState.room: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg">Zacznij gre</Button>
                        <Button color="primary" size="lg">Uczestnicy</Button>
                        <Button color="primary" size="lg">Ustawienia</Button>
                        <Button color="warning" size="lg">Wyjdz z pokoju</Button>
                    </React.Fragment>
                )
            }
            default: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg">Nowy pokój</Button>
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