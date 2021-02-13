import { map, debounceTime, filter } from 'rxjs/operators';
import { FormGroup, AbstractControl } from '@angular/forms';

export const NUMBER_ONLY: RegExp = /^-?[\d.]+(?:e-?\d+)?$/;
export const TEXT_ONLY:RegExp =/[a]\\s[a]/;

const cedNotValid = [
	'0000000000',
	'1111111111',
	'2222222222',
	'3333333333',
	'4444444444',
	'5555555555',
	'6666666666',
	'7777777777',
	'8888888888',
	'9999999999'
];


