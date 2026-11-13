import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

function advance(milliseconds) {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
}

function enterWorld() {
  fireEvent.click(screen.getByRole('button', { name: /open it/i }));
  expect(screen.getByRole('heading', { name: /hai, meita cantikku/i })).toBeTruthy();
}

function choosePortal(name) {
  fireEvent.click(screen.getByRole('button', { name }));
}

describe('HAI, WANITA CANTIKKU interactive world', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the deterministic four-NO quest, particle end state, and opens the garden', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /hai, meita cantikku/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /^no/i }));
    advance(300);
    expect(screen.getByRole('heading', { name: /ehh, kok no/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /^no/i }));
    advance(300);
    expect(screen.getByRole('heading', { name: /pleaseee, pretty girl/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /^no/i }));
    advance(300);
    expect(screen.getByRole('heading', { name: /last chance, my pretty girl/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /^no/i }));
    expect(document.querySelector('.opening-popup.is-crumbling')).toBeTruthy();
    expect(document.querySelectorAll('.pixel-debris i')).toHaveLength(168);
    advance(1400);

    expect(screen.getByText(/only one choice hehe/i)).toBeTruthy();
    expect(screen.getAllByRole('button', { name: /open it/i })).toHaveLength(1);

    enterWorld();
    expect(screen.getByRole('button', { name: /music box/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /our memories/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /love letter/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /little surprise/i })).toBeTruthy();
  });

  it('plays a YouTube soundtrack that remains active across pages', async () => {
    render(<App />);
    enterWorld();
    choosePortal(/music box/i);
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    act(() => window.__lastYouTubePlayer.triggerReady());

    expect(screen.getByRole('heading', { name: /a little melody for you/i })).toBeTruthy();
    expect(document.querySelector('.track-display h2')?.textContent).toBe('Dari Mata');

    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Pause musik' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Lagu selanjutnya' }));
    expect(document.querySelector('.track-display h2')?.textContent).toBe('Kasmaran');

    fireEvent.click(screen.getByRole('button', { name: /kembali ke dunia utama/i }));
    expect(screen.getByRole('heading', { name: /hai, meita cantikku/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Pause musik' })).toBeTruthy();

    choosePortal(/our memories/i);
    expect(screen.getByRole('button', { name: 'Pause musik' })).toBeTruthy();
  });

  it('opens scrapbook photos, supports next/previous, and closes on Escape', () => {
    render(<App />);
    enterWorld();
    choosePortal(/our memories/i);

    expect(screen.getByRole('heading', { name: /every picture tells a story/i })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /buka foto: my favorite human/i }));
    expect(screen.getByRole('dialog', { name: /foto: my favorite human/i })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(within(screen.getByRole('dialog')).getByText('A little piece of happiness.')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(within(screen.getByRole('dialog')).getByText('My favorite human ♡')).toBeTruthy();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens, types, and replays the editable love letter', () => {
    render(<App />);
    enterWorld();
    choosePortal(/love letter/i);

    fireEvent.click(screen.getByRole('button', { name: /buka surat cinta/i }));
    advance(900);
    advance(5000);
    expect(screen.getByText(/aku sayang kamu, wanita cantikku/i)).toBeTruthy();
    expect(screen.getByText('With love, ♡')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /replay letter/i }));
    advance(160);
    expect(screen.getByRole('button', { name: /surat sudah dibuka/i })).toBeTruthy();
  });

  it('reveals and dismisses the final surprise popup', () => {
    render(<App />);
    enterWorld();
    choosePortal(/little surprise/i);

    expect(screen.getByText(/you're my favorite person/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /one more thing/i }));
    expect(screen.getByRole('dialog', { name: /pesan terakhir/i })).toBeTruthy();
    expect(screen.getByText(/terima kasih sudah menjadi bagian/i)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /keep this/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
