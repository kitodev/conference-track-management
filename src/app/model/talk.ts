import * as moment from 'moment/moment';

import { AFTERNOON_SESSION_MAX_LENGTH } from './track'

export class Talk {
	private _name: string;
	private _minutes: number;
	public startTime: moment.Moment = moment('2016-12-25');

	constructor(name: string, minutes: number) {
		this._name = name;
		if(minutes > AFTERNOON_SESSION_MAX_LENGTH) {
			throw 'Talk length can\'t exceed ' + AFTERNOON_SESSION_MAX_LENGTH + ' minutes (' + this._name + ')';
		}
		this._minutes = minutes;
	}

	get name():string {
		return this._name;
	}

	get minutes():number {
		return this._minutes;
	}
}
