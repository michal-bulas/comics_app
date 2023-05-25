import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';

const fetchLatestComic = async () => {
	const { data } = await axios.get(`https://xkcd.com/info.0.json`);
	return data;
};

const fetchComic = async (comicNumber: number | null) => {
	if (comicNumber === null) return;
	const { data } = await axios.get(
		`https://xkcd.com/${comicNumber}/info.0.json`
	);
	return data;
};

export const useComic = (comicNumber: number | null) => {
	return useQuery(
		['comic', comicNumber],
		() => {
			if (comicNumber !== null) {
				return fetchComic(comicNumber);
			} else {
				return;
			}
		},
		{
			enabled: comicNumber !== null,
		}
	);
};

export const useComics = (start: number, end: number) => {
	return useQueries({
		queries: Array(end - start + 1)
			.fill(null)
			.map((_, index) => {
				const comicNumber = end - index;
				return {
					queryKey: ['comic', comicNumber],
					queryFn: () => fetchComic(comicNumber),
				};
			}),
	});
};

export const useLatestComic = () => {
	return useQuery(['latestComic'], () => fetchLatestComic());
};
