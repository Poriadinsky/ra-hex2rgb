import { Component } from "react";

export class RGB extends Component {
  render() {
    const { color } = this.props;

    return <div className="rgb">{color}</div>;
  }
}
