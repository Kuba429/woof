import { Link } from "react-router-dom";
import { breedType } from "../views/all/All";
import styles from "./BreedList.module.scss";
export function BreedList({
	items,
	header,
}: {
	items: breedType[];
	header: string;
}) {
	return (
		<>
			<h2 className={styles.header}>{header}</h2>
			{items.map((breed) => (
				<div
					className={styles.breed}
					key={`${breed.main}-${breed.sub}`}
				>
					<Link to={`/breed/${breed.main}/${breed.sub}`}>
						{breed.sub} {breed.main}
					</Link>
					<button onClick={() => alert("TODO")}>❤️</button>
				</div>
			))}
		</>
	);
}
