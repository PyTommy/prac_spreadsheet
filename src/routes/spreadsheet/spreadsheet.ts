import express from 'express';
import createHttpError from 'http-errors';
import { SpreadsheetService } from '../../services/spreadsheet';
import { ApiSpreadsheet } from './spreadsheet-types';
import { TypeguardService } from '../../services/typeguard';

const router = express.Router();
const SpreadsheetInstance = new SpreadsheetService(
	'1pS5pOrSeRyGxa4ChSBSbxMI5S0dXOf3saTlrhgNO5oc'
);

router.get('/', async (_req, res, next) => {
	try {
		const data = await SpreadsheetInstance.getData('A1:B1000');
		return res.send(data);
	} catch (e) {
		return next(e);
	}
});

router.get('/getDataById', async (req, res, next) => {
	try {
		TypeguardService.validate(
			ApiSpreadsheet.GetDataByIdRequestBody,
			req.body,
			(e) => {
				throw new createHttpError.BadRequest(e);
			}
		);
		const { id } = req.body;

		const data = await SpreadsheetInstance.getData('A1:B1000');
		const targetData = data.filter((d) => d[0] === id);

		return res.send(targetData);
	} catch (e) {
		return next(e);
	}
});

router.post('/append', async (req, res, next) => {
	try {
		TypeguardService.validate(
			ApiSpreadsheet.AppendRequestBody,
			req.body,
			(e) => {
				throw new createHttpError.BadRequest(e);
			}
		);

		const { name, sex } = req.body as ApiSpreadsheet.AppendRequestBody;

		const data = await SpreadsheetInstance.append({
			name,
			sex,
		});
		return res.send(data);
	} catch (e) {
		return next(e);
	}
});

export default router;
