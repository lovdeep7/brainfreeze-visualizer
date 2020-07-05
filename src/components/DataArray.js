import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default class DataArray extends Component{

  render() {
    let currDataPointer = 0;
    if (this.props.pointer) currDataPointer = this.props.pointer;
    return(
      <div>
        <div className="brainfuck-step">
        <h2>Data Array</h2>
          <Form inline className="float-sm-right" onSubmit={this.props.handleStep}>
            <Form.Label htmlFor="inlineFormInputName2" srOnly>
              Count
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="inlineFormInputName2"
              placeholder="Count"
            />
            <Button variant="primary" className="mb-2" type="submit">
              Step
            </Button>
          </Form>
        </div>
        <Table size="sm" bordered>
          <tbody>
            <tr>
              {this.props.data.map((item, index) => (
                currDataPointer === index ?
                <td style={{backgroundColor: '#FFFF00'}} width="5%" key={index}>{item}</td>
                :<td width="5%" key={index}>{item}</td>
              ))}
            </tr>
          </tbody>
        </Table>
        <Table borderless size="sm">
          <tbody>
           <tr>
            {this.props.data_pointer_array.map((item, index) => (
              <td width="5%" key={index}>{item}</td>
            ))}
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
};