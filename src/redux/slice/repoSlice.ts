import { createSlice } from '@reduxjs/toolkit';
import { fetchRepoDetails } from '../operations/fetchOperations';

interface RepoState {
  repoDetails: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repoDetails: null,
  loading: false,
  error: null,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepoDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRepoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.repoDetails = action.payload;
      })
      .addCase(fetchRepoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repo details';
      });
  },
});

export default repoSlice.reducer;