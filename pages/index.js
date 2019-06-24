import "../stylesheets/main.scss";
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function Home() {

	return (
		<div>
			<header>
				<Header/>
			</header>
			<main>
				<Grid container spacing={0}
					justify="center"
					alignItems="center"
					component="section"
					id="concept">
					<Grid item xs={12} sm={6}>
						<Box display="flex"
							justifyContent="center">
							<img src="https://via.placeholder.com/300"></img>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box m={1}
							textAlign="center">
							<h1>
								PUZZLE<br />NEON
							</h1>
							<p>FAIRE CHAUFFER SES MENINGES N’A JAMAIS ETE AUSSI COOL !</p>
							<Button>
								TELECHARGER
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={0}
					justify="center"
					alignItems="center"
					component="section"
					id="how">
					<Grid item xs={12} sm={6}>
						<Box m={1}
							textAlign="center">
							<h2>
								DES DIZAINES DE PUZZLES!
							</h2>
							<p>Résolvez rapidement et en moins de mouvements possibles les différents tableau et hissez vous au top du learderboard</p>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box display="flex"
							justifyContent="center">
							<img src="https://via.placeholder.com/300"></img>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={0}
					justify="center"
					alignItems="center"
					component="section">
					<Grid item xs={12} sm={6}>
						<Box display="flex"
							justifyContent="center">
							<img src="https://via.placeholder.com/300"></img>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box m={1}
							textAlign="center">
							<h2>
								Les meilleurs scores de nos challengers!
							</h2>
							<p>Découvrez le score des meilleurs joueurs de puzzle neon…<br />… peut-être en faites vous partis ?!</p>
							<Button>
								DÉCOUVRIR
							</Button>
						</Box>
					</Grid>
				</Grid>
				<Grid container spacing={0}
					justify="center"
					alignItems="center"
					component="section"
					id="download">
					<Grid item xs={12} sm={6}>
						<Box m={1}
							textAlign="center">
							<h2>
								DISPONIBLE DÈS MAINTENANT !
							</h2>
							<p>TÉLÉCHARGEZ ET TENTER DE REMPORTER LA VICTOIRE EN REMPLISSANT TOUS LES TABLEAUX</p>
						</Box>
						<Box display="flex"
							justifyContent="center">
							<img src="https://via.placeholder.com/50"></img>
							<img src="https://via.placeholder.com/50"></img>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Box display="flex"
							justifyContent="center">
							<img src="https://via.placeholder.com/300"></img>
						</Box>
					</Grid>
				</Grid>
			</main>
			<footer>
				<Footer/>
			</footer>
		</div>
	);
}

export default Home;
