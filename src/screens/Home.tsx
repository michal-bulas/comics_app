import { View, Text, StatusBar } from 'react-native';
import MainPageList from '../components/MainPageList';

const Home = () => {
	return (
		<View
			className='mx-auto h-full'
			style={{ marginTop: StatusBar.currentHeight }}
		>
			<MainPageList />
		</View>
	);
};

export default Home;
