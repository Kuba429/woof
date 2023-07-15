import { FormEvent } from "react";
import styles from "./Search.module.scss";
export function SearchView() {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// TODO
	};
	return (
		<>
			<h2 className={styles.header}>Szukaj a znajdziesz ;)</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					className={styles.input}
					placeholder="np. Bulldog"
					type="text"
				/>
				<button type="submit" className={styles.button}>
					Szukaj
				</button>
			</form>
		</>
	);
}
