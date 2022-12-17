import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import smartgym from "../ethereum/smartgym";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class  AccountNew extends Component {

  state = {
    icon: "matthew.png",
    ufirst: "",
    ulast:"",
    objective:"Health Care",
    description: "",
    joindate: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ""});

    try {

      const ctime = await new Date();
      const ttime = await ctime.toDateString();
      this.state.joindate = ttime;

      const accounts = await web3.eth.getAccounts();
      let icontmp = this.state.icon;

      switch (icontmp) {
        case "Matthew":
          icontmp = "matthew.png";
          break;
        case "Elliot":
          icontmp = 'elliot.jpg';
          break;
        case "Christian":
          icontmp = "christian.jpg";
          break;
        case "Matt":
          icontmp = "matt.jpg";
          break;
        case "Rachel":
          icontmp = "rachel.png";
          break;
        case "Molly":
          icontmp = "molly.png";
          break;
        case "Stevie":
            icontmp = "stevie.jpg";
            break;
        case "Jenny":
          icontmp = "jenny.jpg";
          break;
        default:
          icontmp = "matthew.png";
      }

      await smartgym.methods
        .createAccount(
          icontmp,
          this.state.ufirst,
          this.state.ulast,
          this.state.objective,
          this.state.description,
          this.state.joindate
        )
        .send({
          from: accounts[0]
        });

        Router.pushRoute("/");
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({ loading: false});
  };

  objectiveChange = (e, { objective }) => this.setState({ objective })

  render () {

    const { value, objective } = this.state

    const iconPlace = "https://react.semantic-ui.com/images/avatar/small/"

    const friendOptions = [
      {
        key: 'Matthew',
        text: 'Matthew',
        value: 'matthew.png',
        image: { avatar: true, src: iconPlace + 'matthew.png' },
      },
      {
        key: 'Elliot',
        text: 'Elliot',
        value: 'elliot.jpg',
        image: { avatar: true, src: iconPlace + 'elliot.jpg' },
      },
      {
        key: '.',
        text: 'Christian',
        value: 'christian.jpg',
        image: { avatar: true, src: iconPlace + 'christian.jpg' },
      },
      {
        key: 'Matt',
        text: 'Matt',
        value: 'matt.png',
        image: { avatar: true, src: iconPlace + 'matt.jpg' },
      },
      {
        key: 'Rachel',
        text: 'Rachel',
        value: 'rachel.jpg',
        image: { avatar: true, src: iconPlace + 'rachel.png' },
      },
      {
        key: 'Molly',
        text: 'Molly',
        value: 'molly.jpg',
        image: { avatar: true, src: iconPlace + 'molly.png' },
      },
      {
        key: 'Stevie',
        text: 'Stevie',
        value: 'stevie.jpg',
        image: { avatar: true, src: iconPlace + 'stevie.jpg' },
      },
      {
        key: 'Jenny',
        text: 'Jenny',
        value: 'jenny.jpg',
        image: { avatar: true, src: iconPlace + 'jenny.jpg' },
      },
    ]

    return (
      <Layout>
        <h3>Create a Account</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

        <Form.Group >
          <Form.Dropdown
            required label='Image Icon'
            options={friendOptions}
            defaultValue={friendOptions[0].value}
            onChange={event =>
              this.setState({ icon: event.target.innerText })
            }
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input fluid required label='First name' placeholder='Ichiro'
          onChange={event =>
            this.setState({ ufirst: event.target.value })}
          />
          <Form.Input fluid label='Last name' placeholder='Suzuki'
          onChange={event =>
            this.setState({ ulast: event.target.value })}
          />
        </Form.Group>

        <Form.Group inline widths='equal'>
          <label>Objective</label>
          <Form.Radio
            label='Health Care'
            objective='Health Care'
            checked={objective === 'Health Care'}
            onChange={this.objectiveChange}
          />
          <Form.Radio
            label='Diet Body'
            objective='Diet Body'
            checked={objective === 'Diet Body'}
            onChange={this.objectiveChange}
          />
          <Form.Radio
            label='Studio Program'
            objective='Studio Program'
            checked={objective === 'Studio Program'}
            onChange={this.objectiveChange}
          />
          <Form.Radio
            label='Trainning Machine'
            objective='Trainning Machine'
            checked={objective === 'Trainning Machine'}
            onChange={this.objectiveChange}
          />
        </Form.Group>

        <Form.TextArea placeholder='Ichiro Suzuki is a baseball player living in America, who enjoys going gym to diet on holidays.'
          onChange={event =>
          this.setState({ description: event.target.value })}
        />

          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button loading={this.state.loading} primary>Create  !</Button>
        </Form>
      </Layout>
    );
  }
}

export default AccountNew;
