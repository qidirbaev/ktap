import express from 'express';
import body_parser from 'body-parser';
import { config } from 'dotenv';
import session from 'express-session';
import cooki_parser from 'cookie-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url'
import morgan from 'morgan';
import mongoose from 'mongoose';
import compression from 'compression';
import auth from './routes/auth.routing.js';
import home from './routes/home.routing.js';
import { cpus } from 'os';
import cluster from 'cluster';
import logger from './utils/helpers/logger.js';
// import { errorHandler } from './utils/helpers/ErrorHandler.js';
// import search from './routes/search.routing.js';
// import books from './routes/books.routing.js';
// import categories from './routes/categories.routing.js';
// import statistics from './routes/statistics.routing.js';
// import contact from './routes/contact.routing.js';

const numCPUs = cpus().length;

// clusterize
if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    // for (let i = 0; i < numCPUs; i++) {
    //     cluster.fork();
    // }

    cluster.fork();

    console.log('num of CPUs: ', numCPUs);

    // handle worker message
    cluster.on('message', (worker, message, handle) => {
        console.log(`[MASTER] message from worker ${worker.process.pid}`);
        console.log(`[MASTER] message: ${message}`);
    });

    cluster.on('fork', (worker) => {
        console.log(`Worker ${worker.process.pid} has been forked`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        // restart worker
        // cluster.fork();
    });

} else {

    process.on('message', (message) => {
        console.log(`[WORKER] message from master ${process.pid}`);
        console.log(`[WORKER] message: ${message}`);
    });

    const __dirname = dirname(fileURLToPath(import.meta.url))
    const app = express();
    config();

    app.set('view engine', 'ejs');
    app.set('views', join(__dirname, 'src', 'views'));

    app.use(compression({
        level: 9,
        memLevel: 9,
        threshold: 0
    }));
    app.use(express.static(join(__dirname, 'public')));
    app.use(morgan('tiny'));
    app.use(body_parser.urlencoded({ extended: true }));
    app.use(cooki_parser('secret'));
    // app.use(errorHandler());

    (c => c())(async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            logger.info('MongoDB successfully connected...');
        } catch (ex) {
            logger.error("Failed to connect MongoDB", ex);
        }
    })

    app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET
    }));

    app.use('/', home);
    app.use('/auth', auth);
    // app.use('/books', books);
    // app.use('/categories', categories);
    // app.use('/statistics', statistics);
    // app.use('/contact', contact);
    // app.use('/search', search);

    app.get('/', (req, res, next) => {
        next(err);
    }, (req, res) => {
        logger.info("Server Sent A Hello World!");
        res.send('Hello World!');
    });

    const port = process.env.SERVER_PORT || 5331;

    app.listen(port, () => {
        logger.info(`Server started and running on http://127.0.0.1:${port}`);
    });

}