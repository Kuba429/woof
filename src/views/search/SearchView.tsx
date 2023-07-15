import { FormEvent, useId } from "react";
import styles from "./Search.module.scss";
export function SearchView() {
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// TODO
	};
	const inputId = useId();
	return (
		<>
			<h2 className={styles.header}>Szukaj a znajdziesz ;)</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputWrapper}>
					<input
						id={inputId}
						className={styles.input}
						placeholder="np. Bulldog"
						type="text"
					/>
					<label htmlFor={inputId}>
						Wpisz nazwę rasy, której szukasz
					</label>
				</div>
				<button type="submit" className={styles.button}>
					Szukaj
				</button>
			</form>
		</>
	);
}
