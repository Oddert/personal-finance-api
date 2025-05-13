import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import * as i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import i18nextMiddleware from 'i18next-express-middleware';
import morgan from 'morgan';
import cron from 'node-cron';
import path from 'path';

import auth from './routes/AuthRoutes';
import budget from './routes/BudgetRoutes';
import category from './routes/CategoryRoutes';
import card from './routes/CardRoutes';
import debug from './routes/DebugRoutes';
import matcher from './routes/MatcherRoutes';
import scenario from './routes/ScenarioRoutes';
import transaction from './routes/TransactionRoutes';

import { clearExpiredRefreshTokens } from './controllers/CronController';

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
        t: (key: string, args?: { [key: string]: string }) => string;
    }
}

dotenv.config();

const PORT = process.env.PORT || '3000';

const app = express();

const routes = [
    { path: '/auth', router: auth },
    { path: '/budget', router: budget },
    { path: '/category', router: category },
    { path: '/card', router: card },
    { path: '/matcher', router: matcher },
    { path: '/scenario', router: scenario },
    { path: '/transaction', router: transaction },
];

console.log(
    '[index] serving translations from: ',
    path.join(__dirname, '../resources/locales/{{lng}}/{{ns}}.json'),
);

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(
                __dirname,
                '../resources/locales/{{lng}}/{{ns}}.json',
            ),
        },
        fallbackLng: 'en',
        preload: ['en', 'en-CA', 'en-GB'],
    });

app.use(i18nextMiddleware.handle(i18next));

cron.schedule('0 1 * * *', clearExpiredRefreshTokens);
clearExpiredRefreshTokens();

app.use(
    morgan(
        '[morgan] :method :url :status :res[content-length] - :response-time ms',
    ),
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());
app.use(cors());

console.log('[index] serving static content from: ');
console.log(path.join(__dirname, './static/'));

app.use('/', express.static(path.join(__dirname, './static/')));

console.log('[index] mounting routes');
for (const route of routes) {
    console.log('[index] mounted route: ', route.path);
    app.use(route.path, route.router);
}

if (process.env.NODE_ENV === 'development') {
    app.use('/debug', debug);
    console.log('[index] development mode: mounted debug routes');
}

console.log('[index] PORT: ', PORT);
console.log('[index] routes mounted, starting server process...');
const server = app.listen(
    PORT,
    () =>
        `[${new Date().toLocaleString('en-GB')}] Server initialised on PORT: ${PORT}`,
);

console.log('[index] finalising');
export default server;
