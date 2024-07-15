import { createAppSlice } from "@/lib/createAppSlice";

export interface ControlDataSliceState {
  user: {
    username: string;
    email: string;
    avatar: string;
    address: string;
    dob: Date;
    gender: string;
    phone: string;
  },
  token: {
    accessToken: string;
    refreshToken: string;
  }
}

const initialState: ControlDataSliceState = {
  user: {
    username: "",
    address: "",
    avatar: "",
    dob: new Date(),
    email: "",
    gender: "",
    phone: "",
  },
  token: {
    accessToken: "",
    refreshToken: "",
  }
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const controlDataSlice = createAppSlice({
  name: "controlData",
  initialState,
  reducers: (create) => ({
  }),
  selectors: {
    selectDataUser: (controlData) => controlData.user,
    selectDataToken: (controlData) => controlData.token,
  },
});

export const {  } =
  controlDataSlice.actions;
export const { selectDataUser, selectDataToken } = controlDataSlice.selectors;