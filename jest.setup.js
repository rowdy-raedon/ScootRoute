// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  State: {},
  PanGestureHandler: 'View',
  TapGestureHandler: 'View',
  FlatList: 'FlatList',
  Switch: 'Switch',
  TextInput: 'TextInput',
  ToolbarAndroid: 'ToolbarAndroid',
  ViewPagerAndroid: 'ViewPagerAndroid',
  DrawerLayoutAndroid: 'DrawerLayoutAndroid',
  WebView: 'WebView',
}));

// Mock @react-native-mapbox-gl/maps
jest.mock('@react-native-mapbox-gl/maps', () => ({
  MapView: 'MapView',
  Camera: 'Camera',
  ShapeSource: 'ShapeSource',
  LineLayer: 'LineLayer',
  UserTrackingModes: {
    Follow: 'follow',
  },
}));

// Mock react-native-geolocation-service
jest.mock('react-native-geolocation-service', () => ({
  requestAuthorization: jest.fn(),
  watchPosition: jest.fn(),
}));

// Mock react-native-agora
jest.mock('react-native-agora', () => ({
  IRtcEngine: {},
}));

// Mock Firebase
jest.mock('@react-native-firebase/app', () => ({}));
jest.mock('@react-native-firebase/firestore', () => () => ({}));
jest.mock('@react-native-firebase/auth', () => () => ({}));