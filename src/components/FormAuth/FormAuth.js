import React from "react"
import classes from "./FormAuth.module.css"
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import {Link} from "react-router-dom"
import {Button, Stack} from "@mui/material"


export const FormAuth = ({action, method, children, behavior}) => {
    return (
        <form className={classes.formAuth}>
            <h1>{behavior}</h1>
            {children}
        </form>
    )
}