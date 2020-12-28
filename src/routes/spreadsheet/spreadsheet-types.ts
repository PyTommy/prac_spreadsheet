import * as t from 'io-ts';

export const ApiSpreadsheet = {
	GetDataByIdRequestBody: t.type({
		id: t.string,
	}),
	AppendRequestBody: t.type({
		name: t.string,
		sex: t.string,
	}),
};

export declare namespace ApiSpreadsheet {
	type GetDataByIdRequestBody = t.TypeOf<
		typeof ApiSpreadsheet.GetDataByIdRequestBody
	>;
	type AppendRequestBody = t.TypeOf<typeof ApiSpreadsheet.AppendRequestBody>;
}
