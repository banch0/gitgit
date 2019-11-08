import { h, Component } from 'preact';
import style from '../style';
import FormComponent from '../../components/form'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import agent from '../../agent'

export default class Category extends Component {
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
	render() {
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
