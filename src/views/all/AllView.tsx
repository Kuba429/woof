import { BreedList } from "../../components/BreedList";
import { allBreedsAtom } from "../../stores/breeds";
import { useAtom } from "jotai";

export function AllView() {
	const [breeds] = useAtom(allBreedsAtom);
	return <BreedList header={"Lista Ras"} items={breeds} />;
}
