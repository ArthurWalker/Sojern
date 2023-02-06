import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";
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

function Homepage() {
  const navigate = useNavigate();

  const [itemData, setItemData] = useState([]);
  const [fav_count, setFavCount] = useState(0);
  const [showAlert, setAlert] = useState(false);
  const [myStyle, setMyStyle] = useState({});
  const [selected, setSelected] = useState([]);

  function get_image() {
    setItemData([]);
    var count = 0;
    while (count < 6) {
      axios.get(`https://random.dog/woof.json`).then((res) => {
        var temp_res = res.data.url;
        console.log(temp_res.split(".").at(-1));
        if (
          temp_res.split(".").at(-1) !== "mp4" &&
          temp_res.split(".").at(-1) !== "webm"
        ) {
          setItemData((oldArray) => [...oldArray, res.data.url]);
        }
      });
      count += 1;
    }
  }

  useEffect(() => {
    localStorage.clear();
    get_image();
  }, []);

  const handleClick = (event) => {
    if (fav_count < 6) {
      const itemSet = localStorage.getItem(event.target.id) === null;
      if (itemSet) {
        setFavCount(fav_count + 1);
        localStorage.setItem(event.target.id, event.target.src);
        setSelected((oldArray) => [...oldArray, event.target.src]);
      } else {
        setFavCount(fav_count - 1);
        localStorage.removeItem(event.target.id);
        setSelected((current) =>
          current.filter((val) => val !== event.target.src)
        );
      }
      setAlert(false);
      setMyStyle((prevState) => ({
        ...myStyle,
        [event]: !prevState[event],
      }));
    } else {
      setAlert(true);
    }
  };

  const gotoFavourite = () => {
    navigate("/favourite");
  };
  return (
    <div style={{ width: "100%" }}>
      {showAlert && (
        <Alert severity="error">
          You have selected 6 favourite images — Stop here!
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
        }}
      >
        <div>
          <Button variant="contained" onClick={get_image}>
            Refresh
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={gotoFavourite}>
            View favourite
          </Button>
          <p>Number of selected: {fav_count}</p>
          <div>
            {selected.map((item) => (
              <p>{item}</p>
            ))}
          </div>
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
                  boxShadow: myStyle[`${item}`]
                    ? "4px 3px 8px 0px rgba(1, 156, 48, 0.3)"
                    : "initial",
                }}
                onClick={handleClick}
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

export default Homepage;
