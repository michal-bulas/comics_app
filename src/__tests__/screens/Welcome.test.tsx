import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Welcome from '../../screens/Welcome';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}));

describe('<Welcome />', () => {
	it('renders correctly', () => {
		const { getByText } = render(<Welcome />);
		const title = getByText('Welcome to Comics App');
		const description = getByText('Browse comics and check out their details');
		const button = getByText('Continue');
		expect(title).toBeTruthy();
		expect(description).toBeTruthy();
		expect(button).toBeTruthy();
	});
	it('navigates to Home screen when Continue button is pressed', () => {
		const { getByText } = render(<Welcome />);
		const button = getByText('Continue');
		fireEvent.press(button);
		expect(mockNavigate).toHaveBeenCalledWith('Home');
	});
});
