import { h, Component } from 'preact';
import Typography from 'preact-material-components/Typography';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Typography/style.css';
import 'preact-material-components/Card/style.css';
import style from './style';
import agent from '../../agent';

export default class EditComponent extends Component {
    componentDidMount = () => {
        this.getQuoteById();
        this.getAllAuthors();
        this.getAllCategories();
    }
    async getAllCategories(){
		const categories = await agent.Categories.get();
		this.setState({ categories });
    }

    async getAllAuthors(){
		const authors = await agent.Authors.get();
		this.setState({ authors });
    }
    async getQuoteById(){
        const oneQuote = await agent.Quotes.getById(this.props.id);
		this.setState({ oneQuote });
    }

    async createQ(){
        let myObject = {
            author: this.state.author  === '' ? this.state.oneQuote.author : this.state.author,
            category: this.state.category === '' ? this.state.oneQuote.category : this.state.category,
            quote: this.state.quote === '' ? this.state.oneQuote.quote : this.state.quote,
            category_id: this.state.categoryId === '' ? this.state.oneQuote.category_id : this.state.categoryId,
            author_id: this.state.author_id === '' ? this.state.oneQuote.author_id : this.state.author_id
        };
        await agent.Quotes.update(this.props.id, myObject);
    }


    render(props) {
        const { categories, authors } = this.state;
        return (
        <div class={`${style.profile} page`}>
            <div style={{textAlign: 'center'}}><Typography headline3>Quotes</Typography></div>
				<Card style={{ margin: 25, padding: '30px 24px 15px 30px' }}>
                <div style={{ marginTop: 16 }} class={style.customForm}>

                    <Select outlined hintText="Authors"
                        selectedIndex={this.state.author_id}
                        value={this.state.author}
                        onChange={(e) => {
                            this.setState({
                                author_id: e.target.selectedIndex,
                                author: e.target.value
                            });
                        }}>
                        {authors !== undefined && authors.map((i) => (
                            <Select.Item>{i.fullname}</Select.Item>
                        ))}
                    </Select>

                    <hr class="mdc-list-divider" style={{ margin: 24 }} />
                    <TextField textarea={true} label="Enter the quote" value={this.state.quote === '' ? this.state.oneQuote.quote : this.state.quote}
                        onInput={e => this.setState({ quote: e.target.value })} />

                    <hr class="mdc-list-divider" style={{ margin: 24 }} />
                    <Select outlined hintText="Category"
                        selectedIndex={this.state.catIndex}
                        value={this.state.category}
                        onChange={(e) => {
                            this.setState({
                                value: e.target.selectedIndex,
                                category: e.target.value
                            });
                        }}>
                        {categories !== undefined && categories.map((i) => (
                            <Select.Item>{i.title}</Select.Item>
                        ))}
                    </Select>
                </div>
                <p>
                <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={() => this.createQ()}>Добавить</Button>
                </p>
				</Card>
			</div>
        )
    }
}
