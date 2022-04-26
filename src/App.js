/** @format */

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { useState } from "react";
import SearchContext from "./contexts/SearchContext";
import { useEffect } from "react";

function App() {
	const theme = createMuiTheme({
		palette: {
			primary: {
				// main: "#22254b",
				main: "#373b69",
			},
			secondary: {
				// main: "#373b69",
				main: "#22254b",
			},
			background: {
				paper: "#373b69",
				// paper: "#22254b",
			},
			text: {
				primary: "#fff",
				secondary: "rgba(255,255,255,0.7)",
			},
		},
	});

	const [searchedTerm, setSearchedTerm] = useState("");

	const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b1b6b4e8537bc09c52e8e2cf67b051bb&page=1`;
	const IMG_PATH = `https://image.tmdb.org/t/p/w500`;

	let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=b1b6b4e8537bc09c52e8e2cf67b051bb&query=${searchedTerm}`;

	useEffect(() => {
		SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=b1b6b4e8537bc09c52e8e2cf67b051bb&query=${searchedTerm}`;
	}, [searchedTerm]);

	return (
		<ThemeProvider theme={theme}>
			<SearchContext.Provider
				value={{
					searchedTerm,
					setSearchedTerm,
					SEARCH_URL,
					API_URL,
					IMG_PATH,
				}}
			>
				<Layout>
					<Router>
						<Switch>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</Router>
				</Layout>
			</SearchContext.Provider>
		</ThemeProvider>
	);
}

export default App;
