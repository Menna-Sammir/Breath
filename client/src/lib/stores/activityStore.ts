import { makeAutoObservable } from "mobx";

export class ActivityStore {
  filter = "all";
  startDate: string = new Date().toISOString();
  city: string = "";
  minPrice: number | null = null;
  maxPrice: number | null = null;
  duration: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = (filter: string) => {
    this.filter = filter;
  };

  setStartDate = (date: Date) => {
    this.startDate = date.toISOString();
  };

  setCity = (city: string) => {
    this.city = city;
  };

  setMinPrice = (min: number | null) => {
    this.minPrice = min;
  };

  setMaxPrice = (max: number | null) => {
    this.maxPrice = max;
  };

  setPriceRange = (min: number | null, max: number | null) => {
    this.minPrice = min;
    this.maxPrice = max;
  };

  setDuration = (duration: string) => {
    this.duration = duration;
  };
}
