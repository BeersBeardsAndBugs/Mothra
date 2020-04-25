import React, { useState } from 'react'
import { LoginForm } from './loginForm'
import { SignupForm } from './signupForm'
import { UserDashboard } from './userDashboard'
import './App.css'
import { useFetch } from '../hooks'

export const App = () => {
    const [pageSelected, setPageSelected] = useState('login')

    const [user] = useFetch('', null)

    return (
        <div className="App">
            <div className="container">
                {
                    {
                        login: <LoginForm {...{ setPageSelected, user }} />,
                        homepage: (
                            <UserDashboard {...{ user, setPageSelected }} />
                        ),
                        signup: <SignupForm {...{ setPageSelected, user }} />,
                    }[user.response ? 'homepage' : pageSelected]
                }
            </div>
        </div>
    )
}
