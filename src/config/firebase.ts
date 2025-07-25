import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const db = firestore();
export const authentication = auth();

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  TRIPS: 'trips',
  PLANNED_RIDES: 'plannedRides',
  GROUP_RIDES: 'groupRides'
};