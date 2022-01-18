import express from "express";
import handleProductListingPageRequest from "./handleProductListingPageRequest";
import handleProductListingApiRequest from './handleProductListingApiRequest';
import * as path from "path";

const app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '..', '..', 'views'));

app.use('/', express.static('public'));

app.get('/', handleProductListingPageRequest);
app.get('/api/products', handleProductListingApiRequest);

app.listen(process.env.APP_PORT);
