import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

import InstructionScript  from './components/InstructionScript';
import DataArray  from './components/DataArray';

export default class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      instruction_pointer: 0,
      data_pointer: 0,
      data_pointer_array: [],
      input: "",
      output: "",
      script: [""],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //16 cells of data
      done: false,
      error: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStep = this.handleStep.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    //handle BF script
    var rawScript = event.target[0].value;
    var encodedScript = encodeURIComponent(rawScript); // encode for special characters

    //handle Input
    let input = "";
    if (event.target[1].value) {
      input = event.target[1].value;
    }

    fetch("https://bf-api.symops.io/api/v1/brainfuck/?script=" + encodedScript + "&input=" + input, 
      {method: 'POST', })
      .then(res => res.json())
      .then(
        (result) => {
          const dataArray = result.data.slice(0,15);
          this.setState({
            id: result.id,
            instruction_pointer: result.instruction_pointer,
            data_pointer: result.data_pointer,
            input: result.input,
            output: result.output,
            script: result.script,
            data: dataArray,
            done: result.done
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

  handleStep(event) {
    event.preventDefault();
    if(!this.state.done) { //avoid calling API if execution is complete
      var count = Math.max(1, event.target[0].value); // default step: 1
      let dataPointerArray = new Array(15).fill(" ");

      fetch("https://bf-api.symops.io/api/v1/brainfuck/" + this.state.id + "/step?count=" + count, 
      {method: 'POST', })
      .then(res => res.json())
      .then(
        (result) => {
          const dataArray = result.data.slice(0,15);
          dataPointerArray[result.data_pointer] = "^"; // include caret at data pointer
          this.setState({
            id: result.id,
            instruction_pointer: result.instruction_pointer,
            data_pointer: result.data_pointer,
            data_pointer_array: dataPointerArray, 
            output: result.output,
            script: result.script,
            data: dataArray,
            done: result.done
          });
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <h1>
            Enter your Brainfreeze <code>script</code> and hit submit.
          </h1>
        </div>
        </header>
        <div className="brainfuck-script">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formScript">
              <Form.Label>Brainfreeze Script</Form.Label>
              <Form.Control 
                as="textarea" 
                rows="3" 
                placeholder="Enter brainfuck script"
                defaultValue="++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++."
              />
              <Form.Text className="text-muted">
                Please only include brainfreeze operations.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="brainfuck-input">
             <Form.Label>Input</Form.Label>
              <Form.Control placeholder="Enter input" />
              <Form.Text className="text-muted">
              This is optional.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        {this.state.id &&
          <div>
            <InstructionScript 
              pointer={this.state.instruction_pointer}
              script={this.state.script}/> 
            <DataArray 
              pointer={this.state.data_pointer} 
              data_pointer_array={this.state.data_pointer_array}
              data={this.state.data}
              handleStep={this.handleStep} />
            <div>
              <code className="output">Output: {this.state.output}</code>
            </div>
          </div>
        }
      </div>

    );
  }
}
