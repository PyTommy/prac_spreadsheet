import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';
import * as t from 'io-ts';
import createHttpError from 'http-errors';

export class TypeguardService {
	constructor() {}

	public static validate = (
		v: t.TypeC<any>,
		data: any,
		callback?: (errorMessage: string) => never
	): void | never => {
		const decoded = v.decode(data);
		const error = pipe(
			decoded,
			fold(
				() =>
					`[Invalid data] Accept: ${v.name}. Actual: ${JSON.stringify(data)}`,
				() => undefined
			)
		);
		if (!!error && callback) {
			callback(error);
		} else if (!!error) {
			throw new createHttpError.InternalServerError(error);
		} else {
			return undefined;
		}
	};
}
