import { GppGood, Lock, LockOpen, Mail, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  to: string;
  reg?: boolean;
  header: string;
  handleClick: (
    email: string,
    password: string,
    username?: string | null
  ) => void;
  err: boolean;
  fieldErr: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "350px",
  width: "66%",
  padding: "40px 50px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  borderRadius: "20px",
}));

const LoginAndRegister: React.FC<Props> = ({
  title,
  to,
  reg,
  handleClick,
  header,
  err,
  fieldErr,
}) => {
  const [username, setUsername] = React.useState<string | null>();
  const [email, setEmail] = React.useState<string | null>("employer@gmail.com");
  const [pass, setPass] = React.useState<string | null>("employer");
  const [confirmPass, setConfirmPass] = React.useState<string | null>();
  const [localErr, setLocalErr] = React.useState<string | null>();

  const [validateInputs, setValidateInputs] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const updateItem = (index: number) => {
    setValidateInputs([
      ...validateInputs.slice(0, index),
      true,
      ...validateInputs.slice(index + 1),
    ]);
  };

  const loginAndRegister = () => {
    if (reg) {
      if (!(pass && confirmPass && email && username)) {
        setValidateInputs([
          username ? false : true,
          email ? false : true,
          pass ? false : true,
          confirmPass ? false : true,
        ]);
      } else if (pass !== confirmPass) {
        setLocalErr("*Password confirmation failed");
      } else if (pass!.length < 6) {
        setLocalErr("*Password must have at least 6 characters");
      } else if (
        !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setLocalErr("*Invalid email address");
      } else {
        setLocalErr(null);
        handleClick(email!, pass!, username!);
      }
    } else {
      if (!(pass && email)) {
        setValidateInputs([
          false,
          email ? false : true,
          pass ? false : true,
          false,
        ]);
      } else if (pass.length < 6) {
        setLocalErr("*Password must have at least 6 characters");
      } else if (
        !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setLocalErr("*Invalid email address");
      } else {
        setLocalErr(null);
        handleClick(email!, pass!);
      }
    }
  };

  React.useEffect(() => {
    if (fieldErr) {
      setValidateInputs([
        username ? false : true,
        email ? false : true,
        pass ? false : true,
        confirmPass ? false : true,
      ]);
    }
  }, [fieldErr]);

  return (
    <StyledPaper>
      <Typography
        variant="h5"
        textAlign="center"
        marginBottom="10px"
        fontWeight="700"
      >
        {header}

        <Typography
          variant="body1"
          color="gray"
          textAlign="center"
          marginTop="10px"
        >
          {reg
            ? "Register to access to all features of Member."
            : "Enter your credentials to access your account."}
        </Typography>
      </Typography>

      <Stack gap="15px">
        {reg && (
          <TextField
            type="text"
            label="Username"
            error={!username && validateInputs[0] === true}
            helperText={
              !username && validateInputs[0] === true && "*Username is required"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginAndRegister();
              }
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              ),
            }}
            onBlur={() => updateItem(0)}
          />
        )}
        <TextField
          type="email"
          label="Email"
          error={!email && validateInputs[1] === true}
          helperText={
            !email && validateInputs[1] === true && "*Email is required"
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loginAndRegister();
            }
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail color="primary" />
              </InputAdornment>
            ),
          }}
          onBlur={() => updateItem(1)}
        />
        <TextField
          type="password"
          label="Password"
          error={!pass && validateInputs[2] === true}
          helperText={
            !pass && validateInputs[2] === true && "*Password is required"
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loginAndRegister();
            }
          }}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="primary" />
              </InputAdornment>
            ),
          }}
          onBlur={() => updateItem(2)}
        />
        {reg && (
          <TextField
            type="password"
            label="Password Confirmation"
            error={!confirmPass && validateInputs[3] === true}
            helperText={
              !confirmPass &&
              validateInputs[3] === true &&
              "*Password confirmation is required"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginAndRegister();
              }
            }}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GppGood color="primary" />
                </InputAdornment>
              ),
            }}
            onBlur={() => updateItem(3)}
          />
        )}
      </Stack>
      <Typography color="error" fontSize="15px">
        {localErr}
        {err &&
          (reg
            ? "*Something went wrong. User registration failed"
            : "*Incorrect email addres or password")}
        {fieldErr && "*Please fill all the fields"}
      </Typography>
      <Button
        onClick={loginAndRegister}
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        {title}
      </Button>
      <Box display="flex">
        <Typography marginRight="5px">
          {reg ? "Already have an account? " : "don't have an account? "}
        </Typography>
        <Link style={{ color: "black" }} to={to}>
          {reg ? "Login" : "Register"}
        </Link>
      </Box>
    </StyledPaper>
  );
};

export default LoginAndRegister;
