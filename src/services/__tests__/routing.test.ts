import ScooterRoutingService from '../routing';

// Mock the Mapbox SDK
jest.mock('@mapbox/mapbox-sdk/services/directions', () => {
  return jest.fn(() => ({
    getDirections: jest.fn(() => ({
      send: jest.fn().mockResolvedValue({
        body: {
          routes: [
            {
              legs: [
                {
                  steps: [
                    { maxspeed: 30 },
                    { maxspeed: 40 }
                  ]
                }
              ],
              duration: 1000,
              safetyScore: 0.8,
              scenicScore: 0.6
            }
          ]
        }
      })
    }))
  }));
});

describe('ScooterRoutingService', () => {
  let routingService: ScooterRoutingService;

  beforeEach(() => {
    routingService = new ScooterRoutingService('test-token');
  });

  test('should create routing service instance', () => {
    expect(routingService).toBeInstanceOf(ScooterRoutingService);
  });

  test('should get scooter route with safe preferences', async () => {
    const options = {
      coordinates: [[0, 0], [1, 1]] as [number, number][],
      routeType: 'safe' as const,
      avoidHighways: true,
      maxSpeedLimit: 45
    };

    const result = await routingService.getScooterRoute(options);
    expect(result).toBeDefined();
  });
});