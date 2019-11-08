import { h, Component } from 'preact';
import style from '../style';
import agent from '../../agent';
import Quotes from "../../components/quotes";
import 'preact-material-components/Card/style.css';

export default class Category extends Component {
	componentDidMount = () => {
		this.getByCategories();
	}

	async getByCategories() {
		const quotes = await agent.Categories.getById(this.props.id);
		this.setState({ quotes });
	}

	render() {
		const { quotes } = this.state
		console.log(quotes)
		return (
			<div class={`${style.profile} page`}>
				<div style={{ textAlign: 'center' }}>
					<h1>By Category</h1>
				</div>
				{quotes !== undefined && quotes.map((m) => <Quotes unit={m} />)}
			</div>
		);
	}
}
