import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays user profile', async () => {
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        profile: {
          username: 'testuser',
          email: 'test@example.com',
          createdAt: '2023-01-01T00:00:00.000Z',
        },
      },
    });

    render(<ProfilePage />);

    expect(screen.getByText(/profile/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('displays error message on unauthorized access', async () => {
    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Unauthorized'));

    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText(/unauthorized or session expired/i)).toBeInTheDocument();
    });
  });
});
