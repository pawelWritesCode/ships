import React, {Component} from 'react'
import {dashboardState, tabs} from "../../helpers/states";
import {Button} from "reactstrap";

import RoomList from '../../components/tabs/RoomList'
import Profile from "../../components/tabs/Profile";
import Ranking from "../../components/tabs/Ranking";
import RoomMembers from "../../components/tabs/RoomMembers";
import RoomSettings from "../../components/tabs/RoomSettings";
import Game from "../Game";

class MainView extends Component {
    constructor(props) {
        super(props);
    }

    mainFrame(tab) {
        switch (tab) {
            case tabs.game: {
                return (
                    <Game />
                )
            }
            case tabs.roomList: {
                return (
                    <RoomList />
                )
            }
            case tabs.profile: {
                return (
                    <Profile />
                )
            }
            case tabs.ranking: {
                return (
                    <Ranking/>
                )
            }
            case tabs.roomMembers: {
                return (
                    <RoomMembers />
                )
            }
            case tabs.roomSettings: {
                return (
                    <RoomSettings />
                )
            }
        }
    }

    render() {
        return (
            <div> {this.mainFrame(this.props.tab)} </div>
        )
    }
}

export default MainView