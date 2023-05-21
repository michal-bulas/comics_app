import { useEffect, useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import { useComic } from '../../hooks/comicHooks';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type navProp = StackNavigationProp<RootStackParamList, 'Home'>;

const NumberInput = () => {
	const navigation = useNavigation<navProp>();
	const [value, setValue] = useState<string>('');
	const [comicNumber, setComicNumber] = useState<number | null>(null);

	const { data: comic, error } = useComic(comicNumber);

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
		if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 2778) {
			setValue(numericText);
		} else if (numericText === '') {
			setValue('');
		}
	};

	const showComicHandler = () => {
		const numericValue = Number(value);
		if (
			value.trim() === '' ||
			isNaN(numericValue) ||
			numericValue < 1 ||
			numericValue > 2778
		) {
			Alert.alert('Warning', 'Please enter a number between 1 and 2778.');
		} else {
			setComicNumber(numericValue);
		}
	};

	return (
		<>
			<TextInput
				className='p-1 border w-35 rounded-lg my-2 text-center'
				onChangeText={onChangeText}
				value={value}
				placeholder='Enter number'
				keyboardType='numeric'
				maxLength={4}
			/>
			<Button
				color='#ff7b00'
				title='Find Comic'
				onPress={showComicHandler}
			/>
		</>
	);
};

export default NumberInput;
