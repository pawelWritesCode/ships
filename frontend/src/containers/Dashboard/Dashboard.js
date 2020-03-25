import React, {Component} from 'react';
import ButtonSection from "../../components/ButtonSection";
import {appState} from "../../helpers/states";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: appState.idle
        }
        this.changeAppState = this.changeAppState.bind(this)
    }

    changeAppState(newState) {
        this.setState({...this.state, current: newState})
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="dashboard-main-view">

                    </div>
                    <div className="dashboard-button-section">
                        <ButtonSection current={this.state.current} changeState={this.changeAppState}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard