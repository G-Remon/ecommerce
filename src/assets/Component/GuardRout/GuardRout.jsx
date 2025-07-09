import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { TokenContext } from '../../context/Token.context'

export default function GuardRout({ children }) {
    let { token } = useContext(TokenContext)
    if (token) {
        return <Navigate to={'/home'} />
    }
    else {
        return children

    }




}


