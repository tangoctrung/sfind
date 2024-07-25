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
  sfinds: any[],
  messages: any[],
  textSearch: string;
  showInfoSfind: boolean;
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
  sfinds: [],
  messages: [],
  textSearch: "",
  showInfoSfind: true,
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
    updateMessages: create.reducer((state, action: PayloadAction<any>) => {
      state.messages = action.payload;
    }),
    updateTextSearch: create.reducer((state, action: PayloadAction<any>) => {
      state.textSearch = action.payload;
    }),
    updateShowInfoSfind: create.reducer((state, action: PayloadAction<any>) => {
      state.showInfoSfind = action.payload;
    }),
  }),
  selectors: {
    selectDataUser: (controlData) => controlData.user,
    selectDataToken: (controlData) => controlData.token,
    selectDataSfind: (controlData) => controlData.sfinds,
    selectDataMessage: (controlData) => controlData.messages,
    selectTextSearch: (controlData) => controlData.textSearch,
    selectShowInfoSfind: (controlData) => controlData.showInfoSfind,
  },
});

export const { updateInfoUser, updateToken, updateUserToken, updateSfinds, updateSfind, 
  updateTextSearch, updateShowInfoSfind, updateMessages } = controlDataSlice.actions;
export const { selectDataUser, selectDataToken, selectDataSfind, selectTextSearch, selectShowInfoSfind, selectDataMessage } 
= controlDataSlice.selectors;