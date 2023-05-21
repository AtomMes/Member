import { AppBar, Stack, Typography, Button } from "@mui/material";
import React from "react";

const ErrorNavBar = () => {
  const [showError, setShowError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 3000);
  }, []);

  return (
    <>
      {showError ? (
        <AppBar
          sx={{
            height: "100vh",
            bgcolor: "white",
            color: "darkGray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Stack gap={"20px"}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Oops!
            </Typography>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", width: "100%", maxWidth: "700px" }}
            >
              Something went wrong. We're sorry for the inconvenience. Please
              click the button below to see if it resolves the issue.
            </Typography>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                color: "white",
                bgcolor: "#047891",
                width: "100%",
                maxWidth: "300px",
                margin: "30px auto",
                "&:hover": {
                  bgcolor: "#016d85",
                },
              }}
              onClick={() => {
                localStorage.removeItem("isAuth");
                window.location.reload();
              }}
            >
              Try Again
            </Button>
          </Stack>
        </AppBar>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorNavBar;
