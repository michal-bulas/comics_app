import React, { useCallback, useState } from 'react';
import {
	Text,
	Image,
	ActivityIndicator,
	View,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { useLatestComic, useComics } from '../hooks/comicHooks';
import ComicListItem from './UI/ComicListItem';
import Divider from './UI/Divider';
import TabHeader from './UI/TabHeader';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import ComicSearch from './ComicSearch';
import { imgHeight, imgWidth } from '../utilities/imageSizes';

type navProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MainPageContent = () => {
	const navigation = useNavigation<navProp>();
	const [comicCount, setComicCount] = useState<number>(10);

	const { data: latestComic, isLoading: isLoadingLatest } = useLatestComic();

	// Fetching list of comics
	const start = latestComic ? Math.max(latestComic.num - comicCount + 1, 1) : 1;
	const end = latestComic ? Math.min(latestComic.num, 2779) : 1;

	const comicsQueries = useComics(start, end);

	const isLoadingList = comicsQueries.some(
		(comic) => comic.status === 'loading'
	);

	const loadMoreComics = useCallback(() => {
		setComicCount((prevComicCount) => prevComicCount + 10);
	}, []);

	const comicsList = comicsQueries
		.filter((comic) => comic.status === 'success')
		.map((comic) => comic.data);

	if (isLoadingLatest) {
		return (
			<ActivityIndicator
				testID='loading-indicator'
				size='large'
				color='orange'
				className='my-auto'
			/>
		);
	}

	return (
		<FlatList
			data={comicsList}
			onEndReached={loadMoreComics}
			onEndReachedThreshold={0.5}
			keyExtractor={(item) => item.num.toString()}
			ListHeaderComponent={
				<>
					<TouchableOpacity
						testID='latest-comic'
						onPress={() => navigation.navigate('Details', { ...latestComic })}
					>
						<Text className='text-center text-xl'>
							Latest Comic No: {latestComic.num}
						</Text>
						<Text className='text-center text-md my-1'>
							{latestComic.title}
						</Text>
						<View>
							<Image
								testID='latest-comic-image'
								className='self-center '
								resizeMode='contain'
								source={{
									uri: latestComic.img,
									width: imgWidth,
									height: imgHeight,
								}}
							/>
						</View>
					</TouchableOpacity>

					<Divider />

					<View className='ml-2 self-center'>
						<Text className='font-bold text-center'>{`Search for Comic by No: \n(Range 1-${latestComic.num})`}</Text>
						<ComicSearch latest={latestComic.num} />
					</View>

					<TabHeader>Comics List</TabHeader>
					<Divider />
				</>
			}
			renderItem={({ item }) => (
				<React.Fragment>
					<TouchableOpacity
						className='ml-2'
						onPress={() => navigation.navigate('Details', { ...item })}
					>
						<ComicListItem item={item} />
					</TouchableOpacity>
					<Divider />
				</React.Fragment>
			)}
			ListFooterComponent={
				isLoadingList ? (
					<ActivityIndicator
						size='large'
						color='orange'
					/>
				) : null
			}
		/>
	);
};

export default MainPageContent;
