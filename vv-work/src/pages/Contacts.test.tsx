// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { Contacts } from './Contacts';
import * as mockApi from '../services/mockApi';

vi.mock('../services/mockApi', () => ({
  submitApplication: vi.fn(),
}));

const renderContacts = () => render(<MemoryRouter><Contacts /></MemoryRouter>);

describe('Contacts component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('відображає помилку при відправці порожнього імені', async () => {
    renderContacts();
    const submitBtn = screen.getByRole('button', { name: /надіслати/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/введіть/i)).toBeInTheDocument();
  });

  it('відображає помилку при відправці порожнього контакту', async () => {
    renderContacts();
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Костянтин' } });

    const submitBtn = screen.getByRole('button', { name: /надіслати/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/введіть|контакт/i)).toBeInTheDocument();
  });

  it('відображає помилку, якщо контакт занадто короткий', async () => {
    renderContacts();
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Костянтин' } });
    fireEvent.change(inputs[1], { target: { value: '12' } });

    const submitBtn = screen.getByRole('button', { name: /надіслати/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/короткий|помилка/i)).toBeInTheDocument();
  });

  it('успішно відправляє форму при валідних даних', async () => {
    vi.mocked(mockApi.submitApplication).mockResolvedValueOnce({ success: true });
    renderContacts();

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Костянтин' } });
    fireEvent.change(inputs[1], { target: { value: '+380991234567' } });

    const submitBtn = screen.getByRole('button', { name: /надіслати/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/успішно|надіслано|дякуємо/i)).toBeInTheDocument();
    });
  });
});