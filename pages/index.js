import { Header, Layout, Modal, Table } from "@/components";
import { useAppState } from "@/utils/AppContext";
import { useEffect, useState } from "react";

function Landing() {
	const { setPatientsList } = useAppState();

	useEffect(() => {
		fetch("http://localhost:3000/api/patients/all")
			.then((res) => res.json())
			.then((res) => {
				if (res.success) setPatientsList(res.data);
			});
	}, []);

	return (
		<Layout>
			<Header />
			<Table />
			<Modal />
		</Layout>
	);
}

export default Landing;
