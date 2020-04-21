import React from "react";
import { post } from "../../utils";
import { GET_USER } from "../../constants";
import { useForm } from "../../hooks";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

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
}));

export const LoginForm = ({ setPageSelected, setUser }) => {
  const EMAIL = "email";
  const PASSWORD = "password";

  const inputsSchema = {
    [EMAIL]: {
      value: "",
      error: "",
      name: EMAIL,
      required: true,
      validator: {
        regEx: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/,
        error: "Must be a valid email address.",
      },
    },
    [PASSWORD]: {
      value: "",
      error: "",
      type: "password",
      name: PASSWORD,
      required: true,
    },
  };

  const doLogin = async (body, isSubmitDisabled) => {
    //Prevents user from double-clicking the submit button
    const error = (e) => {
      console.log(e);
    };
    const result = await post(GET_USER, body, error);
    isSubmitDisabled(false);
    if (result) {
      setUser(result);
      setPageSelected("homepage");
    }
  };

  const { handleSubmit, handleOnChange, inputs, isSubmitDisabled, email, password } = useForm(
    inputsSchema,
    doLogin
  );

  const classes = useStyles();

  /*
  export const Input = ({ input, handleOnChange }) => {
    return (
      <div className="inputField">
        <input
          className="input"
          type={input.type || "text"}
          placeholder={input.name}
          value={input.value}
          name={input.name}
          onChange={handleOnChange}
        />
        <div style={{ color: "red"}}>{input.error}</div>
      </div>
    );
*/

function handOnChange() {

  isSubmitDisabled = false;
}

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
          <TextField {...{ input: inputsSchema[EMAIL], handleOnChange }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus 
            value = {email}
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
            value = {password}
            onChange={handleOnChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button disabled={isSubmitDisabled}
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
              <Link href="#" onClick={() => setPageSelected("signup")}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

};


