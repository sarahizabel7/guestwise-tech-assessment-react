type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  cuisine: string;
  rating: number;
  details?: RestaurantDetailsData;
};

type RestaurantDetailsData = {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
};

export type { Restaurant, RestaurantDetailsData };
