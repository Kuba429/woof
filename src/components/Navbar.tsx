import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";

const waveAtom = atom(window.innerWidth / 2);
export function Navbar() {
	const [waveX] = useAtom(waveAtom);
	return (
		<div className={styles.navbar}>
			<NavItem to="/liked">{likedIcon}</NavItem>
			<NavItem to="/">{homeIcon}</NavItem>
			<NavItem to="/search">{searchIcon}</NavItem>
			<div style={{ left: waveX }} className={styles.wave}>
				{waveIcon}
			</div>
		</div>
	);
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
	const location = useLocation();
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [, setWaveX] = useAtom(waveAtom);
	useEffect(() => {
		// jeśli ścieżka zmieniła się na tą, ustaw falę nad tą ikonką
		if (location.pathname !== to) return;
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		const middle = rect.left + rect.width / 2;
		setWaveX(middle);
	}, [location, setWaveX, to]);
	return (
		<NavLink
			ref={ref}
			className={({ isActive }) =>
				(isActive ? styles.active : "") + " " + styles.link
			}
			to={to}
		>
			{children}
		</NavLink>
	);
}
const waveIcon = (
	<svg
		preserveAspectRatio="none"
		viewBox="0 0 1462 230"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M294.5 113.121C473 -3.00008 731 0.5 731 0.5V229.981H0C0 229.981 116 229.242 294.5 113.121Z" />
		<path d="M1167.5 113.121C989 -3 731 0.5 731 0.5V229.981L1462 229.981C1462 229.981 1346 229.242 1167.5 113.121Z" />
	</svg>
);
const homeIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
		{
			//<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
		}
		<path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
	</svg>
);

const searchIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		{
			//<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
		}
		<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
	</svg>
);

const likedIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		{
			//<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
		}
		<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
	</svg>
);
