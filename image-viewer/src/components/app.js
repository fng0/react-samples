import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import ImageIcon from "material-ui/svg-icons/image/image";
import bindHandlerHelper from "../utils/bind-handler-helper";
import ImageViewer from "./image-viewer";

const APP_BAR_HEIGHT = 64;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "./images/image1.png",
      sw: 0,
      sh: 0
    };

    bindHandlerHelper([
      "handleResize",
      "handleImageChange"
    ], this);
  }

  componentDidMount() {
    const { width: sw, height: sh } = this.getWindowSize();
    this.setState({sw, sh});

    window.addEventListener("resize", this.handleResize);
  }

  getWindowSize() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }

  handleResize() {
    const { width: sw, height: sh } = this.getWindowSize();
    this.setState({sw, sh});
  }

  handleImageChange(e, child) {
    this.setState({image: child.props.value});
  }

  render() {
    const { sw, sh, image } = this.state;

    return (
      <div style={{width: "100%", height: "100%"}}>
        <AppBar
          title="ImageViewer"
          iconElementLeft={<span />}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: "right", vertical: "top"}}
              anchorOrigin={{horizontal: "right", vertical: "top"}}
              onItemTouchTap={this.handleImageChange}
            >
              <MenuItem primaryText="image1" leftIcon={<ImageIcon />} value="./images/image1.png" />
              <MenuItem primaryText="image2" leftIcon={<ImageIcon />} value="./images/image2.png" />
            </IconMenu>
          }
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 999
          }}
        />
        <ImageViewer
          style={{
            width: sw,
            height: sh,
            overflow: "hidden"
          }}
          image={image}
        />
      </div>
    );
    return ;
  }
}
