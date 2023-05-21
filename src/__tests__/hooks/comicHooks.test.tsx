import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useComic, useLatestComic, useComics } from '../../hooks/comicHooks';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const comicNumber = 123;
const latestComicData = { num: 2778, title: 'Cuisine' };
const comicsData = [
	{ num: 12, title: 'Poisson' },
	{ num: 13, title: 'Canyon' },
	{ num: 14, title: 'Copyright' },
	{ num: 15, title: 'Just Alerting You' },
	{ num: 16, title: 'Monty Python -- Enough' },
];

describe('comicHooks', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		mockedAxios.get.mockReset();
	});
	const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
		<QueryClientProvider client={new QueryClient()}>
			{children}
		</QueryClientProvider>
	);

	it('fetches a comic', async () => {
		const comicData = { num: comicNumber, title: 'Centrifugal' };

		mockedAxios.get.mockResolvedValueOnce({ data: comicData });

		const { result } = renderHook(() => useComic(comicData.num), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

		expect(result.current.data).toEqual(comicData);
	});

	it('fetches the latest comic', async () => {
		mockedAxios.get.mockResolvedValueOnce({ data: latestComicData });

		const { result } = renderHook(() => useLatestComic(), { wrapper });

		await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

		expect(result.current.data).toEqual(latestComicData);
	});

	it('fetches a range of comics', async () => {
		comicsData.forEach((comicData) =>
			mockedAxios.get.mockResolvedValueOnce({ data: comicData })
		);

		const { result } = renderHook(() => useComics(12, 16), { wrapper });

		await waitFor(() => result.current.every(({ isSuccess }) => isSuccess));
	});
});
