import { h, Component } from 'preact';
import axios from 'axios';
import style from './style';
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

	}
	async getQuotes(){
		const datas = await agent.Quotes.get();
		this.setState({ quotes: datas });
		console.log(this.state);
	}

	render() {
		const { quotes } = this.state;
		return (
			<div class={`${style.home} page`}>
				<CategoryGridPage />
				{quotes !== undefined && quotes.map((m) => <Quotes unit={m} />)}

			</div>
		);
	}
}


class CategoryGridPage extends Component {
	render() {
		return (
			<div>
				<LayoutGrid>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="3">
						<Elevation z={3}>
								<div class={style.cardHeader}>
									<h2 class=" mdc-typography--title">Title of quote</h2>
									<div class=" mdc-typography--caption">Author</div>
								</div>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="3">
							<Elevation z={3}>
								<div class={style.cardHeader}>
									<h2 class=" mdc-typography--title">Title of quote</h2>
									<div class=" mdc-typography--caption">Author</div>
								</div>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="3">
							<Elevation z={3}>
								<div class={style.cardHeader}>
									<h2 class=" mdc-typography--title">Title of quote</h2>
									<div class=" mdc-typography--caption">Author</div>
								</div>
							</Elevation>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="3">
							<Elevation z={3}>
								<div class={style.cardHeader}>
									<h2 class=" mdc-typography--title">Title of quote</h2>
									<div class=" mdc-typography--caption">Author</div>
								</div>
							</Elevation>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}