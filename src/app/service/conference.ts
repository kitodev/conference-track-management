import * as _ from "lodash";
import { Injectable } from '@angular/core';

import { Talk } from '../model/talk';
import { Track } from '../model/track';

@Injectable({
  providedIn: 'root'
})
export class ConferenceSchedulerService {

	private parseInput(rawInput:string): Talk[] {
		return _.map(_.split(rawInput, '\n'), (rawLine:string) => this.parseLine(rawLine));
	}

	private parseLine(rawLine:string):Talk {
		let toSplitBy:string|RegExp = _.includes(rawLine, 'lightning') ? 'lightning' : /[0-9]/,
			talkName:string = _.trim(_.split(rawLine, toSplitBy)[0]),
			talkTimeMinutes:number = 5;

		if(toSplitBy != 'lightning') {
			talkTimeMinutes = parseInt(_.trim(_.trim(_.split(rawLine, talkName)[1]), 'min'));
		}

		return new Talk(talkName, talkTimeMinutes);
	}

	public schedule(rawInput: string):Track[] {
		let talks:Talk[] = _.orderBy(this.parseInput(rawInput), ['minutes'], ['desc']);

		let tracks: Track[] = [new Track()];

		_.forEach(talks, (talk:Talk) => {
			let talkPlaced:boolean = false;

			_.forEach(tracks, (track: Track) => {
				if(talkPlaced) {
					return false;
				}
				else if(track.afternoonSession.freeMinutes() >= talk.minutes) {
					track.afternoonSession.addTalk(talk);
					talkPlaced = true;
				}
				else if(track.morningSession.freeMinutes() >= talk.minutes) {
					track.morningSession.addTalk(talk);
					talkPlaced = true;
				}
        return tracks;
			});

			if(!talkPlaced) {
				let newTrack:Track = new Track();
				newTrack.afternoonSession.addTalk(talk);
				tracks.push(newTrack);
			}
		});

		_.forEach(tracks, (track:Track) => {
			track.afternoonSession.addNetworkingEvent();
		});

		return tracks;
	}

}
