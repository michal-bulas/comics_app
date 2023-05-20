import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';

const fetchComic = async (comicNumber: number) => {
	const { data } = await axios.get(
		`https://xkcd.com/${comicNumber}/info.0.json`
	);
	return data;
};

const fetchLatestComic = async () => {
	const { data } = await axios.get(`https://xkcd.com/info.0.json`);
	return data;
};

export const useComic = (comicNumber: number) => {
	return useQuery(['comic', comicNumber], () => fetchComic(comicNumber));
};

export const useComics = (start: number, end: number) => {
	return useQueries({
		queries: Array(end - start + 1)
			.fill(null)
			.map((_, index) => {
				const comicNumber = start + index;
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
