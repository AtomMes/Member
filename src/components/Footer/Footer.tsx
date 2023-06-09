import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logoM.png";
import { auth } from "../../firebase";

const Footer = () => {
  const navigate = useNavigate();

  const navigationButtons1 = [
    {
      text: "Home",
      to: "/",
    },
    {
      text: "Contacts",
      to: "/contacts",
    },
  ];
  const navigationButtons2 = [
    {
      text: "Chats",
      to: "/Messaging",
    },
    {
      text: "Profile",
      to: `/profile/${auth.currentUser?.uid}`,
    },
  ];

  const socNet = [
    {
      icon: <LinkedIn />,
      to: "https://www.linkedin.com/in/artem-mesropyan",
    },
    {
      icon: <GitHub />,
      to: "https://www.github.com/AtomMes/",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#046a80",
        width: "100%",
        paddingTop: "30px",
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            alignItems: "center",
            marginBottom: "30px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: { xs: "15px", md: 0 },
              marginLeft: { xs: 0, md: "50px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                bgcolor: "white",
                width: "90px",
                height: "90px",
              }}
            >
              <Box
                component="img"
                alt="img"
                src={logo}
                sx={{ width: "50px", height: "50px" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: "center",
                justifyContent: "center",
                width: { md: "200px", xs: "260px" },
                gap: { md: "15px", xs: "30px" },
              }}
            >
              {navigationButtons1.map((nav, i) => (
                <Button
                  onClick={() => navigate(nav.to)}
                  sx={{
                    textTransform: "none",
                    width: "100px",
                    margin: "10px 0",
                    paddingX: "20px",
                    bgcolor: "white",
                    color: "#046a80",
                    transition: ".2s",
                    "&:hover": {
                      bgcolor: "white",
                      color: "#046a80",
                      transform: "scale(1.1)",
                    },
                  }}
                  key={i}
                >
                  {nav.text}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "center",
                alignItems: "center",
                width: { md: "200px", xs: "260px" },
                gap: { md: "15px", xs: "30px" },
              }}
            >
              {navigationButtons2.map((nav, i) => (
                <Button
                  onClick={() => navigate(nav.to)}
                  sx={{
                    textTransform: "none",
                    width: "100px",
                    margin: "10px 0",
                    paddingX: "20px",
                    bgcolor: "white",
                    color: "#046a80",
                    transition: ".2s",
                    "&:hover": {
                      bgcolor: "white",
                      color: "#046a80",
                      transform: "scale(1.1)",
                    },
                  }}
                  key={i}
                >
                  {nav.text}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "15px 20px",
            borderTop: "1px solid",
            borderTopColor: "gray",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "white" }}>Built by Artem</Typography>
          <Box display="flex" sx={{ gap: "10px" }}>
            {socNet.map((net, i) => (
              <a key={i} href={net.to} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    width: "40px",
                    height: "40px",
                    borderRadius: "100%",
                    borderColor: "white",
                    display: "flex",
                    padding: 0,
                    minHeight: 0,
                    minWidth: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: "1px",
                  }}
                >
                  {net.icon}
                </Button>
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
