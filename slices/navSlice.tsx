import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type navState = {
  origin: geometryProps | null;
  destination: geometryProps | null;
  travelTimeInfo: string | null;
};

type locationProps = {
  lat: number;
  long: number;
};

type geometryProps = {
  location: locationProps;
  description: string;
};

const initialState: navState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state: navState, action: PayloadAction<geometryProps>) => {
      state.origin = action.payload;
    },
    setDestination: (state: navState, action: PayloadAction<geometryProps>) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state: navState, action: PayloadAction<string>) => {
      state.travelTimeInfo = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInfo } =
  navSlice.actions;

//seclectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInfo = (state: RootState) =>
  state.nav.travelTimeInfo;

export default navSlice.reducer;
