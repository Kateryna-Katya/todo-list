import { RootState } from '../store';

export const selectIssues = (state: RootState) => state.issues.issues;
