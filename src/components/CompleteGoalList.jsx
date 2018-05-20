import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCompleted } from '../actions';
import { completeGoalRef } from '../firebase';
import GoalItem from './GoalItem'

class CompleteGoalList extends Component{
	componentDidMount(){
		completeGoalRef.on('value', snap => {
			let completeGoals = [];
			snap.forEach(completeGoal => {
				const { email, title } = completeGoal.val();
				completeGoals.push({email, title});
			})
			this.props.setCompleted(completeGoals);
		})
	}

	clearCompleted(){
		completeGoalRef.set([]);
	}

	render(){
		console.log(this.props);
		return(
			<div>
				{
					this.props.completeGoals.map((completeGoal, index) => {
						const { title, email } = completeGoal;
						return(
							<div key={index}>
								<strong>{title}</strong>
								<span style={{marginRight: '5px'}}> completed by: <em>{email}</em></span>
							</div>
						)
					})
				}
				<button
					className="btn btn-sn btn-primary"
					onClick={ () => this.clearCompleted() }
				>
					Clear All
				</button>
			</div>
		)
	}
}

function mapStateToProps(state){
	const { completeGoals } = state;
	return {
		completeGoals
	}
}

export default connect(mapStateToProps, {setCompleted})(CompleteGoalList);
