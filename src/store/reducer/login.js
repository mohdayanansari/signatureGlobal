import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setAuthorizationToken, {
  axiosInstance,
} from "../../utils/axios-instance";
// thunk actions

//login user
export const loginUser = createAsyncThunk("login/loginUser", async (obj) => {
  const response = await axiosInstance.post("login", obj);
  return response.data;
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isAuthenticated: false,
    access_token: null,
    name: null,
    username: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.access_token = action.payload.access_token;
      state.name = action.payload.name;
      state.username = action.payload.username;
      setAuthorizationToken(action.payload.access_token);
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.access_token = null;
      localStorage.removeItem("id_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.access_token = null;
        state.name = null;
        state.username = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access_token = action?.payload?.access_token;
        state.name = action?.payload?.name;
        state.username = action?.payload?.username;
        state.error = null;
        state.isAuthenticated = true;
        setAuthorizationToken(action?.payload?.access_token);
        localStorage.setItem("id_token", action?.payload?.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.access_token = null;
        state.name = null;
        state.username = null;
        state.error = true;
        state.isAuthenticated = false;
      });
  },
});

export const { setAuth, logout } = loginSlice.actions;

export default loginSlice.reducer;
