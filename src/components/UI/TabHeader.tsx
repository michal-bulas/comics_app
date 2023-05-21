import React from 'react';
import { Text, View } from 'react-native';

const TabHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<View className='h-12 w-full bg-orange-400 justify-center items-center rounded-xl my-5'>
			<Text className='font-bold text-lg text-white'>{children}</Text>
		</View>
	);
};

export default TabHeader;
