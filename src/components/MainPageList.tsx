import React from 'react';
import { Text, Image, ActivityIndicator, FlatList, View } from 'react-native';
import { useLatestComic, useComics } from '../hooks/comicHooks';
import ComicListItem from './ComicListItem';
import Divider from './UI/Divider';
import TabHeader from './UI/TabHeader';

const MainPageList = () => {
	const { data: latestComic, isLoading: isLoadingLatest } = useLatestComic();
	const comicsQueries = useComics(1, 10);
	const isLoadingList = comicsQueries.some(
		(comic) => comic.status === 'loading'
	);

	if (isLoadingLatest || isLoadingList) {
		return (
			<ActivityIndicator
				size='large'
				color='orange'
				className='my-auto'
			/>
		);
	}

	const comicsList = comicsQueries
		.filter((comic) => comic.status === 'success')
		.map((comic) => comic.data);

	return (
		<View>
			<Text className='text-center text-xl'>
				Latest Comic: {latestComic.num}
			</Text>
			<Text className='text-center text-md my-1'>{latestComic.title}</Text>
			<Image
				className='h-60 w-60 self-center'
				source={{ uri: latestComic.img }}
			/>
			<TabHeader>Comics List</TabHeader>
			{comicsList.map((comic) => (
				<ComicListItem
					key={comic.num}
					item={comic}
				/>
			))}
		</View>
	);
};

export default MainPageList;
