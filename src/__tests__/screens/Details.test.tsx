import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import Details from '../../screens/Details';

jest.mock('@react-navigation/native');

describe('Details', () => {
	const mockRoute = useRoute as jest.MockedFunction<typeof useRoute>;

	beforeEach(() => {
		mockRoute.mockReturnValue({
			key: 'test-key',
			name: 'test-name',
			params: {
				num: 1,
				title: 'Test Title',
				img: 'Test Image URL',
				year: '2023',
				alt: 'Test Description',
			},
		});
	});

	afterEach(() => {
		mockRoute.mockReset();
	});

	it('renders the correct comic details', () => {
		const { getByText, getByTestId } = render(<Details />);

		expect(getByText('Test Title')).toBeTruthy();
		expect(getByText('Year of release: 2023')).toBeTruthy();
		expect(getByText('Comic No: 1')).toBeTruthy();
		expect(getByText('Description: Test Description')).toBeTruthy();
		expect(getByTestId('details-comic-image').props.source.uri).toEqual(
			'Test Image URL'
		);
	});

	it('toggles modal on image press', async () => {
		const { getByTestId, queryByTestId } = render(<Details />);

		const image = getByTestId('details-comic-image');
		fireEvent.press(image);

		await waitFor(() => {
			expect(queryByTestId('modal-comic-image')).toBeTruthy();
		});

		const closeButton = getByTestId('modal-close-button');
		fireEvent.press(closeButton);

		await waitFor(() => {
			expect(queryByTestId('modal-comic-image')).toBeNull();
		});
	});
});
