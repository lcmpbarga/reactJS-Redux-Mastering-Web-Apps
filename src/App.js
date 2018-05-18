import React, { Component } from 'react';
import Clock from './Clock';
import './App.css';
import {Form, FormControl, Button} from 'react-bootstrap';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			deadline: 'May 25, 2018',
		}
	}

	changeDeadLine(){
		// this.setState({deadline: 'November 25, 2017'})
		// console.log('state', this.state);
		this.setState({deadline: this.state.newDeadLine});
	}

	render() {
		return(
			<div className="App">
				<div className="App-title">
					Dark Souls: Remastered is Coming
					<br/>
					Countdown to {this.state.deadline}
				</div>
				<Clock
					deadline = {this.state.deadline}
				/>
				<Form inline>
					<FormControl
						className="Deadline-input"  
						placeholder={this.state.deadline}
						onChange={event => this.setState({
							newDeadLine: event.target.value
						})}
					/>
					<Button onClick={() => this.changeDeadLine()}>
						Submit
					</Button>
				</Form>
			</div>
		)
	}
}

export default App;