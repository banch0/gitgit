import { h, Component } from 'preact';
import FormComponent from './form';
import Card from 'preact-material-components/Card';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Typography/style.css';
import style from '../style'

export default class CreateAuthor extends Component {

	render() {
		return (
			<div class={`${style.profile} page`}>
				<div style={{ textAlign: 'center' }}><Typography headline3>Create Authors</Typography></div>
				<Card style={{ margin: 25, padding: '30px 24px 15px 30px', marginBottom: 41 }}>
					<FormComponent />
				</Card>
			</div>
		);
	}
}
