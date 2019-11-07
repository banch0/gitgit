import { h } from 'preact';
import { Link } from 'preact-router/match';
import Icon from 'preact-material-components/Icon';
import style from './style.css';

const Footer = () => (
	<footer class={style.footer}>
		<div>
			<h2>Quotes App </h2>
			<Icon class={style.heart} style={{color: 'red'}}>favorite</Icon>
		</div>
	</footer>
);

export default Footer;
