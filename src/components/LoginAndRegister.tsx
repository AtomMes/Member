import {
  Box,
  Button,
  Stack, styled, TextField,
  Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  to: string;
  reg?: boolean;
  handleClick: (
    email: string,
    password: string,
    username: string | null
  ) => void;
}

const StyledStack = styled(Stack)(({ theme }) => ({
  display: "flex",
  margin: "auto",
  position: "absolute",
  maxWidth: "650px",
  left: 0,
  right: 0,
}));

const LoginAndRegister: React.FC<Props> = ({ title, to, reg, handleClick }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("atom@mail.ru");
  const [pass, setPass] = React.useState("created");

  return (
    <StyledStack>
      <Typography variant="h4">{title}</Typography>
      {reg && (
        <TextField
          type="text"
          label="Username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <TextField
        type="email"
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        variant="filled"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button onClick={() => handleClick(email, pass, username)}>
        {title}
      </Button>
      <Box display="flex">
        <Typography>
          {reg ? "Already have an account? " : "don't have an account? "}
        </Typography>
        <Link style={{ textDecoration: "none", color: "black" }} to={to}>
          {reg ? "Login" : "Register"}
        </Link>
      </Box>
    </StyledStack>
  );
};

export default LoginAndRegister;
