import React, {useState, useEffect} from "react"
import classes from "./Registration.module.css"
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {Alert, Button, Stack} from "@mui/material"
import {FormAuth} from "../../components/FormAuth/FormAuth"
import TextField from '@mui/material/TextField'
import {Header} from "../../components/Header/Header"

export const Registration = () => {
    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [IIN, setIIN] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [requestStatus, setRequestStatus] = useState(null)
    const [requestMessage, setRequestMessage] = useState('')
    const [typeOfAlert, setTypeOfAlert] = useState('')

    const registerUser = async () => {
        const user = {
            name: username,
            phone: phoneNumber,
            password,
            confirmPassword,
            uniqueNumber: IIN
        }
        console.log(user)
        await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }).then(response => {
            console.log(response.status)
            setRequestStatus(response.status)
        })
            .then(responseJSONData => {

            })
    }
    useEffect(() => {
        if (requestStatus === 200) {
            setRequestMessage("Вы зарегестрированы успешно")
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
            <Header />
            <div className={classes.registration}>

                <Container maxWidth={"xl"}>
                    <Grid container spacing={2} sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Grid item xl={6}>
                            {
                                requestStatus !== null ? <Alert
                                    severity={typeOfAlert}>{requestMessage}</Alert> : null
                            }
                            <FormAuth behavior={"Зарегистрироваться"}>
                                <Stack direction={"column"} spacing={2}>
                                    <TextField value={username} onChange={(event) => setUsername(event.target.value)}
                                               color={"secondary"} type="text" id="outlined-basic" label="Ваше имя:"
                                               variant="outlined"/>
                                    <TextField value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}
                                               type="number" id="outlined-basic" label="Ваш номер телефона:"
                                               variant="outlined"/>
                                    <TextField value={IIN} onChange={(event) => setIIN(event.target.value)} type="number"
                                               id="outlined-basic" label="Ваш ИИН:" variant="outlined"/>
                                    <TextField value={password} onChange={(event) => setPassword(event.target.value)}
                                               type="password" id="outlined-basic" label="Придумайте пароль:"
                                               variant="outlined"/>
                                    <TextField value={confirmPassword}
                                               onChange={(event) => setConfirmPassword(event.target.value)} type="password"
                                               id="outlined-basic" label="Подтвердите пароль:" variant="outlined"/>
                                    <Button onClick={registerUser} sx={{
                                        height: "56px"
                                    }} variant="contained" size={"large"}>Зарегистрироваться</Button>
                                </Stack>
                            </FormAuth>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}