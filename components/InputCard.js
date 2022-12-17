import React, { Component } from "react";
import { Popup, Card, Image, Rating } from "semantic-ui-react";

class InputCard extends Component {
  render () {

    const { adr, icon, ufirst, ulast, objective, description, joindate } = this.props

    const img = "https://react.semantic-ui.com/images/avatar/large/" + icon;
    const hdr = ufirst + " " + ulast;
    const mta = joindate + " Joined, for " + objective;
    const dsc = description;

    console.log(img);

    return (
      <Card
        image={img}
        header={hdr}
        meta={mta}
        description={dsc}
      />
    )
  }
}

export default InputCard;
