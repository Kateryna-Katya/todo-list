import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DndProvider } from 'react-dnd'; 
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import Column from '../components/Column';
import issueReducer from '../redux/slice/issueSlice';
import repoReducer from '../redux/slice/repoSlice';
import { vi } from 'vitest';
import axiosInstance from '../axiosInstance.ts';


vi.mock('../axiosInstance', () => ({
  default: {
    get: vi.fn(), 
  },
}));


const mockStore = configureStore({
  reducer: {
    issues: issueReducer,
    repo: repoReducer,
  },
});

const mockIssues = [
  { id: 1, title: 'Issue 1', state: 'open', assignee: null, html_url: '#' },
];

describe('Column Component', () => {
  it('renders column with title', async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockIssues }); 

    render(
      <Provider store={mockStore}>
        <DndProvider backend={HTML5Backend}>
          <Column title="TODO" issues={mockIssues} columnId="todo" />
        </DndProvider>
      </Provider>
    );

    expect(screen.getByText('TODO')).toBeInTheDocument();
  });

  it('renders issues in the column', async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockIssues });

    render(
      <Provider store={mockStore}>
        <DndProvider backend={HTML5Backend}>
          <Column title="TODO" issues={mockIssues} columnId="todo" />
        </DndProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Issue 1')).toBeInTheDocument();
    });
  });

  it('shows error message when API request fails', async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error('Failed to fetch issues'));

    render(
      <Provider store={mockStore}>
        <DndProvider backend={HTML5Backend}>
          <Column title="TODO" issues={[]} columnId="todo" />
        </DndProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch issues')).toBeInTheDocument();
    });
  });
});