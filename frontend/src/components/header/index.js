import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	componentDidMount = () => {
		console.log('did mount')
	}
	openDrawer = () => (this.drawer.MDComponent.open = true);

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	render(props) {
		console.log(props.selectedRoute);
		return (
			<div>
				<header class={style.header}>
					<h1>Quote of the day</h1>
					<nav>
						<Link activeClassName={style.active} href="/">All quotes</Link>
						<Link activeClassName={style.active} href={`/category/${"name-of-category"}`}>Category</Link>
						<Link activeClassName={style.active} href={`/author/${"name-of-author"}`}>Authors</Link>
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