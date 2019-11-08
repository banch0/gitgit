import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {

	render(props) {
		return (
			<div>
				<header class={style.header}>
					<h1>Quote of the day</h1>
					<nav>
						<Link activeClassName={style.active} href="/">All quotes</Link>
						<Link activeClassName={style.active} href={`/createcategory`}>Category</Link>
						<Link activeClassName={style.active} href={`/createauthor`}>Authors</Link>
					</nav>
				</header>
			<RandomQuotes />
			</div>
		);
	}
}


class RandomQuotes extends Component {
	render() {
		return (
			<div class={style.page_header}>
				<h1 style={{marginBottom:50}}>Quote of the day </h1>
				<Link class={style.button} href="/quotes">CREATE QUOTE</Link>
			</div>
		);
	}
}