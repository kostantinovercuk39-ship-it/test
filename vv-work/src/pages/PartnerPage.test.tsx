// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { PartnerPage } from './PartnerPage';

describe('PartnerPage component', () => {
  it('відображає головний заголовок та переваги', () => {
    render(
      <MemoryRouter>
        <PartnerPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/потрібні працівники\?/i)).toBeInTheDocument();
    expect(screen.getByText(/швидкий підбір/i)).toBeInTheDocument();
    expect(screen.getByText(/перевірені кадри/i)).toBeInTheDocument();
    expect(screen.getByText(/супровід/i)).toBeInTheDocument();
  });

  it('містить посилання для переходу на сторінку контактів', () => {
    render(
      <MemoryRouter>
        <PartnerPage />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /знайти працівника/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contacts');
  });
});