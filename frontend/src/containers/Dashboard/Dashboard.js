import React, {Component} from 'react';
import ButtonSection from "../../components/ButtonSection";
import MainView from "../MainView/MainView";
import {dashboardState, tabs} from "../../helpers/states";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: dashboardState.idle,
            tab: tabs.roomList
        }
        this.changeDashboardState = this.changeDashboardState.bind(this)
    }

    changeDashboardState(status, tab) {
        const newState = {...this.state}
        if(null !== status) {
            newState.status = status;
        }

        if(null !== tab) {
            newState.tab = tab;
        }

        this.setState(newState)
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="dashboard-main-view">
                        <MainView tab={this.state.tab} />
                    </div>
                    <div className="dashboard-button-section">
                        <ButtonSection
                            status={this.state.status}
                            changeDashboardState={this.changeDashboardState}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard