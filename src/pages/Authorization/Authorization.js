import React, {useEffect, useState} from "react"
import classes from "./Authorization.module.css"
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {Alert, Button, Stack} from "@mui/material"
import {FormAuth} from "../../components/FormAuth/FormAuth"
import TextField from '@mui/material/TextField'
import {setCookie} from "../../utils/cookie"
import {Header} from "../../components/Header/Header"

export const Authorization = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [requestStatus, setRequestStatus] = useState(null)
    const [requestMessage, setRequestMessage] = useState('')
    const [typeOfAlert, setTypeOfAlert] = useState('')
    const [visibilityOfAlert, setVisibilityOfAlert] = useState(false)
    const [JWTToken, setJWTToken] = useState('')
    const authorizeUser = async () => {
        const user = {
            phone: phoneNumber,
            password,
        }
        console.log(user)
        await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }).then(response => {
            console.log(response.status)
            setRequestStatus(response.status)
            console.log(response)
            return response.json()
        })
            .then(responseJSONData => {
                console.log(requestStatus)
                setCookie('token', responseJSONData.token, {'max-age': 1296000})
            })
    }
    useEffect(() => {
        if (requestStatus === 200) {
            setRequestMessage("Вы авторизованы успешно")
            setTypeOfAlert("success")
        } else {
            setRequestMessage("Что-то пошло не так, попробуйте еще раз")
            setTypeOfAlert("error")
        }
        setTimeout(() => {
            setRequestStatus(null)
        }, 3000)
    }, [requestStatus])
    return (
        <>
            <Header/>
            <div className={classes.authorization}>
                <Container maxWidth={"xl"}>
                    <Grid container spacing={2} sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Grid item xl={6} lg={6} md={6}>
                            {
                                requestStatus !== null ? <Alert
                                    closeText={'close'}
                                    severity={typeOfAlert}>{requestMessage}</Alert> : null
                            }
                            <FormAuth behavior={"Войти"}>
                                <Stack direction={"column"} spacing={2}>
                                    <TextField value={phoneNumber}
                                               onChange={(event) => setPhoneNumber(event.target.value)}
                                               type="number" id="outlined-basic" label="Ваш номер:" variant="outlined"/>
                                    <TextField value={password} onChange={(event) => setPassword(event.target.value)}
                                               type="password" id="outlined-basic" label="Ваш пароль:"
                                               variant="outlined"/>
                                    <Button onClick={authorizeUser} size={"large"} variant="contained" sx={{
                                        height: "56px"
                                    }}>Войти</Button>
                                </Stack>
                            </FormAuth>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}

