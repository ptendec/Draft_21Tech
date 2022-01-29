import React from "react"
import classes from "./Header.module.css"
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {Link} from "react-router-dom"
import {Button, Stack} from "@mui/material"
import {setCookie, getCookie, deleteCookie} from '../../utils/cookie'

export const Header = () => {
    return (
        <div className={classes.header}>
            <Container maxWidth={"xl"}>
                <Grid sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }} container spacing={10}>
                    <Grid item xl={2}>
                        <Link to="/" ><span className={classes.mainLogo}>21Tech</span></Link>
                    </Grid>
                    <></>
                    <Grid item xl={3}>
                        <Stack direction="row" spacing={2}>
                            {getCookie('token') ? <Button onClick={() => {deleteCookie('token')}} variant="outlined">Выйти</Button> :
                                <>
                                    <Link to="/authorization"><Button variant="contained">Войти</Button></Link>
                                    <Link to="/registration"><Button variant="outlined">Зарегистрироваться</Button></Link>
                                </>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}