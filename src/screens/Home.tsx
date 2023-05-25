import { View } from 'react-native';
import MainPageContent from '../components/MainPageContent';

const Home = () => {
	return (
		<View
			testID='home-view'
			className='mx-2 h-full mt-3'
		>
			<MainPageContent />
		</View>
	);
};

export default Home;
