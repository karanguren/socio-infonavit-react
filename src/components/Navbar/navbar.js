import React, { useState } from 'react';
import axios from 'axios';
import logo from "../../assets/img/logo.png";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import "./navbar.scss";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClickClose = () => {
        setOpenModal(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteToken = () => {
        axios.delete('https://staging.api.socioinfonavit.io/api/v1/logout')
            .then((response) => {
                sessionStorage.removeItem("jwt");
                window.location = "/"
            })
            .catch((error) => {
                console.error(error)
            })
        
        
    }

    return (
        <>
            <AppBar position="static" className="Navbar">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                        <img src={logo} className="logo" alt="" />
                    {/* <Button color="inherit" onClick={handleClickOpen}>
                        Signup
                    </Button> */}
                </Toolbar>
                <Dialog
                    open={openModal}
                    onClose={handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Está seguro que desea cerrar su sesión?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            al darle "si" se cerrara la sesión
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={deleteToken} className="colorBotton">
                            Si
                        </Button>
                    </DialogActions>
                </Dialog>
            </AppBar>
            <Drawer anchor='left' open={open} onClose={handleClose} className="drawer" style={{ width: '30%'}}>
                <div
                    role="presentation"
                    onClick={handleOpen}
                    onKeyDown={handleOpen}
                    className="appBar"
                >
                    <img src={logo} className="logo" alt="" />
                    <Typography variant="h6" className="text">Benevits</Typography >
                    <Typography variant="h6" className="texth6" onClick={handleClickOpen}>Cerrar Sesión</Typography >
                    
                </div>
            </Drawer>
        </>
    );
};

export default Navbar;