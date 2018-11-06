import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <p className="copyright pull-right">
            TEAM INFORMATION, CMPE 280, FAll {new Date().getFullYear()}{" "}, SJSU
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
