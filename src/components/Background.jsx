import { Component } from "react";
import { RGB } from "./RGB";

export class Background extends Component {
  constructor() {
    super();
    this.shortHexSize = 4;
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      color: null,
    };
  }

  handleInput() {
    let input = document.querySelector(".hex");
    if (input.value.length === 7) {
      if (input.value.match(/#[a-f0-9]{6}\b/gi) === null) {
        this.setState({
          color: "Ошибка!",
        });
        document.querySelector("body").style.background = `white`;
        document.querySelector(".rgb").style.background = `white`;
      } else {
        let getColor = this.hexToRgb(input.value);

        this.setState({
          color: `rgb(${getColor.r}, ${getColor.g}, ${getColor.b})`,
        });

        document.querySelector("body").style.background = `rgb(${
          getColor.r + 20
        }, ${getColor.g + 20}, ${getColor.b + 20})`;
        document.querySelector(".rgb").style.background = input.value;
      }
    } else if (input.value.length > 7) {
      this.setState({
        color: "Ошибка!",
      });
      document.querySelector("body").style.background = `white`;
      document.querySelector(".rgb").style.background = `white`;
    } else if (input.value.length < 7) {
      this.setState({
        color: null,
      });
      document.querySelector("body").style.background = `white`;
      document.querySelector(".rgb").style.background = `white`;
    }
  }

  hexToRgb = (hexStr) => {
    let hexColor =
      hexStr.length !== this.shortHexSize
        ? hexStr
        : this.shortHexToLong(hexStr);

    const bigint = parseInt(hexColor.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  shortHexToLong = (hex) => {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  };

  render() {
    return (
      <div className="container">
        <input className="hex" onInput={this.handleInput} />
        <RGB color={this.state.color} />
      </div>
    );
  }
}
