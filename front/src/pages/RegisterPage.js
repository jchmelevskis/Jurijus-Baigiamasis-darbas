import React from "react";
import { Formik, Form, Field } from "formik";
import { Stack, TextField, Button, Typography } from "@mui/material";
import http from "../plugins/http";
import { useNavigate } from "react-router-dom";
import theme from "../assets/mui-theme";
import { ThemeProvider } from "@mui/material/styles";

const RegisterPage = () => {
  const [registerError, setRegisterError] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordErrorLength, setPasswordErrorLength] = React.useState(false);
  const [passwordErrorMatch, setPasswordErrorMatched] = React.useState(false);

  const nav = useNavigate();

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordOneRef = React.useRef();
  const passwordTwoRef = React.useRef();

  const register = async () => {
    if (
      firstNameRef.current.value.length < 4 ||
      firstNameRef.current.value.length > 20
    ) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (
      lastNameRef.current.value.length < 4 ||
      lastNameRef.current.value.length > 20
    ) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (
      emailRef.current.value.length < 4 ||
      emailRef.current.value.length > 20
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (
      passwordOneRef.current.value.length < 4 ||
      passwordOneRef.current.value.length > 20
    ) {
      setPasswordErrorLength(true);
    } else {
      setPasswordErrorLength(false);
    }
    if (passwordOneRef.current.value !== passwordTwoRef.current.value) {
      setPasswordErrorMatched(true);
    } else {
      setPasswordErrorMatched(false);
    }
    const subscription = [];
    const data = {
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordOneRef.current.value,
      subscription,
    };
    if (passwordOneRef.current.value === passwordTwoRef.current.value) {
      const res = await http.post(data, "register");
      if (!res.success) {
        setRegisterError(res.message);
      } else {
        nav("/login");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={register}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack
              sx={{
                width: "300px",
                border: 3,
                borderColor: "orange.main",
                padding: 1,
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                sx={{ backgroundColor: "orange.main", borderRadius: "10px" }}
                error={firstNameError}
                helperText={firstNameError ? "Incorrect entry" : ""}
                inputRef={firstNameRef}
                color="orange"
                required
                variant="outlined"
                placeholder="First name"
              />
              <TextField
                sx={{
                  marginY: 2,
                  backgroundColor: "orange.main",
                  borderRadius: "10px",
                }}
                error={lastNameError}
                helperText={lastNameError ? "Incorrect entry" : ""}
                inputRef={lastNameRef}
                color="orange"
                required
                variant="outlined"
                placeholder="Last name"
              />
              <Field
                name="email"
                as={TextField}
                sx={{ backgroundColor: "orange.main", borderRadius: "10px" }}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ""}
                inputRef={emailRef}
                color="orange"
                required
                variant="outlined"
                placeholder="Email"
              />
              <TextField
                sx={{
                  backgroundColor: "orange.main",
                  borderRadius: "10px",
                  marginY: 2,
                }}
                error={passwordErrorLength}
                helperText={
                  passwordErrorLength ? "Passwords must be in range 4-20" : ""
                }
                color="orange"
                inputRef={passwordOneRef}
                type="password"
                required
                variant="outlined"
                placeholder="Password"
              />
              <TextField
                sx={{ backgroundColor: "orange.main", borderRadius: "10px" }}
                error={passwordErrorMatch}
                helperText={
                  passwordErrorMatch ? "Passwords must be matched" : ""
                }
                color="orange"
                inputRef={passwordTwoRef}
                required
                variant="outlined"
                type="password"
                placeholder="Confirm password"
              />
              <Typography component={"h5"}>
                {registerError && registerError}
              </Typography>
              <Button
                onClick={register}
                sx={{ marginY: 1, color: "white" }}
                color="orange"
                variant="contained"
              >
                Register
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default RegisterPage;
