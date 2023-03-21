import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>LAB 2</title>
			</Head>
			{children}
		</main>
	);
}
