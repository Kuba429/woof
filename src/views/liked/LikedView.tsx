import { useAtom } from "jotai";
import { allBreedsAtom } from "../../stores/breeds";
import { BreedList } from "../../components/BreedList";

export function LikedView() {
	const [breeds] = useAtom(allBreedsAtom);
	const likedBreeds = breeds.filter((item) => item.isLiked);
	return (
		<BreedList
			fallback={fallback}
			header={"Ulubione"}
			items={likedBreeds}
		/>
	);
}

const fallback = (
	<div style={{ textAlign: "center" }}>
		<h1>Nic tu nie ma</h1>
		<p>
			Kliknij w serduszko obok rasy jaka Ci się podoba aby ją polubić.
			Polubione możesz znaleźć tutaj.
		</p>
	</div>
);
