import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export const currentDevice = {
    isTablet : DeviceInfo.isTablet(),
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    isIOSTablet : Platform.OS === 'ios' && DeviceInfo.isTablet(),
    isAndroidTablet : Platform.OS === 'android' && DeviceInfo.isTablet(),
    isIOSNotch : Platform.OS === 'ios' && DeviceInfo.hasNotch()
  }
  
  const { width, height } = Dimensions.get("window");
  const guidelineBaseWidth = currentDevice.isIOS ? 450 : 378;
  const guidelineBaseHeight = 667;
  export const currentWidth = width
  
  export const scale = (size: number) => (width / guidelineBaseWidth) * size;
  export const scaleVertical = (size: number) =>
    (height / guidelineBaseHeight) * size;
  
  export const FontSize = {
    H1: scale(50),
    H2: scale(22),
    H3: scale(20),
    H4: scale(18),
    H5: scale(16),
    H6: scale(14),
    H7: scale(12),
    H8: scale(10),
  };
  