import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstance,
  customInstance,
  wabaInstance,
} from "../../utils/axios-instance";
import { responsiveFontSizes } from "@material-ui/core";
// thunk actions

//fetching templates
export const fetchTemplateMessages = createAsyncThunk(
  "broadcast/fetchTemplateMessages",
  async () => {
    const response = await axiosInstance.get("/v1/configs/templates");
    return response.data;
  },
);

//sending template messages without altering
export const sendTemplateMessage = createAsyncThunk(
  "broadcast/sendTemplateMessage",
  async (obj) => {
    const response = await axiosInstance.post("v1/messages", obj);
    return response.data;
  },
);

//sending bulk upload templates without altering
export const sendBulkUploadTemplateMessage = createAsyncThunk(
  "broadcast/sendBulkUploadTemplateMessage",
  async (obj) => {
    const response = await axiosInstance.post("v1/bulk_send_template", obj);
    return response.data;
  },
);

//get variable from templates
export const fetchVariablesFromTemplates = createAsyncThunk(
  "broadcast/fetchVariablesFromTemplates",
  async (obj) => {
    const response = await axiosInstance.post("v1/get_variables", obj);
    console.log(response.data);
    return response.data;
  },
);

//send variable templates
export const sendVariableTemplates = createAsyncThunk(
  "broadcast/sendVariableTemplates",
  async (obj) => {
    const response = await axiosInstance.post("v1/send_template", obj);
    console.log(response.data);
    return response.data;
  },
);

//user history data
export const userHistoryData = createAsyncThunk(
  "users/userHistoryData",
  async () => {
    const response = await axiosInstance.get("v1/user_history");
    return response.data;
  },
);

export const broadcastSlice = createSlice({
  name: "broadcast",
  initialState: {
    value: 0,
    templateMessages: [],
    responseSendingSingleTemplateMsg: {},
    responseSendingBulkTemplateMsg: {},
    variables: [],
    loading: false,
    error: undefined,
    variableMessageId: undefined,
    userHistory: [],
  },
  reducers: {
    setTemplateMessages: (state, action) => {
      state.templateMessages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplateMessages.pending, (state, action) => {
        state.loading = true;
        state.templateMessages = [];
      })
      .addCase(fetchTemplateMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.templateMessages = action.payload;
      })
      .addCase(fetchTemplateMessages.rejected, (state, action) => {
        state.loading = false;
        state.templateMessages = [];
        state.error = !!action.error && action.error;
      })
      .addCase(sendTemplateMessage.pending, (state, action) => {
        state.loading = true;
        state.responseSendingSingleTemplateMsg = {};
        state.error = !!action.error && action.error;
      })
      .addCase(sendTemplateMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.responseSendingSingleTemplateMsg = action.payload;
        state.error = !!action.error && action.error;
      })
      .addCase(sendTemplateMessage.rejected, (state, action) => {
        state.loading = false;
        state.responseSendingSingleTemplateMsg = {};
        state.error = !!action.error && action.error;
      })
      .addCase(sendBulkUploadTemplateMessage.pending, (state, action) => {
        state.loading = true;
        state.responseSendingBulkTemplateMsg = {};
        state.error = !!action.error && action.error;
      })
      .addCase(sendBulkUploadTemplateMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.responseSendingBulkTemplateMsg = action.payload;
        state.error = !!action.error && action.error;
      })
      .addCase(sendBulkUploadTemplateMessage.rejected, (state, action) => {
        state.loading = false;
        state.responseSendingBulkTemplateMsg = {};
        state.error = !!action.error && action.error;
      })
      .addCase(fetchVariablesFromTemplates.pending, (state, action) => {
        state.loading = true;
        state.variables = [];
        state.error = !!action.error && action.error;
      })
      .addCase(fetchVariablesFromTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.variables = action.payload?.response;
        state.error = !!action.error && action.error;
      })
      .addCase(fetchVariablesFromTemplates.rejected, (state, action) => {
        state.loading = false;
        state.variables = {};
        state.error = !!action.error && action.error;
      })
      .addCase(sendVariableTemplates.pending, (state, action) => {
        state.loading = true;
        state.variableMessageId = undefined;
        state.error = !!action.error && action.error;
      })
      .addCase(sendVariableTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.variableMessageId = action.payload?.success;
        state.error = !!action.error && action.error;
      })
      .addCase(sendVariableTemplates.rejected, (state, action) => {
        state.loading = false;
        state.variableMessageId = undefined;
        state.error = !!action.error && action.error;
      })
      .addCase(userHistoryData.pending, (state, action) => {
        state.userHistory = [];
      })
      .addCase(userHistoryData.fulfilled, (state, action) => {
        state.userHistory = action.payload?.activity;
      })
      .addCase(userHistoryData.rejected, (state, action) => {
        state.userHistory = [];
      });
  },
});

export const { setTemplateMessages } = broadcastSlice.actions;

export default broadcastSlice.reducer;
