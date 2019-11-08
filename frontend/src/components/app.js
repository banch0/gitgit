import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';
import Main from '../routes/home';
import Quote from '../routes/quotes';
import CreateAuthor from '../routes/createauthor';
import CreateCategory from '../routes/createcategory';
import ByAuthor from '../routes/author';
import ByCategory from '../routes/category';
import NotFound from '../routes/404';
import EditComponent from '../routes/editform';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {
		return (
			<div id="app">
				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Main path="/" />
					<Quote path="/quotes" />
					<ByAuthor path="/author/:id" />
					<ByCategory path="/category/:id" />
					<CreateAuthor path="/createauthor" />
					<CreateCategory path="/createcategory" />
					<EditComponent  path="/editquote/:id" />
					<NotFound default />
				</Router>
				<Footer />
			</div>
		);
	}
}
