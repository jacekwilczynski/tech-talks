import { amazonMarketplaces, MWSOptions } from '@scaleleap/amazon-mws-api-sdk';
import { AppConfig } from 'ebay-api/lib/types';

export const amazon: MWSOptions = {
    marketplace: amazonMarketplaces.DE,
    awsAccessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    mwsAuthToken: String(process.env.MWS_AUTH_TOKEN),
    sellerId: 'super-shop-123',
    secretKey: String(process.env.SECRET_KEY),
};

export const ebay: AppConfig = {
    appId: String(process.env.EBAY_CLIENT_ID),
    certId: String(process.env.EBAY_CLIENT_SECRET),
    sandbox: Boolean(process.env.EBAY_SANDBOX),
};

export const database = {
    host: String(process.env.MYSQL_HOST),
    port: Number(process.env.MYSQL_PORT),
    user: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    database: String(process.env.MYSQL_DATABASE),
};
