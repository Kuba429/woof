import { FormEvent, useId, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useAtom } from "jotai";
import { allBreedsAtom, breedType } from "../../stores/breeds";
import { BreedList } from "../../components/BreedList";

export function SearchView() {
	const [allBreeds] = useAtom(allBreedsAtom);
	const [query, setQuery] = useState("");
	const breedsToDisplay = applySearch(allBreeds, query);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputId = useId();
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const newQuery = inputRef.current?.value;
		if (typeof newQuery !== "string") return;
		setQuery(newQuery);
	};
	const [isEmpty, setIsEmpty] = useState(true);
	return (
		<>
			<h2 className={styles.header}>Szukaj a znajdziesz ;)</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.inputWrapper}>
					<input
						data-is-empty={isEmpty}
						onInput={(e) =>
							setIsEmpty(
								(e.target as HTMLInputElement).value.length ===
									0
							)
						}
						ref={inputRef}
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
			<BreedList fallback={listFallback} items={breedsToDisplay} />
		</>
	);
}

const listFallback = (
	<div className={styles.fallback}>
		<h1>Ups</h1>
		<p>Wygląda na to, że w naszej bazie nie ma rasy której szukasz :(</p>
	</div>
);

function applySearch(arr: breedType[], query: string) {
	return arr.filter((item) => {
		const fullName = `${item.sub} ${item.main}`.toLowerCase();
		const q = query.toLowerCase().split("");
		let i = 0;
		while (i < fullName.length && q.length) {
			if (fullName[i] === q[0]) {
				q.shift();
			}
			i++;
		}
		return q.length === 0;
	});
}
