const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override');
const app = express();

const db = require('./models');
const Filme = db.Filme;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.findAll();
    res.render('filmes', { filmes });
});

app.get('/filmes/novo', (req, res) => {
    res.render('form', { filme: {}, action: '/filmes', method: 'POST' });
});

app.post('/filmes', async (req, res) => {
    await Filme.create(req.body);
    res.redirect('/filmes');
});

app.get('/filmes/:id/edit', async (req, res) => {
    const filme = await Filme.findByPk(req.params.id);
    res.render('form', { filme, action: `/filmes/${filme.id}?_method=PUT`, method: 'POST' });
});

app.put('/filmes/:id', async (req, res) => {
    await Filme.update(req.body, { where: { id: req.params.id } });
    res.redirect('/filmes');
});

app.delete('/filmes/:id', async (req, res) => {
    await Filme.destroy({ where: { id: req.params.id } });
    res.redirect('/filmes');
});

const PORT = 3000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));
});
