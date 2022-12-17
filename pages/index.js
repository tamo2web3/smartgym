import React, { Component } from "react";
import { Card, Button, Menu, Icon, Label, Segment, Feed } from 'semantic-ui-react';
import smartgym from "../ethereum/smartgym";
import Layout from "../components/Layout";
import InputCard from "../components/InputCard";
import InputLink from "../components/InputLink";
import InputFeed from "../components/InputFeed";
import { Link } from "../routes";

class SmartGymIndex extends Component {

  static async getInitialProps(props) {
    const accounts = await smartgym.methods.getAllAcounts().call();
    const gyms = await smartgym.methods.getAllGyms().call();
    return { accounts, gyms };
  }

  renderFeed () {
      return this.props.gyms.map((gym, index) => {
          return <InputFeed
            key={index}
            id={index}
            adr={gym[0]}
            actdate={gym[1]}
            min={gym[3]}
            stuffmessage={gym[7]}
            uname={gym[8]}
          />;
      });
  }

  renderCard () {
    return this.props.accounts.map((account, index) => {
      return <InputCard
        key={index}
        id={index}
        adr={account[0]}
        icon={account[1]}
        ufirst={account[2]}
        ulast={account[3]}
        objective={account[4]}
        description={account[5]}
        joindate={account[6]}
      />;
    });
  }

  renderLink () {

     let gymlength = 0;
     let stuffmessagelen = 0;
     this.props.gyms.map((gym, index) => {
       gymlength++;
       if (gym[7] != "") {
         stuffmessagelen++;
       }
    });

    return this.props.accounts.map((account, index) => {
      return <InputLink
          key={index}
          id={index}
          address={account[0]}
          gymlen={gymlength}
          stuffmessagelen={stuffmessagelen}/>
    });
  }

  render() {

    return(
      <Layout>
        <div>
          <Link route="/newaccount">
            <a><Button content="Create Account" icon="add circle" secondary /></a>
          </Link>
          <Segment.Group horizontal>
            <Segment>
              <Card>{this.renderCard()}</Card>
              {this.renderLink()}
            </Segment>
            <Segment>
              {this.renderFeed()}
            </Segment>
          </Segment.Group>
        </div>
      </Layout>
    );
  }
};

 export default SmartGymIndex;
