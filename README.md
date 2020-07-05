## Brainfreeze Execution Visualizer

### About

This React App is an execution visualizer for the [esoteric programming language Brainf\*\*\*](https://esolangs.org/wiki/Brainfuck) or Brainfreeze. With just 8 operations and two pointers, this program executes BF scripts and visualizes its execution. It highlights the instruction it is currently executing and points to the memory cell the data pointer is currently pointing to. Additionally, it supports input and stepping through the execution by a user inputted count. 

### Source Code

The app lies in `App.js` and uses `react-bootstrap` for styling. `DataArray.js` is responsible for rendering the Memory data and stepping through the script and `InstructionScript.js` is responsible for rendering the script and the instruction pointer. 

### How to run

- [ ] Make sure that you have Node.js set up in your machine. If you don't, [download it from the Node.js website](https://nodejs.org/en/download/). 

- [ ] Clone this repository to your computer:

	```bash
		git clone https://github.com/lovdeep7/brainfreeze-visualizer.git
	```
- [ ] Install required packages using `npm i`.
- [ ] Run the app using `npm start`.
- [ ] Enter brainfreeze script and click submit. A script that outputs Hello World\n has already been populated for you. Step through the script and learn how brainfreeze works! 

### Demo
Visit http://lovdeep7.github.io/brainfreeze-visualizer to try it out.