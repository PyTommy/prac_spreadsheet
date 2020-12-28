import { google } from 'googleapis';
import { uuid } from 'uuidv4';
import keys from '../keys.json';

const client = new google.auth.JWT(
	keys.client_email,
	undefined,
	keys.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
);

export class SpreadsheetService {
	private spreadsheetId: string;

	constructor(spreadsheetId: string) {
		this.spreadsheetId = spreadsheetId;
	}

	async getData(range: string) {
		const gsapi = await this.getGSApi();
		const opt = {
			spreadsheetId: this.spreadsheetId,
			range: range,
		};

		const data = await gsapi.spreadsheets.values.get(opt);
		const dataArray = Array.isArray(data.data.values)
			? [...data.data.values]
			: [];
		return dataArray;
	}

	async append({ name, sex }: { name: string; sex: string }) {
		const gsapi = await this.getGSApi();
		const req = {
			spreadsheetId: this.spreadsheetId,
			range: 'A1',
			valueInputOption: 'USER_ENTERED',
			insertDataOption: 'INSERT_ROWS',
			resource: {
				values: [[uuid(), name, sex]],
			},
		};
		const result = await gsapi.spreadsheets.values.append(req);
		return result;
	}

	private async getGSApi() {
		await client.authorize();
		const gsapi = google.sheets({ version: 'v4', auth: client });
		return gsapi;
	}
}
