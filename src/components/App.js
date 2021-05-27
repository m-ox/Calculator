import { Component } from 'react'
import * as math from 'mathjs'

import Input from "./input"
import Button from "./button"

export default class App extends Component {
  constructor() {
    super()

    this.state= {
      input: '0',
      ops: [
        ['7', '8', '9', '+'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '*'],
        ['^', '0', '.', '/'],
      ]
    }
  }

  // below is how we pass a value from a child component to parent so state can be changed!
  handleChange = value => {

    const input = this.state.input === '0' ? this.state.input.slice(1) + value : this.state.input + value

    if (this.state.input.length < 10) {
      this.setState({
      input
        })
      }

    }

  renderButtons = () => {
    return this.state.ops.map(row => {
      return (
        <div className="row">
          {row.map(digit => {
            return <Button handleClick={this.handleChange} key={digit}>{digit}</Button>
          })
          }
        </div>
      )
    })
  }

  handleCalculation = () => {
    const total = math.evaluate(this.state.input)

    this.setState({
      input: total
    })
  }

  render() {
    return (
      <div className="calcInterface">
        <span id="tag">Not A 90's Casio Calculator</span>
        <Input input={this.state.input} />
        <div className="buttons">
          {this.renderButtons()}
        </div>

        <div className="clearing">
          <Button label='clear'
            handleClick={() => this.setState({input: '0'})}>
            clear
          </Button>

          <Button label='equal'
            handleClick={this.handleCalculation}
          >
          =
          </Button>
        </div>
        
        
      </div>
    )
  }
}
