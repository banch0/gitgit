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
import agent from '../../agent'

// imagesDelete = (img) => {
//     try {
//         if (!img.name) {
//             return this.props.removeImages(img)
//         } else {
//             this.props.removeImages(img.name)
//         }
//     } catch (e) {
//         console.log(e.message)
//     }
// }

export default class FormComponent extends Component {
    componentDidMount = () => {
        this.GetAllAuthors()
        // this.GetAllCategory()
        this.submit()
    }
    async submit() {
        const { email, password } = this.state
        const promise = await agent.Categories.get()
        console.log("primise:", promise)
        //this.props.onSubmit(promise)
    
      }
    
    // GetAllCategory = () => {
    //     axios.get('http://localhost:8081/category/faf')
    //         .then(function (res) {
    //             console.log(res)
	// 			console.log(JSON.stringify(res.data))
    //         })
    //         .catch(function (err) {
    //             console.log(err.message)
    //         });
    // }
    
    GetAllAuthors = () => {
        axios.get('http://localhost:8081/author/aff')
            .then(function (res) {
				console.log(JSON.stringify(res.data))
            })
            .catch(function (err) {
                console.log(err.message)
            });
    }
    
    createQuote = () => {
        var output = document.getElementById('output');
        let myObject = {
            author: this.state.author,
            category: this.state.category,
            quote: this.state.quote,
            category_id: 3,
            author_id: 3,
        }
        axios.post('http://localhost:8081/quote/abc', myObject)
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
                <div><Typography headline3>Цытатник</Typography></div>
                <div style={{ marginTop: 16 }} class={style.customForm}>
                    <TextField label="Автор" outlined value={this.state.author}
                        onInput={e => this.setState({ author: e.target.value })} />

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
                        {[1, 2, 3, 4, 55, 6].map((i) => (
                            <Select.Item>opt + {i}</Select.Item>
                        ))}
                    </Select>
                </div>
                <div id="output"></div>
                <p>
                    <Button style={{ background: '#008cff', fontSize: 19, height: 62 }}
                        raised ripple onClick={this.createQuote}>Добавить</Button>
                </p>
            </div>
        )
    }
}
