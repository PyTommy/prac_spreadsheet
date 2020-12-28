import { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, res) => {
	return res
		.status(404)
		.send(`The path not exist. [${req.method}]'${req.path}'`);
};
