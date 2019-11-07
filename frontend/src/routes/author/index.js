import { h, Component } from 'preact';
//import style from './style';
import FormComponent from '../../components/form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

export default class Category extends Component {
	state = {
		time: Date.now(),
		count: 10
	};

	// gets called when this route is navigated to
	componentDidMount() {
		// start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	render({ user }, { time, count }) {
		return (
			<div class={` page`}>
                <h2>by author</h2>
				<Card style={{margin: 25, padding: '30px 24px 15px 30px'}}>
					<div>{/*<FormComponent /> */}</div>
				</Card>
			</div>
		);
	}
}
