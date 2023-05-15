import React from "react";
import { Formik, Form, Field } from "formik";
import { Stack, TextField, Button, Typography } from "@mui/material";
import http from "../plugins/http";
import { useDispatch } from "react-redux";
import {
  fetchUsers,
  setAdmin,
  setLoggedInUser,
  setUsername,
  setSubscription,
} from "../features/users";
import { useNavigate } from "react-router-dom";
import theme from "../assets/mui-theme";
import { ThemeProvider } from "@mui/material/styles";

const LoginPage = () => {
  const [getError, setError] = React.useState("");
  const nav = useNavigate();
  const disp = useDispatch();

  const login = async (values) => {
    const res = await http.post(values, "login");
    if (!res.success) {
      setError(res.message);
    } else {
      disp(fetchUsers({ allUsers: res.allUsers }));
      localStorage.setItem("userSecret", res.secret);
      disp(setLoggedInUser({ user: res.user }));
      disp(setUsername({ firstname: res.user.firstname }));
      disp(setSubscription({ subscription: res.subscription }));
      if (res.firstname === "admin") disp(setAdmin({ boolean: true }));
      nav("/");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.email === "admin" && values.password === "admin") {
            return {};
          }
          return errors;
        }}
        onSubmit={login}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack
              sx={{
                width: "300px",
                border: 1,
                borderColor: "orange.main",
                padding: 1,
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Field
                name="email"
                as={TextField}
                sx={{ backgroundColor: "orange.main", borderRadius: "10px" }}
                color="orange"
                required
                variant="outlined"
                placeholder="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                name="password"
                as={TextField}
                sx={{
                  backgroundColor: "orange.main",
                  borderRadius: "10px",
                  marginY: 2,
                }}
                color="orange"
                required
                variant="outlined"
                placeholder="Password"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {getError && (
                <Typography sx={{ color: "orange.main" }} component={"h5"}>
                  {getError}
                </Typography>
              )}
              <Button
                type="submit"
                sx={{ marginY: 1, color: "white" }}
                color="orange"
                variant="contained"
              >
                Login
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default LoginPage;
