/** @format */

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import ModalContext from "../contexts/ModalContext";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			maxWidth: 500,
			maxHeight: 450,
			paddingBottom: "20px",
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
			overflowY: "auto",
			height: "100px",
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
		container: {
			width: "100%",
		},
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	};
});

const MovieModal = () => {
	const { movie, imgPath, open, handleClose } = useContext(ModalContext);
	const classes = useStyles(movie.vote_average);
	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Card className={classes.root}>
					<CardActionArea>
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
							<Typography
								variant="body2"
								color="textSecondary"
								component="div"
								className={classes.overview}
							>
								{movie.overview}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Fade>
		</Modal>
	);
};

export default MovieModal;
