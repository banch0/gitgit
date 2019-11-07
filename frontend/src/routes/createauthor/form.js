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
const axios = require('axios');

export default class FormComponent extends Component {

    createAuthor = () => {
        var output = document.getElementById('output');
        let myObject = {
            name: this.state.author
        }
        axios.post('http://localhost:8081/author/adff', myObject)
            .then(function (res) {
                output.className = 'container';
                output.innerHTML = res.data;
            })
            .catch(function (err) {
                output.className = 'container text-danger';
                output.innerHTML = err.message;
            });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div><Typography headline3>Create Authors</Typography></div>
                <div style={{ marginTop: 16 }} class={style.customForm}>
                    <TextField label="Author" outlined value={this.state.author}
                        onInput={e => this.setState({ author: e.target.value })} />
                </div>
                <div id="output"></div>
                <p>
                    <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={this.createAuthor}>Добавить</Button>
                </p>
            </div>
        )
    }
}
