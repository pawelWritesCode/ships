import React, {Component} from 'react';
import ButtonSection from "../../components/ButtonSection";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="dashboard-main-view">

                    </div>
                    <div className="dashboard-button-section">
                        <ButtonSection/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard