import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Dialog from 'preact-material-components/Dialog';
import IconButton from 'preact-material-components/IconButton';
import 'preact-material-components/IconButton/style.css';
import 'preact-material-components/Dialog/style.css';

export default class Quotes extends Component {
	render() {
		console.log(this.props.data)
		console.log("this. props")
		const {title, id, author, quote, author_id, category_id} = this.props
		return (
			<div>
				<Card style={{ margin: 25 }} class={style.quoteCard}>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">Title of quote</h2>
						<div class=" mdc-typography--caption">Author</div>
					</div>
					<div class={style.cardBody}>
						{/* {this.props.data.quote} */}
					</div>
					<Card.Actions>
						<Card.ActionButton  href="/jai">
							<IconButton.Icon style={{ color: '#e70f29' }}><a style={{textDecoration: 'none'}} href="/main/fhfh">edit</a></IconButton.Icon>
						</Card.ActionButton>

						<Card.ActionIcons>
							<IconButton.Icon style={{ color: '#e70f29' }} onClick={() => {
						this.scrollingDlg.MDComponent.show();
					}}>delete</IconButton.Icon>
						</Card.ActionIcons>
					</Card.Actions>
				</Card>
				<div>
					<Dialog ref={scrollingDlg => { this.scrollingDlg = scrollingDlg;}}>
						<Dialog.Header>Are you sure, want to delete it?</Dialog.Header>
						<Dialog.Body>
							There are maybe your quotes
 						 </Dialog.Body>
						<Dialog.Footer>
							<Dialog.FooterButton cancel={true}>NO</Dialog.FooterButton>
							<Dialog.FooterButton onClick={() => console.log("how")} accept={true}>YES</Dialog.FooterButton>
						</Dialog.Footer>
					</Dialog>
				</div>
			</div>
		)
	}
}