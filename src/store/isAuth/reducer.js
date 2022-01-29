import {createSlice} from "@reduxjs/toolkit"

const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState: {
        isAuth: false
    },
    reducers: {
        logInUser: (state, action) => {
            state.isAuth = true
        },
        logOutUser: (state, action)
    }
})

export const {setItemInCart, deleteItemFromCart} = isAuthSlice.actions
export default isAuthSlice.reducer

