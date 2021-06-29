import React from 'react';
import logo from "../../assets/img/logo.png";

import Grid from '@material-ui/core/Grid';
import "./launchscreen.scss";

function Launchscreen() {


    return (
        <Grid container justify="center" alignItems="center" className="screen">
            <Grid item sm={12} xs={12} className="fade-in-image">
                <img src={logo} className="logoscreen" alt="" />
            </Grid>
        </Grid>


    );
}

export default Launchscreen;