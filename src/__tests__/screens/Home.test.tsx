import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../../screens/Home';
import MainPageContent from '../../components/MainPageContent';

jest.mock('../../components/MainPageContent', () => jest.fn(() => null));

describe('<Home />', () => {
	it('renders MainPageContent component', () => {
		render(<Home />);
		expect(MainPageContent).toHaveBeenCalled();
	});

	it('renders home view', () => {
		const { getByTestId } = render(<Home />);
		const homeView = getByTestId('home-view');
		expect(homeView).toBeTruthy();
	});
});
