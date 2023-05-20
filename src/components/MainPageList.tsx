import React from 'react';
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { useComic, useLatestComic, useComics } from '../hooks/comicHooks';
import ComicListItem from './ComicListItem';
import Divider from './UI/Divider';
import ListHeader from './UI/ListHeader';

const MainPageList = () => {
	const { data: latestComic, isLoading: isLoadingLatest } = useLatestComic();
	const { data: specificComic, isLoading: isLoadingSpecific } = useComic(614);
	const comicQueries = useComics(1, 10);

	if (isLoadingLatest || isLoadingSpecific) {
		return (
			<ActivityIndicator
				size='large'
				color='red'
				style={{
					position: 'absolute',
					alignItems: 'center',
					justifyContent: 'center',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				}}
			/>
		);
	}

	return (
		<View>
			<Text>Latest Comic: {latestComic.num}</Text>
			<Image
				source={{ uri: latestComic.img }}
				style={{ width: 200, height: 200 }}
			/>
			<Text>Comic 614: {specificComic.title}</Text>
			<Image
				source={{ uri: specificComic.img }}
				style={{ width: 200, height: 200 }}
			/>
			<Text>List of Comics</Text>
			<FlatList
				data={comicQueries.map((query) => query.data)}
				renderItem={ComicListItem}
				ItemSeparatorComponent={Divider}
				ListHeaderComponent={ListHeader}
				keyExtractor={(item) => item.num.toString()}
			/>
		</View>
	);
};

export default MainPageList;
