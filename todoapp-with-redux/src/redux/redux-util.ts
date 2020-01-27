var _actionCount = 1;
export const action = (type?: string|Function, fn?:Function): any => {
	let x;
	if (type && !(typeof type == "string")) { fn = type; type = null;}
	if (!fn) fn = (...args) => ({ ...args });
	x = (...args) => ({ type: x['type'], ...fn(...args) });
	x['type'] = !type ? `ACTION_${_actionCount}` : type;
	_actionCount++;
	return x;
};