import { h, Component } from 'preact';
import style from './style';
import FormComponent from '../../components/form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import agent from '../../agent'

export default class Category extends Component {
	// gets called when this route is navigated to
	componentDidMount() {
		this.getAllAuthors();
		this.getAllCategories();
	}

	async getAllAuthors(){
		const authors = await agent.Authors.get();
		this.setState({ authors });
	}
	async getAllCategories(){
		const categories = await agent.Categories.get();
		this.setState({ categories });
	}
	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		console.log(user);
		console.log(this.state);
		return (
			<div class={`${style.profile} page`}>
				<Card style={{ margin: 25, padding: '30px 24px 15px 30px' }}>
					<FormComponent />
				</Card>
			</div>
		);
	}
}
