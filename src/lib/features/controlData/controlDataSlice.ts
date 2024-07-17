import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export interface ControlDataSliceState {
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    address: string;
    dob: string;
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
    id: "",
    username: "",
    address: "",
    avatar: "",
    dob: "",
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
    updateInfoUser: create.reducer((state, action: PayloadAction<any>) => {
      state.user = {...action.payload};
    }),
    updateToken: create.reducer((state, action: PayloadAction<any>) => {
      state.token = {...action.payload};
    }),
    updateUserToken: create.reducer((state, action: PayloadAction<any>) => {
      state.user = {...action.payload?.user, id: action.payload?.user?._id};
      state.token = {...action.payload?.token};
    })
  }),
  selectors: {
    selectDataUser: (controlData) => controlData.user,
    selectDataToken: (controlData) => controlData.token,
  },
});

export const { updateInfoUser, updateToken, updateUserToken } =
  controlDataSlice.actions;
export const { selectDataUser, selectDataToken } = controlDataSlice.selectors;