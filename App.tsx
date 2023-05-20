import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPageList from './src/components/MainPageList';

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<View style={styles.container}>
					<Text>Open up App.tsx to start working on your app!</Text>
					<StatusBar style='auto' />
					<MainPageList />
				</View>
			</NavigationContainer>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
