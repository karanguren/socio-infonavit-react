import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

import "./home.scss";

function Home() {
    const [allWallets, setAllWallets] = useState([]);
    const [allBenevits, setAllBenevits] = useState([]);

    useEffect(() => {
        const getAllWallets = async () => {
            try {
                const response = await axios.get('https://staging.api.socioinfonavit.io/api/v1/member/wallets');
                setAllWallets(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getAllWallets();

        const getAllBenevits = async () => {
            try {
                let token = localStorage.getItem('jwt');
                const response = await axios.get('https://staging.api.socioinfonavit.io/api/v1/member/landing_benevits', {
                    headers: { 'Authorization': `${token}` }
                })
                setAllBenevits(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getAllBenevits();
    }, []);

    const benevitsByWalletId = (walletId) => {
        if (typeof allBenevits.locked !== 'undefined') {
            return allBenevits.locked.map((benevit, index) => {
                if (benevit.wallet.id === walletId) {
                    return cardBenevit(benevit, true)
                }
            })
        }
    }

    const benevitsUnlockedByWalletId = (walletId) => {
        if (typeof allBenevits.unlocked !== 'undefined') {
            return allBenevits.unlocked.map((benevit, index) => {
                if (benevit.wallet.id === walletId) {
                    return cardBenevit(benevit, false)
                }
            })
        }
    }

    const cardBenevit = (benevit, isLocked) => {
        return <Grid item sm={12} xs={12} spacing={2} style={{ height: '215px', width: '100%' }}>
            <Card className="card2">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height={isLocked === true ? '140' : '70'}
                        image={isLocked === true ? benevit.vector_full_path : benevit.ally.mini_logo_full_path}
                        style={{ padding: isLocked === false ? '6px 0px' : " "  }}
                    />
                </CardActionArea>
                <CardContent>
                    {isLocked === true ?
                        <Button
                            variant="contained"
                            type="submit"
                            className="buttonHome"
                            onClick={() => alert("LO QUIERO")}
                        >
                            LO QUIERO
                        </Button>
                        :
                        <Typography variant="body2" gutterBottom>
                            {benevit.description}
                        </Typography>
                    }
                </CardContent>
            </Card>
        </Grid>
    }


    const renderedWallets = allWallets.map((wallet, index) => (
        <Grid container spacing={3} className="home">
            <Grid item sm={12} xs={12}>
                <Typography variant="h5" gutterBottom>
                    {wallet.name}
                </Typography>
            </Grid>
            <div className="gridlist">
                <GridList className="card" cols={6}>
                    {benevitsByWalletId(wallet.id)}
                    {benevitsUnlockedByWalletId(wallet.id)}
                </GridList>
            </div>
        </Grid>
    ))

    return (
        <>
            {renderedWallets}
        </>
    );
}

export default Home;