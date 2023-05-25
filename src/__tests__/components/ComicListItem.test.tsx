import React from 'react';
import { render } from '@testing-library/react-native';
import ComicListItem from '../../components/UI/ComicListItem';

describe('ComicListItem', () => {
	const mockItem = {
		month: '1',
		num: 1,
		link: 'https://example.com/num',
		year: '1',
		news: 'a',
		safe_title: 'a',
		transcript: 'a',
		alt: 'a',
		img: 'https://example.com/comic1.jpg',
		title: 'Comic 1',
		day: 'a',
	};

	it('renders without crashing', () => {
		render(<ComicListItem item={mockItem} />);
	});

	it('displays the correct comic title', () => {
		const { getByText } = render(<ComicListItem item={mockItem} />);
		const comicTitle = getByText('Comic 1');

		expect(comicTitle).toBeTruthy();
	});
});
