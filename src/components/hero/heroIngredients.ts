import type { IngredientType } from "@/components/IngredientIcon";

export type HeroIngredient = {
  type: IngredientType;
  color: string;
  startAngle: number;
  startRadius: number;
  size: number;
};

export const heroIngredients: HeroIngredient[] = [
  { type: "nohut", color: "#F2B705", startAngle: 10, startRadius: 250, size: 62 },
  { type: "yulaf", color: "#8B9A6F", startAngle: 60, startRadius: 235, size: 68 },
  { type: "tofu", color: "#F7F3EA", startAngle: 115, startRadius: 255, size: 60 },
  { type: "havuc", color: "#FF6B4A", startAngle: 165, startRadius: 240, size: 58 },
  { type: "pirasa", color: "#8B9A6F", startAngle: 215, startRadius: 250, size: 66 },
  { type: "maydanoz", color: "#0B4A28", startAngle: 270, startRadius: 235, size: 58 },
  { type: "fasulye", color: "#6B2D5C", startAngle: 320, startRadius: 245, size: 56 },
];
