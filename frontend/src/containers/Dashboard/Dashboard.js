import React, {Component} from 'react';
import ButtonMainSection from "../../components/ButtonMainSection";

const Dashboard = (props) => {

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="dashboard-room-list">

                </div>
                <div className="dashboard-main-button-section">
                    <ButtonMainSection/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard