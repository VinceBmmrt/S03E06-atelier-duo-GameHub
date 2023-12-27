const games = require('../../games.json');

function notFound(req, res) {
    res.status(404).render('notFound', {games, error:"La page"});
}

module.exports = notFound;