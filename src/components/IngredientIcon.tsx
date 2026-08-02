export type IngredientType =
  | "nohut"
  | "yulaf"
  | "tofu"
  | "havuc"
  | "pirasa"
  | "maydanoz"
  | "fasulye";

const LABELS: Record<IngredientType, string> = {
  nohut: "Nohut",
  yulaf: "Yulaf",
  tofu: "Tofu",
  havuc: "Havuç",
  pirasa: "Pırasa",
  maydanoz: "Maydanoz",
  fasulye: "Meksika Fasulyesi",
};

export function ingredientLabel(type: IngredientType) {
  return LABELS[type];
}

export default function IngredientIcon({
  type,
  color,
  className,
}: {
  type: IngredientType;
  color: string;
  className?: string;
}) {
  const common = { className, role: "img" as const, "aria-label": LABELS[type] };

  switch (type) {
    case "nohut":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <circle cx="32" cy="34" r="20" fill={color} />
          <path d="M24 24c2-4 6-6 8-6" stroke="#F7F3EA" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "yulaf":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <rect x="14" y="24" width="36" height="16" rx="8" fill={color} />
          <line x1="20" y1="32" x2="44" y2="32" stroke="#F7F3EA" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "tofu":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <rect x="14" y="14" width="36" height="36" rx="6" fill={color} />
          <circle cx="24" cy="26" r="1.5" fill="#F7F3EA" opacity="0.6" />
          <circle cx="34" cy="30" r="1.5" fill="#F7F3EA" opacity="0.6" />
          <circle cx="28" cy="38" r="1.5" fill="#F7F3EA" opacity="0.6" />
          <circle cx="40" cy="40" r="1.5" fill="#F7F3EA" opacity="0.6" />
        </svg>
      );
    case "havuc":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <path d="M32 50 L22 20 Q32 12 42 20 Z" fill={color} />
          <path d="M28 18c-2-6-1-10 1-12M32 16c0-6 1-10 3-12M36 18c2-6 4-9 6-10" stroke="#0B4A28" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "pirasa":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <rect x="26" y="10" width="12" height="44" rx="6" fill={color} />
          <rect x="26" y="10" width="12" height="20" rx="6" fill="#F7F3EA" opacity="0.35" />
        </svg>
      );
    case "maydanoz":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <circle cx="24" cy="26" r="9" fill={color} />
          <circle cx="38" cy="22" r="9" fill={color} />
          <circle cx="32" cy="36" r="9" fill={color} />
          <circle cx="20" cy="40" r="7" fill={color} />
          <circle cx="42" cy="38" r="7" fill={color} />
        </svg>
      );
    case "fasulye":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...common}>
          <path
            d="M22 20c-8 6-8 22 2 28 10 6 22-2 20-12-1-6-8-6-12-10s-2-12-10-6z"
            fill={color}
          />
        </svg>
      );
  }
}
