import React, { Component } from "react";
import { Icon, Feed } from "semantic-ui-react";

class InputFeed extends Component {

  render () {

    let stuffmessagelen = 0;
    if(this.props.stuffmessage != ""){
      stuffmessagelen = 1;
    }
    
    return(
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <Icon name='smile outline' color='yellow'/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{this.props.uname}</Feed.User> added gym activity at
              <Feed.Date>{this.props.actdate}</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' color='red' />{stuffmessagelen} Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
        </Feed>
    );
  }
}

export default InputFeed;
