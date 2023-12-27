const games = require('../../games.json');

const mainController = {

    showHomePage: (req, res) => {
        res.render('index', {games: games});
    },

    showGamePage: (req, res) => {
        const nomDuJeu = req.params.nomDuJeu;
        const searchedGame = games.find((game) => game.name === nomDuJeu);
        if(searchedGame) {
            res.render(nomDuJeu, {jeu: searchedGame, games: games})
        }
        else {
            res.status(404).render('notFound', {games, error:"Le jeu"});
        }
    }
}

module.exports = mainController;