import React, {Component} from 'react';
import { Button } from 'reactstrap';

const ButtonMainSection = (props) => {

    return (
        <div className="button-section-container">
            <div className="button-section">
                <Button color="primary" size="lg">Profil </Button>
                <Button color="primary" size="lg">Ranking </Button>
                <Button color="warning" size="lg">Wyloguj </Button>
            </div>
        </div>
    )
}

export default ButtonMainSection