import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";

export function AllView() {
	const breeds = useFetchAllBreeds(); // customowy hook aby wszystko było w jednym miejscu;
	// 2 hooki: useState i useEffect są potrzebne do osiągnięcia pożadanego efektu, więc stworzenie abstrakcji jest według mnie dobrym pomysłem
	return (
		<Layout>
			{breeds.map((breed) => (
				<p key={breed.address}>{breed.name}</p>
			))}
		</Layout>
	);
}

function useFetchAllBreeds() {
	const [state, setState] = useState<{ name: string; address: string }[]>([]);
	async function asyncEffect() {
		//const res = await fetch("https://dog.ceo/api/breeds/list/all");
		const res = await fetch("/backup.json");
		type rawBreedsType = {
			[breed: string]: string[];
		};
		const rawBreeds = (await res.json()).message as rawBreedsType;
		// konwertowanie ras do odpowiedniej formy
		const breeds = Object.entries(rawBreeds).flatMap(([breed, subBreeds]) =>
			subBreeds.map((sub) => ({
				name: `${sub} ${breed}`,
				// zachowuję adres aby łatwiej było dostać się później do zdjęcia.
				// Innym rozwiązaniem byłoby zachowanie rasy i podrasy i łączenie ich na bieżąco (używałoby to mniej pamięci), jednak w tym przypadku uważam, że zachowanie danych w ten sposób będzie ok
				address: `${breed}/${sub}`,
			}))
		);
		setState(breeds);
	}
	useEffect(() => {
		// oddzielna funkcja, ponieważ useEffect nie przyjmuje funckji asynchronicznych
		asyncEffect();
	}, []);
	return state;
}
