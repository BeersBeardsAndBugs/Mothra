import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React from 'react'
import { PATH } from '../../constants'
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

export const LoginForm = ({ setPageSelected, user }) => {
    const EMAIL = 'email'
    const PASSWORD = 'password'

    const inputsSchema = {
        [EMAIL]: {
            value: '',
            error: '',
            name: EMAIL,
            required: true,
            validator: {
                regEx: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/,
                error: 'Must be a valid email address.',
            },
        },
        [PASSWORD]: {
            value: '',
            error: '',
            type: 'password',
            name: PASSWORD,
            required: true,
        },
    }

    const doLogin = (body) => {
        user.login(PATH.LOGIN, body)
    }

    const { handleSubmit, handleOnChange, isSubmitDisabled, inputs } = useForm(
        inputsSchema,
        doLogin
    )

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        name={EMAIL}
                        value={inputs[EMAIL].value}
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
                        autoComplete="current-password"
                        name={PASSWORD}
                        value={inputs[PASSWORD].value}
                        onChange={handleOnChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    {user.hasError && (
                        <FormHelperText error>
                            Invalid Username or Password
                        </FormHelperText>
                    )}
                    {inputs[PASSWORD].error && (
                        <FormHelperText error>
                            {inputs[PASSWORD].error}
                        </FormHelperText>
                    )}
                    {inputs[EMAIL].error && (
                        <FormHelperText error>
                            {inputs[EMAIL].error}
                        </FormHelperText>
                    )}

                    <Button
                        disabled={isSubmitDisabled || false}
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                href="#"
                                onClick={() => setPageSelected('signup')}
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
