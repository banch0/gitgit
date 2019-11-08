import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Dialog from 'preact-material-components/Dialog';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';
import 'preact-material-components/Dialog/style.css';
import agent from '../../agent';

export default class Quotes extends Component {
	async deleteQuote(id) {
		await agent.Quotes.delete(id);
	}

	render() {
		console.log(this.props);
		const { title, id, author, quote } = this.props.unit;
		return (
			<div>
				<Card style={{ margin: 25 }} class={style.quoteCard}>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">{author}</h2>
						<div class=" mdc-typography--caption">{title}</div>
					</div>
					<div class={style.cardBody}>
						{quote}
					</div>
					<Card.Actions>
						<Card.ActionButton >
							<IconButton.Icon style={{ color: '#e70f29' }}><a style={{ textDecoration: 'none' }} href={`/editquote/${id}`}>edit</a></IconButton.Icon>
						</Card.ActionButton>

						<Card.ActionIcons>
							<IconButton.Icon style={{ color: '#e70f29' }} onClick={() => {
								this.scrollingDlg.MDComponent.show();
							}}>delete</IconButton.Icon>
						</Card.ActionIcons>
					</Card.Actions>
				</Card>
				<div>
					<Dialog ref={scrollingDlg => { this.scrollingDlg = scrollingDlg; }}>
						<Dialog.Header>Are you sure, want to delete it?</Dialog.Header>
						<Dialog.Footer>
							<Dialog.FooterButton cancel={true}>NO</Dialog.FooterButton>
							<Dialog.FooterButton onClick={() => this.deleteQuote(id)} accept={true}>YES</Dialog.FooterButton>
						</Dialog.Footer>
					</Dialog>
				</div>
			</div>
		)
	}
}