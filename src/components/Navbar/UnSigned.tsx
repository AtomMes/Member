import { Login, PersonAdd } from "@mui/icons-material";
import { Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../utils/theme";

const UnSigned = () => {
  const navigate = useNavigate();
  const float = useMediaQuery(theme.breakpoints.down(410));

  return (
    <Stack flexDirection="row" gap="15px">
      {!float ? (
        <>
          <Button
            variant="outlined"
            startIcon={<Login />}
            sx={{ textTransform: "none", whiteSpace: "nowrap" }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <IconButton onClick={() => navigate("/login")}>
            <Login sx={{ color: "#047891" }} />
          </IconButton>
          <IconButton onClick={() => navigate("/register")}>
            <PersonAdd sx={{ color: "#047891" }} />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default UnSigned;
