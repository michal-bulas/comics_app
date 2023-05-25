import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainPageContent from '../../components/MainPageContent';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}));

jest.mock('../../hooks/comicHooks', () => ({
	useLatestComic: jest.fn(() => ({
		data: {
			num: 123,
			title: 'Latest Comic',
			img: 'https://example.com/comic.jpg',
			year: '2023',
			alt: 'Latest Comic Description',
		},
		isLoading: false,
	})),

	useComic: jest.fn(() => ({
		data: {
			num: 12,
			title: 'Comic 12',
			img: 'https://example.com/comic12.jpg',
			year: '2012',
			alt: 'Comic 12 Description',
		},
	})),

	useComics: jest.fn(() => [
		{
			status: 'success',
			data: {
				num: 1,
				title: 'Comic 1',
				img: 'https://example.com/comic1.jpg',
				year: '2023',
				alt: 'Comic 1 Description',
			},
		},
		{
			status: 'success',
			data: {
				num: 2,
				title: 'Comic 2',
				img: 'https://example.com/comic2.jpg',
				year: '2022',
				alt: 'Comic 2 Description',
			},
		},
	]),
}));

describe('MainPageContent', () => {
	it('renders loading indicator when isLoadingLatest is true', () => {
		const useLatestComicMock = require('../../hooks/comicHooks').useLatestComic;

		useLatestComicMock.mockImplementationOnce(() => ({
			data: null,
			isLoading: true,
		}));

		const { getByTestId } = render(<MainPageContent />);
		expect(getByTestId('loading-indicator')).toBeTruthy();
	});
	it('renders latest comic information', () => {
		const { getByText, getByTestId } = render(<MainPageContent />);
		expect(getByText('Latest Comic No: 123')).toBeTruthy();
		expect(getByText('Latest Comic')).toBeTruthy();
		expect(getByTestId('latest-comic-image')).toBeTruthy();
	});

	it('navigates to details screen when latest comic is pressed', () => {
		const { getByTestId } = render(<MainPageContent />);
		fireEvent.press(getByTestId('latest-comic'));

		expect(mockNavigate).toHaveBeenCalledWith('Details', {
			num: 123,
			title: 'Latest Comic',
			img: 'https://example.com/comic.jpg',
			year: '2023',
			alt: 'Latest Comic Description',
		});
	});

	it('renders list of comics', () => {
		const { getByText } = render(<MainPageContent />);
		expect(getByText('Comics List')).toBeTruthy();
		expect(getByText('Comic 1')).toBeTruthy();
		expect(getByText('Comic 2')).toBeTruthy();
	});

	it('navigates to details screen when a comic is pressed', () => {
		const { getByText } = render(<MainPageContent />);
		fireEvent.press(getByText('Comic 1'));

		expect(mockNavigate).toHaveBeenCalledWith('Details', {
			num: 1,
			title: 'Comic 1',
			img: 'https://example.com/comic1.jpg',
			year: '2023',
			alt: 'Comic 1 Description',
		});
	});
});
