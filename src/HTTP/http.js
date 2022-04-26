/** @format */

export const get = async (url) => {
	const res = await fetch(url);
	if (!res.ok && res.statusCode === 422) {
		throw new Error(res.statusCode);
	}
	const data = await res.json();
	return data.results;
};
