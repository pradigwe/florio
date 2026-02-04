export interface Plant {
  userId: string;
  nickname: string;
  image?: string;
  commonName?: string;
  scientificName?: string;
  wateringFrequency?: number[];
  wateringUnit: string;
  lastWateredAt: Date;
}

export interface PlantCatalog {
  externalId: number; // source id
  externalSource: string; // default is perenual
  commonName: string;
  scientificName: string;
  defaultImages: string[]; // array of thumbnail, and small/medium
}

export interface PerenualSpeciesList {
  id: number;
  common_name: string;
  scientific_name: string;
  default_image: {
    small_url: string;
    medium_url: string;
    thumbnail: string;
  };
}
