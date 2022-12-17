import React, { Component } from 'react';
import { Item } from 'semantic-ui-react'
import Youtube from "react-youtube";
import Layout from "../components/Layout";
import "../components/style.module.css";

class VideoShow extends Component{

  renderList() {
    const videolist = [
      "xOEontwitK4",
      "EiDxYUjHc3E",
      "CdNy715BU6E",
      "6qmDKo7ar6E",
      "JKtSTihxJBM",
    ];

    return(
      videolist.map((value, index) => {
        let txt = Number(index) + 1;
        if (txt < 2) {
          txt ="1. Treadmill";
        } else if (txt < 3){
          txt ="2. Abdominal Crunch";
        } else if (txt < 4){
          txt ="3. Rotary Torso";
        } else if (txt < 5){
          txt ="4. Back Extension";
        } else if (txt < 6){
          txt ="5. Glute";
        }

        return(
          <Item key={value}>
            <Item.Content verticalAlign='middle'>
              <h4><Item.Header content={txt}/></h4>
            </Item.Content>
            <Youtube videoId={value} />
          </Item>
        )
      })
    );
  }

  render() {
    return(
      <Layout>
        <h3>Machine List</h3>
        {this.renderList()}
      </Layout>
    );
  }
}

export default VideoShow;
