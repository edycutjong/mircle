import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TheMiracleService } from './themiracle';

describe('TheMiracleService', () => {
  let service: TheMiracleService;

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    service = new TheMiracleService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  describe('init()', () => {
    it('is idempotent — calling twice does not throw', () => {
      service.init();
      service.init();
    });

    it('warns if API key is not provided', () => {
      service.init();
      expect(console.warn).toHaveBeenCalledWith("[TheMiracle SDK] No API key provided. Requests may fall back to mock data.");
    });

    it('does not warn if API key is provided', () => {
      vi.clearAllMocks();
      process.env.THEMIRACLE_API_KEY = 'test-key';
      const srv = new TheMiracleService();
      srv.init();
      expect(console.warn).not.toHaveBeenCalled();
      delete process.env.THEMIRACLE_API_KEY;
    });
  });

  describe('claimIncentive()', () => {
    it('returns licenseId and status from API on success', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ licenseId: 'MRC-TEST-99B1', status: 'ACTIVATED' }),
      }));

      const result = await service.claimIncentive('user_123');

      expect(result.licenseId).toBe('MRC-TEST-99B1');
      expect(result.status).toBe('ACTIVATED');
    });

    it('uses fallback licenseId and status if API json misses them', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      }));

      const result = await service.claimIncentive('user_123');

      expect(result.licenseId).toMatch(/^MRC-[A-Z0-9]+-99B1$/);
      expect(result.status).toBe('ACTIVATED');
    });

    it('generates a valid mock license when API returns non-ok response', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({ ok: false }));

      const promise = service.claimIncentive('user_123');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe('ACTIVATED');
      expect(result.licenseId).toMatch(/^MRC-[A-Z0-9]+-99B1$/);
    });

    it('falls back to mock on network error', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')));

      const promise = service.claimIncentive('user_123');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe('ACTIVATED');
    });
  });

  describe('getAdminMetrics()', () => {
    it('returns metrics object from API on success', async () => {
      const mockMetrics = { signups: '10,000', activeLicenses: '8,000', cac: '$0.00', perceivedValue: '$5M' };
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockMetrics,
      }));

      const result = await service.getAdminMetrics();

      expect(result).toEqual(mockMetrics);
    });

    it('returns hardcoded fallback metrics on API error', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Server error')));

      const promise = service.getAdminMetrics();
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.signups).toBe('8,492');
      expect(result.cac).toBe('$0.00');
    });

    it('returns hardcoded fallback metrics when API returns non-ok response', async () => {
      vi.useFakeTimers();
      vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({ ok: false }));

      const promise = service.getAdminMetrics();
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.signups).toBe('8,492');
      expect(result.cac).toBe('$0.00');
    });
  });
});
