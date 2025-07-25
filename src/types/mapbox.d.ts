declare module '@mapbox/mapbox-sdk/services/directions' {
  export interface DirectionsApi {
    getDirections(options: any): { send(): Promise<any> };
  }
  
  export default function(config: { accessToken: string }): DirectionsApi;
}