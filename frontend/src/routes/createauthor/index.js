import { h, Component } from 'preact';
//import style from './style';
import FormComponent from './form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

export default class CreateAuthor extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		console.log(user)
		return (
			<div class={` page`}>
				<Card style={{margin: 25, padding: '30px 24px 15px 30px'}}>
					<FormComponent />
				</Card>
			</div>
		);
	}
}
