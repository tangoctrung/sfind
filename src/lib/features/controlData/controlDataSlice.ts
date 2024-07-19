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
  },
  sfinds: any[]
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
  },
  sfinds: []
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
    }),
    updateSfinds: create.reducer((state, action: PayloadAction<any>) => {
      state.sfinds = action.payload;
    }),
    updateSfind: create.reducer((state, action: PayloadAction<any>) => {
      state.sfinds.unshift(action.payload)
    }),
  }),
  selectors: {
    selectDataUser: (controlData) => controlData.user,
    selectDataToken: (controlData) => controlData.token,
    selectDataSfind: (controlData) => controlData.sfinds,
  },
});

export const { updateInfoUser, updateToken, updateUserToken, updateSfinds, updateSfind } =
  controlDataSlice.actions;
export const { selectDataUser, selectDataToken, selectDataSfind } = controlDataSlice.selectors;