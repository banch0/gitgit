import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';
import style from './style';
const axios = require('axios');
import agent from '../../agent';

export default class FormComponent extends Component {
    componentDidMount = () => {
        this.getAllAuthors();
    }
    async getAllAuthors(){
		const authors = await agent.Authors.get();
		this.setState({ authors });
    }
    async createAuthor() {
        //console.log(author);
        console.log(this.state.author);
        console.log("this.stae")
        await agent.Authors.create({ fullname: this.state.author })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div style={{ marginTop: 16 }} class={style.customForm}>
                    <TextField label="Author" outlined value={this.state.author}
                        onInput={e => this.setState({ author: e.target.value })} />
                </div>
                <div id="output"></div>
                <p>
                    <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={() => this.createAuthor()}>Добавить</Button>
                </p>
            </div>
        )
    }
}
