import createError from 'http-errors';
import { ErrorRequestHandler } from 'express';

export const apiErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
	let responseError: createError.HttpError | undefined;
	if (createError.isHttpError(err)) {
		responseError = err;
	} else if (err) {
		responseError = new createError.InternalServerError(err?.message);
	}

	if (!!responseError) {
		return res
			.status(responseError.statusCode)
			.send(responseError.message || responseError.name);
	} else {
		return next();
	}
};
