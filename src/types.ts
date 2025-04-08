export interface FoodItem {
  type: "Fruit" | "Vegetable";
  name: string;
}

export interface FoodColumn {
  type: "Fruit" | "Vegetable";
  items: FoodItem[];
}
