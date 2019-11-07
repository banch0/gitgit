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
	GetAllQuotes = () => {
        axios.get('http://localhost:8081/quote/abb')
            .then(function (res) {
				console.log(JSON.stringify(res.data))
            })
            .catch(function (err) {
                console.log(err.message)
            });
	}

	componentDidMount = () => {
		this.GetAllQuotes()
		this.getQuotes()

	}
	async getQuotes(){
		const datas = await agent.Quotes.get()
		this.setState({quotes:datas})
		console.log(this.state)
	}

	render() {
		return (
			<div class={`${style.home} page`}>
				<CategoryGridPage />
				{[1, 2, 3, 4, 5].map(() => {
					return <Quotes data={this.state.quotes}/>
				})}

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