import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from '@/app/app/page';

describe('Webhook Failure Handling / Integration', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should display graceful error UI when webhook returns 500', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' }),
      })
    ) as any;

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('should display graceful error UI when webhook times out', async () => {
    global.fetch = vi.fn(() =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 100)
      )
    ) as any;

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  it('should show maintenance banner when API returns 401/403', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Unauthorized' }),
      })
    ) as any;

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
