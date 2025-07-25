import DirectionsApi from '@mapbox/mapbox-sdk/services/directions';

interface ScooterRouteOptions {
  coordinates: [number, number][];
  routeType: 'safe' | 'scenic' | 'direct';
  avoidHighways: boolean;
  maxSpeedLimit: number;
}

class ScooterRoutingService {
  private directionsClient: any;
  
  constructor(accessToken: string) {
    this.directionsClient = DirectionsApi({ accessToken });
  }

  async getScooterRoute(options: ScooterRouteOptions) {
    const response = await this.directionsClient.getDirections({
      profile: 'driving', // We'll filter afterwards
      coordinates: options.coordinates,
      alternatives: true,
      steps: true,
      banner_instructions: true,
      voice_instructions: true,
      annotations: ['maxspeed', 'congestion']
    }).send();

    // Filter routes based on scooter constraints
    const filteredRoutes = response.body.routes.filter(route => {
      return this.isScooterSafe(route, options.maxSpeedLimit);
    });

    return this.optimizeForScooter(filteredRoutes, options.routeType);
  }

  private isScooterSafe(route: any, maxSpeed: number): boolean {
    // Check if route has highways or high-speed roads
    const hasHighSpeedRoads = route.legs.some((leg: any) => 
      leg.steps.some((step: any) => 
        step.maxspeed && step.maxspeed > maxSpeed
      )
    );
    
    return !hasHighSpeedRoads;
  }

  private optimizeForScooter(routes: any[], type: string): any {
    switch (type) {
      case 'scenic':
        return routes.sort((a, b) => b.scenicScore - a.scenicScore)[0];
      case 'direct':
        return routes.sort((a, b) => a.duration - b.duration)[0];
      default: // 'safe'
        return routes.sort((a, b) => a.safetyScore - b.safetyScore)[0];
    }
  }
}

export default ScooterRoutingService;