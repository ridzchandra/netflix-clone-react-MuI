/** @format */

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { useState } from "react";
import { useContext } from "react";
import SearchContext from "../contexts/SearchContext";
import { useEffect } from "react";
import { get } from "../HTTP/http";
import MovieCard from "./MovieCard";

const Home = () => {
	const [results, setResults] = useState([]);
	const { searchedTerm, API_URL, SEARCH_URL, IMG_PATH, setSearchedTerm } =
		useContext(SearchContext);

	useEffect(() => {
		if (searchedTerm === " ") {
			alert("Movie name can't start with a space!");
			setSearchedTerm("");
		} else if (searchedTerm === "") {
			get(API_URL)
				.then((results) => setResults(results))
				.catch((err) => console.log(err.message));
		} else {
			get(SEARCH_URL)
				.then((results) => setResults(results))
				.catch((err) => console.log(err.message));
		}
	}, [searchedTerm]);

	useEffect(() => {
		console.log(results);
	}, [results]);
	return (
		<Container maxWidth="xl">
			<Grid container spacing={2}>
				{results.map((result) => (
					<Grid
						item
						key={result.id}
						xs={12}
						sm={6}
						md={3}
						lg={3}
						xl={2}
					>
						<MovieCard movie={result} imgPath={IMG_PATH} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Home;
