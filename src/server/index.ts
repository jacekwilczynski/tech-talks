import express, { Request, Response } from "express";
import sendProductListing from "./sendProductListing";

const app = express();

app.use('/', express.static('public'));

app.get('/', async (request: Request, response: Response) => {
    response.write(`
<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/style.css">
<title>Hundertprozentshop.de</title>
</head>
<body>
<div class="container">
`);

    await sendProductListing(response);

    response.write(`
</div>
</body>
</html>
`);

    response.end();
});

app.listen(process.env.APP_PORT);
