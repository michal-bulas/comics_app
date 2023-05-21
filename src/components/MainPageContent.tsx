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
import NumberInput from './UI/NumberInput';
import { Dimensions } from 'react-native';

type navProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MainPageContent = () => {
	const navigation = useNavigation<navProp>();
	const screenWidth = Dimensions.get('window').width;
	const [comicCount, setComicCount] = useState<number>(10);

	const { data: latestComic, isLoading: isLoadingLatest } = useLatestComic();
	const comicsQueries = useComics(1, comicCount);
	const isLoadingList = comicsQueries.some(
		(comic) => comic.status === 'loading'
	);

	const loadMoreComics = useCallback(() => {
		setComicCount((prevComicCount) => prevComicCount + 10);
	}, []);

	if (isLoadingLatest) {
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
		<FlatList
			data={comicsList}
			onEndReached={loadMoreComics}
			onEndReachedThreshold={0.5}
			keyExtractor={(item) => item.num.toString()}
			ListHeaderComponent={
				<>
					<TouchableOpacity
						onPress={() => navigation.navigate('Details', { ...latestComic })}
					>
						<Text className='text-center text-xl'>
							Latest Comic No: {latestComic.num}
						</Text>
						<Text className='text-center text-md my-1'>
							{latestComic.title}
						</Text>
						<Image
							className='self-center'
							resizeMode='contain'
							source={{
								uri: latestComic.img,
								width: screenWidth - 10,
								height: 200,
							}}
						/>
					</TouchableOpacity>

					<Divider />

					<View className='ml-2 self-center'>
						<Text className='font-bold text-center'>{`Search for Comic by No: \n(Range 1-2778)`}</Text>
						<NumberInput />
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
