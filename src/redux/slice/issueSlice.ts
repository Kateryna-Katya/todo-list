import { createSlice } from '@reduxjs/toolkit';
import { fetchIssues } from '../operations/fetchOperations';


interface IssueState {
  issues: any[];
  loading: boolean;
  error: string | null;
}

const initialState: IssueState = {
  issues: [],
  loading: false,
  error: null,
};

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch issues';
      });
  },
});

export default issueSlice.reducer;