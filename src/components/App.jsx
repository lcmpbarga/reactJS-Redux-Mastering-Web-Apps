import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: '',
			dueDate: this.currentDateTime()
		}
	}

	currentDateTime(){
		const time = new Date();
		
		const y = time.getFullYear();
		const d = this.leading0(time.getDate());
		const m = this.leading0(time.getMonth()+1);
		const h = this.leading0(time.getHours());
		const mi = this.leading0(time.getMinutes());
		
		const currentDateTime = y+"-"+m+"-"+d+"T"+h+":"+mi;

		return currentDateTime;
	}

	addReminder(){
		if(this.state.text !== '')
			this.props.addReminder(this.state.text, this.state.dueDate);
	}

	deleteReminder(id){
		this.props.deleteReminder(id);
	}

	leading0(num){
		return num < 10 ? '0' + num : num; //IF OTIMIZADO!
	}

	renderReminders(){
		const { reminders } = this.props;
		return (
			<ul className="list-group col-sn-4">
			{
				reminders.map(reminder => {
					return(
						// if (reminder.id) {}
						<li key={reminder.id} className="list-group-item">
							<div className="list-item">
								<div>{reminder.text}</div>
								<div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
							</div>
							<div 
								className="list-item delete-button"
								onClick={() => this.deleteReminder(reminder.id)}
							>
								&#x2715;
							</div>
						</li>
					)
				})
			}
			</ul>
		)
	}

	render(){
		return(
			<div className="App">
				<div className="title">
					Remimder Pro
				</div>
				<div className="form-inline reminder">
					<div className="form-group">
						<input 
							className="form-control"
							placeholder="I have to ..."
							onChange={event => this.setState({text: event.target.value})}
						/>
						<input 
							className="form-control"
							type="datetime-local"
							value={this.state.dueDate}
							onChange={event => this.setState({dueDate: event.target.value})}
						/>
					</div>
					<button
						type="button"
						className="btn btn-success"
						onClick={ () => this.addReminder() }
					>
						Add Remimder
					</button>
					{this.renderReminders()}
					<div
						className="btn btn-danger"
						onClick={() => this.props.clearReminders()}
					>
						Clear Reminders
					</div>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	// console.log('state', state);
	return{
		reminders: state
	}
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators( {addReminder}, dispatch );
// 	// switch(this.add = 'addReminder'){
// 	// 	case 'addReminder':
// 	// 		return bindActionCreators( {addReminder}, dispatch );
// 	// 	case 'addCourse':
// 	// 		return bindActionCreators( {addCourse}, dispatch );
// 	// 	default:
// 	// 		return bindActionCreators( { }, dispatch );

// 	// }
// }