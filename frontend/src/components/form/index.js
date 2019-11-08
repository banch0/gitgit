import { h, Component } from 'preact';
import Typography from 'preact-material-components/Typography';
import Select from 'preact-material-components/Select';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import 'preact-material-components/Typography/style.css';
import style from './style';
import agent from '../../agent';

export default class FormComponent extends Component {
    componentDidMount = () => {
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

    async createQ(){
        let myObject = {
            author: this.state.author,
            category: this.state.category,
            quote: this.state.quote,
            category_id: this.state.value,
            author_id: this.state.author_id
        };
        await agent.Quotes.create(myObject);
    }

    render() {
        console.log(this.state);
        const { categories, authors } = this.state;
        return (
            <div>
                <div><Typography headline3>Цытатник</Typography></div>
                <div style={{ marginTop: 16 }} class={style.customForm}>
                    {/* <TextField label="Автор" outlined value={this.state.author}
                        onInput={e => this.setState({ author: e.target.value })} /> */}
                    <Select outlined hintText="Выберите категорию"
                        selectedIndex={this.state.author_id}
                        value={this.state.author}
                        onChange={(e) => {
                            this.setState({
                                author_id: e.target.selectedIndex,
                                author: e.target.value
                            });
                        }}>
                        {authors !== undefined && authors.map((i) => (
                            <Select.Item>author + {i}</Select.Item>
                        ))}
                    </Select>
                    <hr class="mdc-list-divider" style={{ margin: 24 }} />
                    <TextField textarea={true} label="Введите цытату" value={this.state.quote}
                        onInput={e => this.setState({ quote: e.target.value })} />

                    <hr class="mdc-list-divider" style={{ margin: 24 }} />
                    <Select outlined hintText="Выберите категорию"
                        selectedIndex={this.state.catIndex}
                        value={this.state.category}
                        onChange={(e) => {
                            this.setState({
                                value: e.target.selectedIndex,
                                category: e.target.value
                            });
                        }}>
                        {categories !== undefined && categories.map((i) => (
                            <Select.Item>opt + {i}</Select.Item>
                        ))}
                    </Select>
                </div>
                <div id="output"></div>
                <p>
                    <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={() => this.createQ()}>Добавить</Button>
                </p>
            </div>
        )
    }
}
