import App from "base-shell/lib";
import React, { Component } from "react";

import _config from "./config";

export default class Demo extends Component {
  render() {
    return <App config={_config} />;
  }
}
