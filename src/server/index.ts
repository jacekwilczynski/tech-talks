import express from "express";
import handleProductListingRequest from "./handleProductListingRequest";
import * as path from "path";

const app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '..', '..', 'views'));

app.use('/', express.static('public'));

app.get('/', handleProductListingRequest);

app.listen(process.env.APP_PORT);
