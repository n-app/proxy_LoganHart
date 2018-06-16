const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static(path.join(__dirname, './public')));

//ROOM DESCRIPTIONS serving static files
app.use('/listingDescription/:pathname', (req, res) => {
  res.redirect(307, 'http://localhost:3001/' + req.params.pathname);
});

//ROOM DESCRIPTIONS services (images/data)
app.use('/rooms/', (req, res) => {
  res.redirect(307, 'http://localhost:3001/rooms' + req.url);
});

app.use('/bookingFiles/:pathname', (req, res) => {
  res.redirect(307, 'http://localhost:3002/' + req.params.pathname);
});

app.use('/booking/', (req, res) => {
  res.redirect(307, 'http://localhost:3002/booking' + req.url);
});

app.use('/reviewFiles/:pathname', (req, res) => {
  res.redirect(307, 'http://localhost:3003/' + req.params.pathname);
});

app.use('/reviews/', (req, res) => {
  res.redirect(307, 'http://localhost:3003/reviews' + req.url);
});

app.use('/filterListingFiles/:pathname', (req, res) => {
  res.redirect(307, 'http://localhost:3004/' + req.params.pathname);
});

app.use('/filterListings/', (req, res) => {
  res.redirect(307, 'http://localhost:3004/filterListings' + req.url);
});

app.use('/titleGallery/:pathname', (req, res) => {
  res.redirect(307, 'http://localhost:3005/' + req.params.pathname);
});

app.use('/headerphotos/', (req, res) => {
  res.redirect(307, 'http://localhost:3005/headerphotos' + req.url);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

