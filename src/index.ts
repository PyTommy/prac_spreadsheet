import express from 'express';
import morgan from 'morgan';

import { notFoundHandler } from './routes/error';
import { apiErrorHandler } from './services/error';
import spreadsheetRouter from './routes/spreadsheet/spreadsheet';

const app: express.Express = express();

// CORSの許可
app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// body-parserに基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(
	morgan(':method :url :status :response-time ms - :res[content-length]')
);

app.use('/spreadsheet', spreadsheetRouter);

app.use(apiErrorHandler);
app.use('*', notFoundHandler);

// 3000番ポートでAPIサーバ起動
app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
