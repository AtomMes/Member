import { Lock, LockOpen, Mail, Person } from "@mui/icons-material";
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
    username: string | null
  ) => void;
  err: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "350px",
  width: "100%",
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
}) => {
  const [username, setUsername] = React.useState<string | null>();
  const [email, setEmail] = React.useState<string | null>();
  const [pass, setPass] = React.useState<string | null>();
  const [confirmPass, setConfirmPass] = React.useState<string | null>();
  const [validateInputs, setValidateInputs] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  console.log(validateInputs);

  const updateItem = (index: number) => {
    setValidateInputs([
      ...validateInputs.slice(0, index),
      true,
      ...validateInputs.slice(index + 1),
    ]);
  };

  const login = () => {
    if (email && username && pass && confirmPass === pass) {
      handleClick(email, pass, username);
    } else {
    }
  };

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
            helperText={!username && "This field is required"}
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
          helperText={!email && "This field is required"}
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
          helperText={!pass && "This field is required"}
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
            type="text"
            label="Password"
            error={!confirmPass && validateInputs[3] === true}
            helperText={!confirmPass && "This field is required"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpen color="primary" />
                </InputAdornment>
              ),
            }}
            onBlur={() => updateItem(3)}
          />
        )}
      </Stack>
      <Button
        onClick={login}
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
