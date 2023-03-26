export type TIngredientsData = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientsDataWithUUID = TIngredientsData & { uuid: string; };

export type TOrderData = {
  readonly ingredients: [];
  readonly _id: string;
  readonly status: string;
  readonly number: number;
  readonly createdAt: Date;
  readonly updatedAt: string;
  readonly name: string;
};

export type TWSData = {
  readonly success: boolean;
  readonly orders: Array<TOrderData>;
  readonly total: number;
  readonly totalToday: number;
};


