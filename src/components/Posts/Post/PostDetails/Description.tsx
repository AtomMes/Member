import { Box, styled, Typography } from "@mui/material";
import React from "react";

const PostDesc = styled(Box)(({ theme }) => ({
  width: "100%",
}));

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => {
  const [close, setClose] = React.useState<boolean>(true);
  const [descText, setDescText] = React.useState<string>("");

  React.useEffect(() => {
    setDescText(close ? text.substring(0, 20) : text);
  }, [close]);

  return (
    <PostDesc onClick={() => setClose(!close)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
        width="100%"
      >
        <Typography
          display="flex"
          onClick={() => setClose(!close)}
          sx={{ maxWidth: "100%", overflowWrap: "anywhere" }}
        >
          {descText}
        </Typography>
        {text.length > 20 && close && (
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography flex="1">...</Typography>{" "}
            <Typography
              marginLeft="10px"
              color="gray"
              sx={{
                "&:hover": {
                  color: "#047891",
                },
                cursor: "pointer",
              }}
            >
              ...see more
            </Typography>
          </Box>
        )}
      </Box>
    </PostDesc>
  );
};

export default Description;
