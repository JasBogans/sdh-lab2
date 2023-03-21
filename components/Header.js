import { PersonAddSVG } from "@/icons";
import { useAppState } from "@/utils/AppContext";

export function Header() {
	const { setModalOpen } = useAppState();

	return (
		<header className="header">
			<h1 className="header__h1">
				Manage <span>Patients</span>
			</h1>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					setModalOpen(true);
				}}
			>
				<PersonAddSVG /> <span>Add new</span>
			</button>
		</header>
	);
}
