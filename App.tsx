import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Home from './src/screens/Home';
import Details from './src/screens/Details';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Welcome'>
					<Stack.Screen
						name='Welcome'
						component={Welcome}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Home'
						component={Home}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Details'
						component={Details}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	);
}
