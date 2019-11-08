import { h, Component } from 'preact';
import style from './style';
import FormComponent from './form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
export default class CreateCategory extends Component {

	render() {
		return (
			<div class={`${style.profile} page`}>
				<div style={{ textAlign: 'center' }}><Typography headline3>Create Categories</Typography></div>
				<Card style={{ margin: 25, padding: '30px 24px 15px 30px' }}>
					<FormComponent />
				</Card>
			</div>
		);
	}
}
