import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toastr from "toastr";
import logo from "../../assets/img/logo.png";
import family from "../../assets/img/familia.png";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./login.scss";
import Launchscreen from '../Launchscreen/launchscreen';

function Login() {
    const [datos, setDatos] = useState({
        email: '',
        password: '',
        token: '',
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const interval = setTimeout(() => {
            setLoading(false)
        }, 3000);
        return () => clearInterval(interval);
      }, []);


    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enterPressed = (e) => {
        if (e.code === 'NumpadEnter') {
            e.preventDefault()
            document.getElementById('password').focus();
        }
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const data = {
            user: {
                email: datos.email,
                password: datos.password
            }
        }

        axios.post("https://staging.api.socioinfonavit.io/api/v1/login", data)
            .then((result) => {
                localStorage.setItem("jwt", result.headers.authorization);
                window.location = "/home"

            }).catch((err) => {
                console.log(err.response);
                if (err.response.status === 401) {
                    console.log(err.response.data.error);
                    return toastr.error(err.response.data.error);
                } else {
                    toastr.error('the server does not respond please try later');
                }
            });

    }


    return (
        loading === true ? <Launchscreen/> :
        <Grid container justify="center" spacing={3} className="login">
            <Grid item sm={6} xs={12} >
                <Grid item sm={12} xs={12} className="image">
                    <img src={family} className="family" alt="" />
                </Grid>
                <Grid item sm={12} xs={12} className="image">
                    <img src={logo} className="logoLogin" alt="" />
                </Grid>
                <form onSubmit={handleSubmission}>
                    <Grid item sm={12} xs={12} >
                        <TextField
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            className="input"
                            color="secondary"
                            onKeyPress={enterPressed}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} >
                        <TextField
                            name="password"
                            id="password"
                            placeholder="Password"
                            type="password"
                            onChange={handleInputChange}
                            className="input"
                            color="secondary"
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}  >
                        <Button
                            variant="contained"
                            type="submit"
                            className="buttonLogin"
                            disabled={!datos.email && !datos.password ? true : false}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default Login;