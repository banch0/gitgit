import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TextField/style.css';
import style from './style';
import agent from '../../agent';

export default class FormComponent extends Component {
    componentDidMount = () => {
        this.getAllCategories();
    }

    async getAllCategories(){
		const categories = await agent.Categories.get();
		this.setState({ categories });
    }

    async createCategory(){
        let categoriesObject = {
            title: this.state.category
        }
        await agent.Categories.create(categoriesObject);
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: 16 }} class={style.customForm}>
                    <TextField label="Category" outlined value={this.state.category}
                        onInput={e => this.setState({ category: e.target.value })} />
                </div>
                <p>
                    <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={() => this.createCategory()}>Добавить</Button>
                </p>
            </div>
        )
    }
}
