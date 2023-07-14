import { atom } from "jotai";

const LOCAL_STORAGE_LIKED_KEY = "liked-breeds";

export type breedType = Awaited<ReturnType<typeof fetchAllBreeds>>[number];

async function fetchAllBreeds() {
	// const res = await fetch("https://dog.ceo/api/breeds/list/all");
	const liked = getLikedBreeds();
	const res = await fetch("/backup.json");
	type rawBreedsType = { [breed: string]: string[] };
	const rawBreeds = (await res.json()).message as rawBreedsType;
	// konwertowanie ras do odpowiedniej formy
	const breeds = Object.entries(rawBreeds).flatMap(([main, sub]) =>
		sub.map((sub) => ({
			main,
			sub,
			image: undefined as string | undefined, // zapamiętuję url do obrazu aby nie wysyłać tego samego zapytania za każdym razem bez potrzeby
			isLiked: liked.some(
				([itemMain, itemSub]) => itemMain === main && itemSub === sub
			),
		}))
	);
	return breeds;
}
function getLikedBreeds(): [string, string][] {
	const likedJson = localStorage.getItem(LOCAL_STORAGE_LIKED_KEY);
	if (!likedJson) return [];
	return JSON.parse(likedJson);
}
export const allBreedsAtom = atom(await fetchAllBreeds());
export const setImageAtom = atom(
	null,
	(get, set, update: { main: string; sub: string; newImage: string }) => {
		console.log(update.newImage);
		const copy = [...get(allBreedsAtom)];
		const itemToUpdate = copy.find(
			(item) => item.sub === update.sub && item.main === update.main
		);
		if (!itemToUpdate) {
			return;
		}
		itemToUpdate.image = update.newImage;
		set(allBreedsAtom, copy);
	}
);
export const toggleLikedAtom = atom(
	null,
	(get, set, update: { main: string; sub: string }) => {
		const copy = [...get(allBreedsAtom)];
		const itemToUpdate = copy.find(
			({ main, sub }) => main === update.main && sub === update.sub
		);
		if (!itemToUpdate) return;
		itemToUpdate.isLiked = !itemToUpdate.isLiked;
		set(allBreedsAtom, copy);
		// aktualizowanie polubionych ras od zera za każdym polubieniem nie jest najbardziej optymalne, jednak w tym przypadku myślę, że nie będzie się to wiązało ze spadkiem wydajności; dodatkowo, jest mniejsze ryzyko powstania bugów
		const likedBreeds = [] as [string, string][]; // tupla aby zajmowała mniej znaków w formacie JSON niż obiekt
		for (const breed of copy) {
			if (breed.isLiked) {
				likedBreeds.push([breed.main, breed.sub]);
			}
		}

		localStorage.setItem(
			LOCAL_STORAGE_LIKED_KEY,
			JSON.stringify(likedBreeds)
		);
	}
);
