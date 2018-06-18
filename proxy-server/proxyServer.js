const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const originalListingDescriptionURL = 'http://nappbnb-env-1.yykbu3dn27.us-east-1.elasticbeanstalk.com/';
const originalBookingURL = 'http://booking-service-logan.us-west-1.elasticbeanstalk.com/';
const originalReviewsURL = 'http://nappbnbreviews.us-west-1.elasticbeanstalk.com/';
const originalFilterListingsURL = 'http://nappfilterlistingryan-env.n93dfz3d6f.us-west-1.elasticbeanstalk.com/';
const originalTitleGalleryURL = 'http://airbnb-title-galley.us-west-1.elasticbeanstalk.com/';

const listingDescriptionURL = 'http://nappbnb-env-1.yykbu3dn27.us-east-1.elasticbeanstalk.com/rooms';
const bookingURL = 'http://booking-service-logan.us-west-1.elasticbeanstalk.com/booking';
const reviewsURL = 'http://nappbnbreviews.us-west-1.elasticbeanstalk.com/reviews';
const filterListingsURL = 'http://nappfilterlistingryan-env.n93dfz3d6f.us-west-1.elasticbeanstalk.com/filterListings';
const titleGalleryURL = 'http://airbnb-title-galley.us-west-1.elasticbeanstalk.com/headerphotos';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  res.redirect(307, originalListingDescriptionURL + req.params.pathname);
});

//ROOM DESCRIPTIONS services (images/data)
app.use('/rooms/', (req, res) => {
  res.redirect(307, listingDescriptionURL + req.url);
});

app.use('/bookingFiles/:pathname', (req, res) => {
  res.redirect(307, originalBookingURL + req.params.pathname);
});

app.use('/booking/', (req, res) => {
  res.redirect(307, bookingURL + req.url);
});

app.use('/reviewFiles/:pathname', (req, res) => {
  res.redirect(307, originalReviewsURL + req.params.pathname);
});

app.use('/reviews/', (req, res) => {
  res.redirect(307, reviewsURL + req.url);
});

app.use('/filterListingFiles/:pathname', (req, res) => {
  res.redirect(307, originalFilterListingsURL + req.params.pathname);
});

app.use('/filterListings/', (req, res) => {
  res.redirect(307, filterListingsURL + req.url);
});

app.use('/titleGallery/:pathname', (req, res) => {
  res.redirect(307, originalTitleGalleryURL + req.params.pathname);
});

app.use('/headerphotos/', (req, res) => {
  res.redirect(307, titleGalleryURL + req.url);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

