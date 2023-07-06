import React from "react";
import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";


const Navbar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" color="inherit">
          Tournament Calculations
        </Link>
        <Link sx={{ ml: 2 }} href="/tournaments" color="inherit">
          Tournaments
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
