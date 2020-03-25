import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { dashboardState, tabs } from "../../helpers/states";
import { logout } from "../../services/auth";

class ButtonSection extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

     buttons(status, changeDashboardState) {
        switch (status) {
            case dashboardState.idle: {
                return (
                    <React.Fragment>
                    <Button color="primary" size="lg" onClick={() => {changeDashboardState(dashboardState.room, tabs.roomSettings)}}>Nowy pokój</Button>
                    <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.roomList)}}>Lista pokoi</Button>
                    <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.profile)}}>Profil</Button>
                    <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.ranking)}}>Ranking</Button>
                    <Button onClick={this.logout} color="warning" size="lg">Wyloguj</Button>
                    </React.Fragment>
                )
            }
            case dashboardState.playing: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg">Ustawienia</Button>
                        <Button color="warning" size="lg" onClick={() => {changeDashboardState(dashboardState.idle, tabs.roomList)}}>Zakończ gre</Button>
                    </React.Fragment>
                )
            }
            case dashboardState.room: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(dashboardState.playing, tabs.game)}}>Zacznij gre</Button>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.roomMembers)}}>Uczestnicy</Button>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.roomSettings)}}>Ustawienia</Button>
                        <Button color="warning" size="lg" onClick={() => {changeDashboardState(dashboardState.idle, tabs.roomList)}}>Wyjdz z pokoju</Button>
                    </React.Fragment>
                )
            }
            default: {
                return (
                    <React.Fragment>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(dashboardState.room, tabs.roomSettings)}}>Nowy pokój</Button>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.roomList)}}>Lista pokoi</Button>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.profile)}}>Profil</Button>
                        <Button color="primary" size="lg" onClick={() => {changeDashboardState(null, tabs.ranking)}}>Ranking</Button>
                        <Button onClick={this.logout} color="warning" size="lg">Wyloguj</Button>
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
                    {this.buttons(this.props.status, this.props.changeDashboardState)}
                </div>
            </div>
        )
    }
}

export default ButtonSection