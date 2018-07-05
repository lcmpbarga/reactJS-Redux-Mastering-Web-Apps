import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAxjHNdkzcWprBfN_YNuJp0RpN7kbrvfvQ",
	authDomain: "goalcoach-3ac13.firebaseapp.com",
	databaseURL: "https://goalcoach-3ac13.firebaseio.com",
	projectId: "goalcoach-3ac13",
	storageBucket: "",
	messagingSenderId: "1039364934116"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');