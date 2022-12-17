import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import smartgym from "../ethereum/smartgym";
import { Router } from "../routes";

class InputRow extends Component {

  state = {
    adr: "",
    actdate: "",
    machine: "",
    rowid :0
  };

  onPutMessageClick = async (event) => {

    let msg = prompt('Please input Message to this Activity.');

    // console.log("adr: " + this.state.adr
    //             + ", actdate: " + this.state.actdate
    //           + ", machine: " + this.state.machine
    //         + ", rowid: " + this.state.rowid);

    //Contract上のインデックスを出す
    let contid = 0;
    let tempid = 0;
    this.props.gyms.map((gym, index) => {
      if (gym[0] == this.props.adr &&
          gym[1] == this.props.actdate &&
          gym[2] == this.props.machine) {
        contid = tempid;
      }
      tempid++;
    });

    // console.log(contid);
    const accounts = await web3.eth.getAccounts();

    await smartgym.methods
      .putMessage(
        msg,
        contid
      )
      .send({
        from: accounts[0]
      });

      Router.pushRoute(`/smartgym/${this.props.adr}`);
  };

  render () {

    const { Row, Cell } = Table;
    const {id, adr, actdate, machine, cal, min, keybefore, keyafter, stuffmessage } = this.props

    const key = keybefore + " -> " + keyafter

    this.state.adr = adr;
    this.state.actdate = actdate;
    this.state.machine = machine;
    this.state.rowid = id;

    return (
      <Row>
      <Cell>{id}</Cell>
      <Cell>{actdate}</Cell>
      <Cell>{machine}</Cell>
      <Cell>{min}</Cell>
      <Cell>{cal}</Cell>
      <Cell>{key}</Cell>
      <Cell>{stuffmessage}</Cell>
      <Cell>
        <Button
          color="blue"
          basic
          onClick={this.onPutMessageClick}>
          Input Yell Me
        </Button>
      </Cell>
      </Row>
    )
  }
}

export default InputRow;
