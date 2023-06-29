import React, { Component, useState } from "react";
import "../styles/App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { firstName: "", lastName: "", relation: "" };
  }

  resetHandler() {
    this.setState({ firstName: "", lastName: "", relation: "" });
  }

  calculateHandler() {
    const first = this.state.firstName;
    const last = this.state.lastName;
    let counter = 0;
    if (!first || !last) {
      counter = -1;
    } else {
      const lowerCaseArray = Array(26).fill(0);
      const upperCaseArray = Array(26).fill(0);
      for (const ch of first) {
        if (/[a-z]/.test(ch)) {
          lowerCaseArray[ch.charCodeAt() - 97]++;
        } else if (/[A-Z]/.test(ch)) {
          upperCaseArray[ch.charCodeAt() - 65]++;
        }
      }

      for (const ch of last) {
        if (/[a-z]/.test(ch) && lowerCaseArray[ch.charCodeAt() - 97] > 0) {
          counter++;
          lowerCaseArray[ch.charCodeAt() - 97]--;
        } else if (
          /[A-Z]/.test(ch) &&
          upperCaseArray[ch.charCodeAt() - 65] > 0
        ) {
          counter++;
          upperCaseArray[ch.charCodeAt() - 65]--;
        }
      }
    }

    let result = "";
    switch ((counter * 2) % 6) {
      case 0:
        result = "Siblings";
        break;
      case 1:
        result: "Friends";
        break;
      case 2:
        result = "Love";
        break;
      case 3:
        result = "Affection";
        break;
      case 4:
        result = "Marriage";
        break;
      case 5:
        result = "Enemy";
        break;
      default:
        result = "Please Enter valid input";
    }
    this.setState({ relation: result });
  }

  render() {
    return (
      <div id="main">
        <div className="inputs">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            data-testid="input1"
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
          />
        </div>
        <div className="inputs">
          <label htmlFor="firstName">Last Name: </label>
          <input
            type="text"
            data-testid="input2"
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
          />
        </div>
        <div className="inputs">
          <button
            data-testid="calculate_relationship"
            onClick={this.calculateHandler.bind(this)}
          >
            Calculate Relationship Future
          </button>
        </div>
        <div className="inputs">
          <button data-testid="clear" onClick={this.resetHandler.bind(this)}>
            Clear inputs and relationship status
          </button>
        </div>
        <h3 data-testid="answer">{this.state.relation}</h3>
      </div>
    );
  }
}

export default App;
