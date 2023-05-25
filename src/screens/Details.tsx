import { useRoute } from '@react-navigation/native';
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { ComicTypes } from '../types/ComicTypes';
import { RouteProp } from '@react-navigation/native';
import Divider from '../components/UI/Divider';
import { imgHeight, imgWidth } from '../utilities/imageSizes';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { useState } from 'react';

type ParamList = {
	params: ComicTypes;
};

const Details = () => {
	const {
		params: { num, title, img, year, alt },
	} = useRoute<RouteProp<ParamList>>();

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	return (
		<View className='space-y-2 mt-2'>
			<Text className='text-center text-2xl font-bold'>{title}</Text>

			<TouchableOpacity
				className={`${modalVisible && 'h-2/3'}`}
				onPress={() => setModalVisible(true)}
			>
				<Image
					testID='details-comic-image'
					source={{ uri: img, width: imgWidth, height: imgHeight }}
					resizeMode='contain'
					className={`self-center ${modalVisible && 'hidden'} `}
				/>
			</TouchableOpacity>
			<Divider />
			<View className='mx-5 space-y-1'>
				<Text className='font-bold'>
					Year of release: <Text className='font-normal'>{year}</Text>
				</Text>
				<Text className='font-bold'>
					Comic No: <Text className='font-normal'>{num}</Text>
				</Text>
				<Text className='font-bold'>
					Description: <Text className='font-normal'>{alt}</Text>
				</Text>
			</View>

			<Modal
				visible={modalVisible}
				animationType='fade'
				transparent={true}
			>
				<View className='w-screen h-screen bg-black opacity-90 '>
					<ReactNativeZoomableView
						maxZoom={1.5}
						minZoom={1}
						zoomStep={1}
						initialZoom={1}
						bindToBorders={true}
						captureEvent={true}
					>
						<Image
							testID='modal-comic-image'
							source={{ uri: img, width: imgWidth, height: imgHeight }}
							resizeMode='contain'
							className='self-center'
						/>
					</ReactNativeZoomableView>

					<TouchableOpacity
						className='w-1/2 self-center mb-5 p-3 rounded-lg bg-orange-400'
						onPress={() => setModalVisible(false)}
					>
						<Text
							testID='modal-close-button'
							className='text-white text-center'
						>
							Close
						</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
};

export default Details;
