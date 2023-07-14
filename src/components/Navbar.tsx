import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export function Navbar() {
	return (
		<div className={styles.navbar}>
			{
				// Tu będą ikonki zamiast tekstu
			}
			<Link to="/all">All</Link>
			<Link to="/favorites">Favorites</Link>
			<Link to="/home">Home</Link>
			<Link to="/random">Random</Link>
			<Link to="/search">Search</Link>
		</div>
	);
}
