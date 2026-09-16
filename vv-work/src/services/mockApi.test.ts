import { describe, it, expect } from 'vitest';
import { fetchJobsByPartner, submitApplication } from './mockApi';

describe('mockApi service', () => {
  it('повертає вакансії для відповідного партнера', async () => {
    const jobs = await fetchJobsByPartner('tech-corp');
    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBeGreaterThan(0);
    jobs.forEach((job) => {
      expect(job.partnerSlug).toBe('tech-corp');
    });
  });

  it('успішно приймає сабміт з заповненими даними', async () => {
    const response = await submitApplication({
      name: 'Костя',
      contact: '@telegram_user',
    });
    expect(response).toEqual({ success: true });
  });

  it('повертає помилку, якщо не передано обов’язкові поля', async () => {
    await expect(
      submitApplication({ name: '', contact: '' })
    ).rejects.toThrow('Будь ласка, заповніть обов’язкові поля.');
  });
});