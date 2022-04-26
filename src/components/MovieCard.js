/** @format */

import { Button, CardActions } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MovieModal from "./MovieModal";
import { useState } from "react";
import ModalContext from "../contexts/ModalContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			maxWidth: 500,
			height: 450,
			display: "flex",
			flexDirection: "column",
		},
		cardActionArea: {
			flexGrow: 1,
		},
		media: {
			height: 300,
		},
		cardTitleLine: {
			display: "flex",
			alignItems: "center",
		},
		cardTitle: {
			flexGrow: 1,
			fontWeight: "bold",
		},
		overview: {
			fontWeight: "bold",
		},
		rating: {
			backgroundColor: theme.palette.secondary.main,
			padding: "0.25em",
			borderRadius: "5px",
			color: (rating) => {
				if (rating < 4) {
					return "red";
				} else if (rating > 7) {
					return "green";
				} else {
					return "gold";
				}
			},
		},
	};
});

const MovieCard = ({ movie, imgPath }) => {
	const classes = useStyles(movie.vote_average);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Card className={classes.root}>
			<CardActionArea className={classes.cardActionArea}>
				<CardMedia
					className={classes.media}
					image={
						movie.poster_path
							? `${imgPath}${movie.poster_path}`
							: `/netflix.png`
					}
				/>
				<CardContent>
					<div className={classes.cardTitleLine}>
						<Typography
							gutterBottom
							variant="h6"
							component="h2"
							className={classes.cardTitle}
							noWrap
						>
							{movie.original_title}
						</Typography>
						<Typography
							gutterBottom
							variant="body1"
							className={classes.rating}
						>
							{movie.vote_average.toFixed(1)}
						</Typography>
					</div>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					// color="textSecondary"
					endIcon={<MoreHorizIcon />}
					onClick={handleOpen}
				>
					Overview
				</Button>
				<ModalContext.Provider
					value={{ movie, imgPath, open, handleClose }}
				>
					<MovieModal />
				</ModalContext.Provider>
			</CardActions>
		</Card>
	);
};

export default MovieCard;
