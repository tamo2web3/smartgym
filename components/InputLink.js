import React, { Component } from "react";
import { Menu, Icon, Label } from "semantic-ui-react";
import { Link } from "../routes";

class InputLink extends Component {

  renderInner () {
    return (
      <Menu compact inverted>
          <Menu.Item as='a'>
            <Icon name='calendar check' /> Trainning Histories
            <Label color='yellow' floating>
              {this.props.gymlen}
            </Label>
          </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='thumbs up outline' /> Comments
          <Label color='red' floating>
            {this.props.stuffmessagelen}
          </Label>
        </Menu.Item>
      </Menu>
    );
  }

  render () {

    return (
      <Link route={`/smartgym/${this.props.address}`}>{this.renderInner()}</Link>
    )
  }
}

export default InputLink;
