import { LatLng } from '../common/types';

export class LatLngIterator {
  private data: LatLng[];
  private readonly length: number;
  private index: number = 0;

  constructor(data: LatLng[]) {
    this.data = data;
    this.length = data.length;
  }

  hasNext() {
    // Derp
    return this.length >= this.index + 2;
  }

  goForwards() {
    this.index = this.index + 1;
  }

  insert(item: LatLng) {
    this.data = [...this.data.slice(0, this.index + 1), item, ...this.data.slice(this.index + 1)];
  }

  get(steps?: number) {
    return this.data[this.index + (steps ?? 0)];
  }
}
