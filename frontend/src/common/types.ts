export interface Entry {
  id: number;
  type: EntryType;
  runDate: string;
  runDistance: number;
  runTime: string;
  createdAt: string;
}

export enum EntryType {
  RUN = "RUN",
  WALK = "WALK",
  THREADMILL = "THREADMILL",
}

export interface LatLng {
  lat: number;
  lng: number;
}
