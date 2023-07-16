import styles from "./Breed.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { allBreedsAtom, setImageAtom } from "../../stores/breeds";
import { LikeIcon } from "../../components/LikeIcon";

export function BreedView() {
	const params = useParams();
	const [allBreeds] = useAtom(allBreedsAtom);
	const [, setImage] = useAtom(setImageAtom);
	const breed = allBreeds.find(
		(item) => item.main === params.main && item.sub === params.sub
	);
	useEffect(() => {
		// jeśli zdjęcie tej rasy nie zostało wcześniej zapisane, znajdź je i zapisz
		if (!breed || breed.image) return;
		async function fetchImgUrl(): Promise<void> {
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
		void fetchImgUrl();
	}, [breed, setImage]);
	if (!breed) return fallback;
	const breedName = (breed.sub ?? "") + " " + breed.main;
	return (
		<div className={styles.container}>
			<div className={styles.topIconsContainer}>
				<GoBackButton />
				<LikeIcon breed={breed} />
			</div>
			{breed.image ? (
				<img
					className={styles.image}
					src={breed.image}
					alt={breedName + " image"}
				/>
			) : (
				<img
					className={styles.image + " " + styles.fallbackImage}
					src="/dog-fallback.png"
					alt="Fallback image"
				/>
			)}
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

const fallback = (
	<div className={styles.fallback}>
		<h1>Ten pies nie istnieje</h1>
		<p>
			Wygląda na to, że znalazłeś się w miejscu które nie istnieje. Wróć
			na <Link to="/">stronę główną</Link> i spróbuj jeszcze raz.
		</p>
	</div>
);
function GoBackButton() {
	const navigate = useNavigate();
	return (
		<button className={styles.backIcon} onClick={() => navigate(-1)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 448 512"
			>
				{
					//<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
				}
				<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
			</svg>
		</button>
	);
}
