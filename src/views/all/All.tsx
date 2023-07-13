import styles from "./All.module.scss";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Link } from "react-router-dom";

export function AllView() {
	const breeds = useFetchAllBreeds(); // customowy hook aby wszystko było w jednym miejscu;
	// 2 hooki: useState i useEffect są potrzebne do osiągnięcia pożadanego efektu, więc stworzenie abstrakcji jest według mnie dobrym pomysłem
	return (
		<Layout>
			<div>
				{breeds.map((breed) => (
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
			</div>
		</Layout>
	);
}

export type breedType = { main: string; sub: string };
function useFetchAllBreeds() {
	const [state, setState] = useState<breedType[]>([]);
	async function asyncEffect() {
		// const res = await fetch("https://dog.ceo/api/breeds/list/all");
		const res = await fetch("/backup.json");
		type rawBreedsType = {
			[breed: string]: string[];
		};
		const rawBreeds = (await res.json()).message as rawBreedsType;
		// konwertowanie ras do odpowiedniej formy
		const breeds = Object.entries(rawBreeds).flatMap(([main, sub]) =>
			sub.map((sub) => ({ main, sub }))
		);
		setState(breeds);
	}
	useEffect(() => {
		// oddzielna funkcja, ponieważ useEffect nie przyjmuje funckji asynchronicznych
		asyncEffect();
	}, []);
	return state;
}
