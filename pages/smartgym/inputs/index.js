import React, { Component } from "react";
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from "../../../components/Layout";
import InputRow from "../../../components/InputRow";
import ChartData from "./chart";
import smartgym from "../../../ethereum/smartgym";

class inputShow extends Component {

  state = {
    errorMessage: ""
    };

  static async getInitialProps(props) {
    const adr = props.query.address;
    const gyms = await smartgym.methods.getAllGyms().call();
    return { gyms, adr };
  }

  renderChart () {
    return <ChartData gyms = {this.props.gyms} />
  }

  renderRow() {
    const gymslen = this.props.gyms.length;
    return this.props.gyms.map((gym, index) => {
      if (gym[0] == this.props.adr) {
        return <InputRow
          key={index}
          id={index}
          adr={gym[0]}
          actdate={gym[1]}
          machine={gym[2]}
          min={gym[3]}
          cal={gym[4]}
          keybefore={gym[5]}
          keyafter={gym[6]}
          stuffmessage={gym[7]}
          gyms={this.props.gyms}
        />;
      }
    });
  }

  render() {

    const { Header, Row, HeaderCell, Body } = Table;

    return(
      <Layout>
        <h3>Trainning Histories</h3>
        <Link route={`/smartgym/${this.props.adr}/new`}>
          <a>
            <Button
              content="Input Gym"
              icon="add circle"
              secondary
            />
          </a>
        </Link>
        <Table sortable celled selectable compact striped color='black' key='black'>
          <Header>
            <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Date</HeaderCell>
            <HeaderCell>Machine</HeaderCell>
            <HeaderCell>min</HeaderCell>
            <HeaderCell>cal</HeaderCell>
            <HeaderCell>Weight</HeaderCell>
            <HeaderCell>Gym Stuff Yell/Messages</HeaderCell>
            <HeaderCell></HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        {this.renderChart()}
      </Layout>
    );
  }
}

export default inputShow;
