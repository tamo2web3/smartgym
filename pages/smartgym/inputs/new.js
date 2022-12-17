import React, { Component } from "react";
import { Form, Button, Input, Message, Checkbox, Segment, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../../components/Layout";
import smartgym from "../../../ethereum/smartgym";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class InputGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actdate: new Date(),
      machine: "",
      min: 0,
      cal: 0,
      keybefore: 0,
      keyafter: 0,
      stuffmessage: "",
      errorMessage: "",
      loading: false,
      uname: "",
      day : new Date(),
      item: ""
    };
}

  static async getInitialProps(props) {
    const adr = props.query.address;
    const gyms = await smartgym.methods.getAllGyms().call();
    return {adr, gyms};
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: ""});

    try{

      await this.setuname();
      const accounts = await web3.eth.getAccounts();
      const {actdate, machine, min, cal, keybefore, keyafter, uname } = this.state;

      const formatactdate = this.formatdate(actdate);

      console.log("actdate:" + actdate+ ", machine:" + machine + ", min:" + min + ", cal:" + cal);

      await smartgym.methods
        .inputGym(
          formatactdate, machine, min, cal, keybefore, keyafter, "", uname
        )
        .send({
          from: accounts[0]
        });
        Router.pushRoute(`/smartgym/${accounts[0]}`);
    } catch (err) {
      this.setState({errorMessage: err.message});
    }
    this.setState({ loading: false});
  };

   machineChange = (e, { machine }) => {
     this.setState({ machine })
   }

   itemChange = (e, { item }) => {
      if(item=="min"){ this.setState( {"min": e.target.value }) }
      if(item=="cal"){ this.setState( {"cal": e.target.value }) }
      if(item=="keybefore"){ this.setState( {"keybefore": e.target.value }) }
      if(item=="keyafter"){ this.setState( {"keyafter": e.target.value }) }
   }

  setuname() {
    this.props.gyms.map((gym, index) => {
      if (gym[0] == this.props.adr) {
        this.setState({uname: gym[8]});
        return;
      }
    });
  }

  formatdate(dt) {
   var y = dt.getFullYear();
   var m = ('00' + (dt.getMonth()+1)).slice(-2);
   var d = ('00' + dt.getDate()).slice(-2);
   return (y + '/' + m + '/' + d);
  };

  render() {
    const items = [
      {label:'Time[min.]', key: 'min', placeholder:'45'},
      {label:'Cal [Kcal.]', key: 'cal', placeholder:'400'},
      {label:'Weight(Before) [Kg]', key: 'keybefore', placeholder:'55'},
      {label:'Weight(After) [Kg]', key: 'keyafter', placeholder:'54'}
    ];

    let listitems = items.map((item) =>
        <Form.Input fluid required
          label={item.label}
          key={item.key}
          item={item.key}
          placeholder={item.placeholder}
          onChange={this.itemChange}
        />
    );

    const machines = [
      {label:'Treadmill', checked:false},
      {label:'Abdominal crunch', checked:false},
      {label:'Rotary torso', checked:false},
      {label:'Back extension', checked:false}
    ];

    let listmachines = machines.map((machine) =>
        <Form.Radio
          type="checkbox"
          key={machine.label}
          label={machine.label}
          machine={machine.label}
          checked={this.state.machine === machine.label}
          onChange={this.machineChange} />
    );

    return(
      <Layout>
        <Segment color='black'>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Group inline widths='equal'>
                <Button content="Save" secondary loading={this.state.loading} />
                <label>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={this.state.actdate}
                    onChange={(date) => this.setState({actdate: date})}
                  />
                </label>
              </Form.Group>
              <Form.Group inline widths='equal'>{listitems}</Form.Group>
              <Form.Group inline widths='equal'>{listmachines}</Form.Group>
              <Message error header="Oops!" content={this.state.errorMessage} />
          </Form>
        </Segment>
      </Layout>
    )
  }
}

export default InputGym;
