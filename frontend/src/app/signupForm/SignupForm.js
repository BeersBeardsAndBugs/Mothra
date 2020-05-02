import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined'
import React, { useRef, useState } from 'react'
import { PATH, USER } from '../../constants'
import { useForm } from '../../hooks'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export const SignupForm = ({ setPageSelected, user }) => {
    const confirmPassword = useRef(null)
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)

    const inputsSchema = {
        [USER.EMAIL]: {
            value: '',
            error: '',
            name: USER.EMAIL,
            required: true,
            validator: {
                regEx: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/,
                error: 'Invalid email address.',
            },
        },
        [USER.PASSWORD]: {
            value: '',
            error: '',
            type: 'password',
            name: USER.PASSWORD,
            required: true,
        },
        [USER.NAME]: {
            value: '',
            error: '',
            name: USER.NAME,
            required: true,
            validator: {
                regEx: /^[a-zA-z]{1,20}$/,
                error: 'Your name must be 20 characters or less',
            },
        },
    }

    const doLogin = (body) => {
        user.special(PATH.USER, body)
    }

    const { handleSubmit, handleOnChange, inputs, isSubmitDisabled } = useForm(
        inputsSchema,
        doLogin
    )

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name={USER.NAME}
                        autoFocus
                        value={inputs[USER.NAME].value}
                        onChange={handleOnChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name={USER.EMAIL}
                        autoComplete="email"
                        value={inputs[USER.EMAIL].value}
                        onChange={handleOnChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={inputs[USER.PASSWORD].value}
                        onChange={handleOnChange}
                        onBlur={() =>
                            setIsPasswordConfirmed(
                                confirmPassword.current.value ===
                                    inputs[USER.PASSWORD].value
                            )
                        }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        inputProps={{ ref: confirmPassword }}
                        onBlur={() =>
                            setIsPasswordConfirmed(
                                confirmPassword.current.value ===
                                    inputs[USER.PASSWORD].value
                            )
                        }
                        onChange={(e) => {
                            console.log(e)
                            if (!isPasswordConfirmed) {
                                setIsPasswordConfirmed(
                                    e.target.value ===
                                        inputs[USER.PASSWORD].value
                                )
                            }
                        }}
                    />
                    {(inputs[USER.NAME].error ||
                        inputs[USER.EMAIL].error ||
                        inputs[USER.PASSWORD].error ||
                        !isPasswordConfirmed) && (
                        <FormHelperText error>
                            {inputs[USER.NAME].error}
                            {inputs[USER.EMAIL].error}
                            {inputs[USER.PASSWORD].error}
                            {!isPasswordConfirmed && 'Passwords do not match.'}
                        </FormHelperText>
                    )}

                    <Button
                        disabled={isSubmitDisabled || !isPasswordConfirmed}
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                href="#"
                                onClick={() => setPageSelected('login')}
                            >
                                {'Already have an account? Log In'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

                {/*
    <form className="loginForm" onSubmit={handleSubmit}>
      Log In
      <Input {...{ input: inputs[EMAIL], handleOnChange }} />
      Password
      <Input {...{ input: inputs[PASSWORD], handleOnChange }} />
      Confirm Password
      <div className="inputField">
        <input
          className="input"
          ref={confirmPassword}
          placeholder="confirm password"
          name="confirm password"
          type="password"
          onBlur={() =>
            setIsPasswordConfirmed(
              confirmPassword.current.value === inputs[PASSWORD].value
            )
          }
        />
        {isPasswordConfirmed || (
          <div style={{ color: "red", fontSize: "1rem" }}>
            Passwords do not match.
          </div>
        )}
      </div>
      Name
      <Input {...{ input: inputs[NAME], handleOnChange }} />
      <div className="submitButton">
        <button
          type="submit"
          name="submit"
          className="btn"
          disabled={isSubmitDisabled || !isPasswordConfirmed}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
      <button
        className="login-signup-btn"
        onClick={() => setPageSelected("login")}
      >
        Log In
      </button>
    </form>

    */}
            </div>
        </Container>
    )
}
