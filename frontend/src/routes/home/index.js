import { h, Component } from 'preact';
import style from '../style';
import agent from '../../agent';
import Quotes from "../../components/quotes";
import Elevation from 'preact-material-components/Elevation';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Elevation/style.css';

export default class Home extends Component {
	componentDidMount = () => {
		this.getQuotes();
		this.getAllCategories();
		this.getAllAuthors();
	}

	async getQuotes() {
		const datas = await agent.Quotes.get();
		this.setState({ quotes: datas });
	}

	async getAllAuthors() {
        const authors = await agent.Authors.get();
        this.setState({ authors });
    }

	async getAllCategories() {
		const categories = await agent.Categories.get();
		this.setState({ categories });
	}

	render() {
		const { quotes } = this.state;
		console.log("main quotes")
		console.log(this.state)
		return (
			<div class={`${style.home} page`}>
				<CategoryGridPage categories={this.state.categories} />
				<AuthorGridPage authors={this.state.authors}/>
				{quotes !== undefined && quotes.map((m) => <Quotes unit={m} />)}

			</div>
		);
	}
}


class CategoryGridPage extends Component {
	render() {
		if (!this.props.categories) {
			return null
		} else {
			console.log()
			return (
				<div>
					<LayoutGrid>
						<LayoutGrid.Inner>
							{this.props.categories.map(v => (
								<LayoutGrid.Cell cols="3">
									<Elevation z={3}>
										<div class={style.cardHeader}>
											<h2 class="mdc-typography--title">
												<a style={{ textDecoration: 'none', color: '#0e102b' }} href={`/category/${v.id}`}>{v.title}</a>
											</h2>
										</div>
									</Elevation>
								</LayoutGrid.Cell>
							))}
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			);
		}
	}
}

class AuthorGridPage extends Component {
	render() {
		if (!this.props.authors) {
			return null
		} else {
			console.log()
			return (
				<div>
					<LayoutGrid>
						<LayoutGrid.Inner>
							{this.props.authors.map(v => (
								<LayoutGrid.Cell cols="3">
									<Elevation z={3}>
										<div class={style.cardHeader}>
											<h2 class="mdc-typography--title">
												<a style={{ textDecoration: 'none', color: '#0e102b' }} href={`/author/${v.id}`}>{v.fullname}</a>
											</h2>
										</div>
									</Elevation>
								</LayoutGrid.Cell>
							))}
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			);
		}
	}
}