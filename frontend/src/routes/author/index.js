import { h, Component } from 'preact';
import style from '../style';
import agent from '../../agent';
import Quotes from "../../components/quotes";
import 'preact-material-components/Card/style.css';

export default class Author extends Component {
	componentDidMount = () => {
		this.getByAuthors();
	}

	async getByAuthors() {
		const quotes = await agent.Authors.getById(this.props.id);
		this.setState({ quotes });
	}

	render(props) {
		const { quotes } = this.state
		console.log(this.state)
		return (
			<div class={`${style.profile} page`}>
				<div style={{ textAlign: 'center' }}>
					<h1>By Author</h1>
				</div>
				{quotes !== undefined && quotes.map((m) => <Quotes unit={m} />)}
			</div>
		);
	}
}
