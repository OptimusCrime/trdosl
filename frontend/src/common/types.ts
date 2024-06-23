export interface Entry {
  id: number;
  type: EntryType;
  runDate: string;
  runDistance: number;
  runTime: string;
  comment: string | null;
  createdAt: string;
}

export enum EntryType {
  RUN = 'RUN',
  WALK = 'WALK',
  TREADMILL = 'TREADMILL',
}

export interface LatLng {
  lat: number;
  lng: number;
}
