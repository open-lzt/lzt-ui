// Own file because the timezone has to be set before anything reads a date.
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

(globalThis as { process?: { env: Record<string, string> } }).process!.env.TZ = 'America/New_York';

import { Calendar } from './Calendar';

describe('Calendar across a DST change', () => {
  it('renders 42 distinct days in a month where the clocks go back', () => {
    // 1 November 2026, US clocks fall back: that local day is 25 hours long, so stepping by a fixed
    // 86 400 000 ms lands on it twice — the grid then repeats a day and drops the last one.
    render(<Calendar defaultValue="2026-11-15" weekStart={1} />);

    const labels = screen.getAllByRole('gridcell').map((cell) => cell.textContent);
    expect(labels).toHaveLength(42);
    const repeated = labels.filter((label, i) => i > 0 && label === labels[i - 1]);
    expect(repeated).toEqual([]);
  });
});
