import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance  from '../../axiosInstance'

interface FetchParams {
  owner: string;
  repo: string;
}

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async ({ owner, repo }: FetchParams) => {
    const response = await axiosInstance.get(`/repos/${owner}/${repo}/issues`);
    return response.data;
  }
);
export const fetchRepoDetails = createAsyncThunk(
  'repo/fetchRepoDetails',
  async ({ owner, repo }: FetchParams) => {
    const response = await axiosInstance.get(`/repos/${owner}/${repo}`);
    return response.data;
  }
);