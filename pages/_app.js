import "@/styles/main.scss";
import { AppProvider } from "@/utils/AppContext";

function App({ Component, pageProps }) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	);
}

export default App;
