import React from 'react';
import { useEffect, useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import { useComic } from '../hooks/comicHooks';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type navProp = StackNavigationProp<RootStackParamList, 'Home'>;

const ComicSearch: React.FC<{ latest: number }> = ({ latest }) => {
	const navigation = useNavigation<navProp>();
	const [value, setValue] = useState<string>('');
	const [comicNumber, setComicNumber] = useState<number | null>(null);

	const isValidComicNumber = (inputNumber: number | null) => {
		return inputNumber !== null && inputNumber >= 1 && inputNumber <= latest;
	};

	const { data: comic, error } = useComic(
		isValidComicNumber(comicNumber) ? comicNumber : null
	);

	useEffect(() => {
		if (comic) {
			navigation.navigate('Details', { ...comic });
		} else if (error) {
			console.error(error);
		}
	}, [comic, error]);

	const onChangeText = (text: string) => {
		const numericText = text.replace(/[^0-9]/g, '');
		const numericValue = parseInt(numericText, 10);
		if (isValidComicNumber(numericValue) || numericText === '') {
			setValue(numericText);
		} else if (numericText === '') {
			setValue('');
		}
	};

	const showComicHandler = () => {
		const numericValue = Number(value);
		if (!isValidComicNumber(numericValue)) {
			Alert.alert('Warning', `Please enter a number between 1 and ${latest}.`);
		} else {
			setComicNumber(numericValue);
		}
	};

	return (
		<>
			<TextInput
				testID='comic-search-input'
				className='p-1 border w-35 rounded-lg my-2 text-center'
				onChangeText={onChangeText}
				value={value}
				placeholder='Enter number'
				keyboardType='numeric'
				maxLength={4}
			/>
			<Button
				testID='comic-search-button'
				color='#ff7b00'
				title='Find Comic'
				onPress={showComicHandler}
			/>
		</>
	);
};

export default ComicSearch;
