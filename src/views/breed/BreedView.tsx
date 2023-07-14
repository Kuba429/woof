import styles from "./Breed.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { allBreedsAtom, setImageAtom } from "../../stores/breeds";

export function BreedView() {
	const params = useParams();
	const [allBreeds] = useAtom(allBreedsAtom);
	const [, setImage] = useAtom(setImageAtom);
	const breed = allBreeds.find(
		(item) => item.main === params.main && item.sub === params.sub
	);
	useEffect(() => {
		if (!breed || breed.image) return;
		async function fetchImgUrl() {
			if (!breed) return;
			let path = breed.main;
			if (breed.sub) {
				path += "/" + breed.sub;
			}
			const res = await fetch(
				`https://dog.ceo/api/breed/${path}/images/random`
			);
			const url = (await res.json()).message;
			setImage({ sub: breed.sub, main: breed.main, newImage: url });
		}
		fetchImgUrl();
	}, []);
	if (!breed) return <h1>404</h1>; // TODO 404
	const breedName = (breed.sub ?? "") + " " + breed.main;
	return (
		<div className={styles.container}>
			<img
				className={styles.image}
				src={breed.image}
				alt={breedName + " image"}
			/>
			<h2 className={styles.header}>{breedName}</h2>
			<p>
				Ten pies to wierny i przyjacielski czworonóg, który świetnie
				czuje się w roli rodzinnego towarzysza. Dobrze dogaduje się z
				dziećmi, uwielbia pieszczoty i wspólne zabawy. Jest łatwy w
				prowadzeniu, choć bywa uparty. Sprawdzi się zarówno w małym
				mieszkaniu jak i w domu z ogrodem.
			</p>
			<p>
				Wysokość w kłębie 30–35 cm, masa ciała 22–25 kg. Sierść krótka,
				delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate.
				Charakter czujny, śmiały, oddany, odważny, łagodny, czasem
				uparty. W zależności od dnia pokazuje różne oblicza swojej
				natury.
			</p>
		</div>
	);
}
