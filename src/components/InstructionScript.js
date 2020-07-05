import React, {Component} from 'react';

export default class InstructionScript extends Component{

  render() {
    let currInstructionPointer = this.props.pointer;
    return(
      <div>
        <h2>Instruction Script</h2>
        <div>
          {this.props.script.map((item, index) => (
            currInstructionPointer === index ?
              <p key={index} style={{display:'inline', backgroundColor: '#FFFF00'}}>{item}</p>
              :<p key={index} style={{display:'inline'}}>{item}</p>
          ))}
        </div>
      </div>
    );
  }
};