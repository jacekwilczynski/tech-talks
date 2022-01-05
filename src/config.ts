import { amazonMarketplaces } from '@scaleleap/amazon-mws-api-sdk';

export const amazon = {
    marketplace: amazonMarketplaces.DE,
    awsAccessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    mwsAuthToken: String(process.env.MWS_AUTH_TOKEN),
    sellerId: 'super-shop-123',
    secretKey: String(process.env.SECRET_KEY),
};

export const ebay = {
    appId: String(process.env.EBAY_CLIENT_ID),
    certId: String(process.env.EBAY_CLIENT_SECRET),
};

export const database = {
    host: String(process.env.MYSQL_HOST),
    port: Number(process.env.MYSQL_PORT),
    user: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    database: String(process.env.MYSQL_DATABASE),
};
