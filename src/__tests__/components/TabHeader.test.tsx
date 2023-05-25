import React from 'react';
import { render } from '@testing-library/react-native';
import TabHeader from '../../components/UI/TabHeader';

describe('<TabHeader />', () => {
	it('renders correctly', () => {
		const { getByText } = render(<TabHeader>Test</TabHeader>);
		expect(getByText('Test')).toBeTruthy();
	});

	it('renders different children correctly', () => {
		const { getByText, rerender } = render(<TabHeader>First Test</TabHeader>);
		expect(getByText('First Test')).toBeTruthy();

		rerender(<TabHeader>Second Test</TabHeader>);
		expect(getByText('Second Test')).toBeTruthy();
	});
});
