import React from 'react';
import { render } from '@testing-library/react-native';
import Divider from '../../components/UI/Divider';

describe('<Divider />', () => {
	it('renders correctly', () => {
		const { getByTestId } = render(<Divider />);
		expect(getByTestId('divider')).toBeTruthy();
	});
});
