import { RootState } from '../store';

export const selectRepoDetails = (state: RootState) => state.repo.repoDetails;
