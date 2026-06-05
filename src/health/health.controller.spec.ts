import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckResponseDto } from './dto/health-check-response.dto';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check()', () => {
    it('should return a health check response', () => {
      const result = controller.check();
      expect(result).toBeDefined();
    });

    it('should return status as "ok"', () => {
      const result = controller.check();
      expect(result.status).toBe('ok');
    });

    it('should return a valid uptime number', () => {
      const result = controller.check();
      expect(typeof result.uptime).toBe('number');
      expect(result.uptime).toBeGreaterThan(0);
    });

    it('should return a valid ISO8601 timestamp', () => {
      const result = controller.check();
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      expect(result.timestamp).toMatch(isoRegex);
    });

    it('should have all required properties', () => {
      const result = controller.check();
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('timestamp');
    });

    it('should match HealthCheckResponseDto structure', () => {
      const result = controller.check();
      expect(result).toEqual({
        status: expect.any(String),
        uptime: expect.any(Number),
        timestamp: expect.any(String),
      });
    });

    it('should return increasing uptime', () => {
      const result1 = controller.check();
      const result2 = controller.check();
      expect(result2.uptime).toBeGreaterThanOrEqual(result1.uptime);
    });
  });
});
