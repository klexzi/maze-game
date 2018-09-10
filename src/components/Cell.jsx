import React, { Component } from "react";
import mario from "../mario.png";
import mushroom from "../mushroom.png";

const cell = ({ value }) => {
  let style = {
    width: 45,
    height: 40,
    margin: 0,
    border: "1px solid #000",
    backgroundSize: "contain"
  };

  if (value === "player") {
    style.backgroundImage = `url(${mario})`;
  }
  if (value === "fruits") {
    style.backgroundImage = `url(${mushroom})`;
  }

  return style;
};
export default props => <td style={cell(props.cell)} />;
// class Cell extends Component {
//   state = {
//     cell: { ...this.props.cell },
//     styles: {
//       width: 45,
//       height: 40,
//       margin: 0,
//       border: "1px solid #000",
//       backgroundImage: "",
//       backgroundSize: "contain"
//     }
//   };
//   componentDidMount() {
//     const { value } = this.props.cell;
//     if (value === "player") {
//       this.setState({
//         styles: { ...this.state.styles, backgroundImage: `url(${mario}` }
//       });
//     } else if (value === "fruits") {
//       this.setState({
//         styles: { ...this.state.styles, backgroundImage: `url(${mushroom}` }
//       });
//     }
//   }
//   render() {
//     console.log(this.props.cell);
//     return <td style={this.state.styles} />;
//   }
// }

// export default Cell;
