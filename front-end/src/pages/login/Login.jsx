import React from 'react'
import { useAuth } from '../../providers/auth/AuthProvider'

const Login = () => {
    const { token } = useAuth()
    console.log('HelloToken', token.id)
    return (
    <div>Hello, {token.id}</div>
  )
}

export default Login