import { h, Component } from 'preact';
//import style from './style';
import FormComponent from '../../components/form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

export default class Category extends Component {
	//by author searhc page

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
