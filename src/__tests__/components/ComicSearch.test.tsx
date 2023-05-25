import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ComicSearch from '../../components/ComicSearch';
import { Alert } from 'react-native';

jest.mock('../../hooks/comicHooks', () => ({
	useComic: jest.fn(() => ({
		data: null,
		error: null,
	})),
}));

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(() => ({
		navigate: jest.fn(),
	})),
}));

describe('<ComicSearch />', () => {
	const mockAlert = jest.spyOn(Alert, 'alert');

	afterAll(() => {
		mockAlert.mockClear();
	});
	it('renders correctly', () => {
		const { getByTestId } = render(<ComicSearch latest={100} />);
		const button = getByTestId('comic-search-button');
		const input = getByTestId('comic-search-input');
		expect(input).toBeTruthy();
		expect(button).toBeTruthy();
	});

	it('updates input value correctly', () => {
		const { getByTestId } = render(<ComicSearch latest={100} />);
		const input = getByTestId('comic-search-input');
		fireEvent.changeText(input, '23');
		expect(input.props.value).toBe('23');
	});

	it('handles invalid input value', () => {
		const { getByTestId } = render(<ComicSearch latest={100} />);
		const button = getByTestId('comic-search-button');
		const input = getByTestId('comic-search-input');

		fireEvent.changeText(input, '101');
		fireEvent.press(button);

		expect(mockAlert).toHaveBeenCalledWith(
			'Warning',
			'Please enter a number between 1 and 100.'
		);
	});
});

it('handles valid input value', async () => {
	const mockUseComic = require('../../hooks/comicHooks').useComic;
	const comicNumber = 42;

	mockUseComic.mockImplementationOnce(() => ({
		data: { comicData: 'mockData' },
		error: null,
	}));

	const { getByTestId } = render(<ComicSearch latest={100} />);
	const input = getByTestId('comic-search-input');
	const button = getByTestId('comic-search-button');

	fireEvent.changeText(input, comicNumber.toString());
	fireEvent.press(button);

	await waitFor(() => {
		expect(mockUseComic).toHaveBeenCalledWith(comicNumber);
	});
});
