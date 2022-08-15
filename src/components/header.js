import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Body from "./body";
export default function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{ backgroundColor: "#272727", justifyContent: "center" }}
        >
          <HourglassTopIcon />
          <Typography>Acktivity</Typography>
        </Toolbar>
      </AppBar>
      <Body />
    </div>
  );
}
