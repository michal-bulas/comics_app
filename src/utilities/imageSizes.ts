import { Dimensions } from 'react-native';

export let imgWidth: number = Dimensions.get('window').width - 10;
export let imgHeight: number = (Dimensions.get('window').height * 9) / 16;
