import { describe, it, expect, vi } from 'vitest';
import { getBookDetails } from '../getBookDetails';

import { getEditionDetails } from '../getEditionDetails';
import { getWorkDetails } from '../getWorkDetails';

vi.mock('../getEditionDetails');
vi.mock('../getWorkDetails');

describe('getBookDetails', () => {
  it('should call edition flow for edition id', async () => {
    (getEditionDetails as any).mockResolvedValue({ title: 'Edition' });

    const result = await getBookDetails({
      id: 'OL1M',
    });

    expect(getEditionDetails).toHaveBeenCalled();
    expect(result.title).toBe('Edition');
  });

  it('should call work flow for work id', async () => {
    (getWorkDetails as any).mockResolvedValue({ title: 'Work' });

    const result = await getBookDetails({
      id: 'W1',
    });

    expect(getWorkDetails).toHaveBeenCalled();
    expect(result.title).toBe('Work');
  });
});
