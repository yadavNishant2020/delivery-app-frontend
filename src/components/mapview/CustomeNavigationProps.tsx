import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  OrderDetails: undefined;
  CustomMapView: { pickupLocation: { latitude: number; longitude: number,title:string }, dropLocation: { latitude: number; longitude: number,title:string } };
};

export type CustomMapViewNavigationProp = StackNavigationProp<RootStackParamList, 'CustomMapView'>;
