import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  ImageList,
  ImageListItem,
  Button,
  Alert,
  IconButton,
  ImageListItemBar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

function Favourite() {
  const navigate = useNavigate();
  const [itemData, setItemData] = React.useState([]);

  function get_image() {
    var keys = Object.keys(localStorage);
    keys.forEach((key) => {
      var json_str = localStorage.getItem(key);
      setItemData((oldArray) => [...oldArray, json_str]);
    });
  }

  useEffect(() => {
    get_image();
  }, []);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
        }}
      >
        <div>
          <Button variant="contained" onClick={goBack}>
            Back
          </Button>
        </div>

        <ImageList
          sx={{
            width: "100%",
            height: "90%",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
          cols={3}
          gap={8}
          variant="woven"
        >
          {itemData.map((item, i) => (
            <ImageListItem key={item}>
              <img
                id={`${item}`}
                src={`${item}`}
                srcSet={`${item}`}
                alt={item}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
              <ImageListItemBar
                subtitle={item}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default Favourite;
