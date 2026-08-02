export type RollingVeg = {
  photo: string;
  label: string;
  size: number;
  startX: number;
  startY: number;
  restX: number;
  restY: number;
  delay: number;
  reach: number;
  spin: number;
};

// startX/Y: sepetten çıkış noktası (% olarak sahne içinde)
// restX/Y: durma noktası — bazıları vitavegantis sepetine ulaşmaz (kısa mesafede durur)
const TRAVEL_SPAN = 0.46;

export const rollingVeggies: RollingVeg[] = [
  { photo: "/ingredients/sogan.png", label: "Soğan", size: 64, startX: 19, startY: 30, restX: 46, restY: 60, delay: 0.02, reach: 0.85, spin: 520 },
  { photo: "/hero/havuc.png", label: "Havuç", size: 74, startX: 22, startY: 28, restX: 62, restY: 50, delay: 0.06, reach: 1, spin: 660 },
  { photo: "/ingredients/sarimsak.png", label: "Sarımsak", size: 54, startX: 18, startY: 34, restX: 38, restY: 66, delay: 0.1, reach: 0.55, spin: 360 },
  { photo: "/hero/fasulye.png", label: "Meksika Fasulyesi", size: 50, startX: 21, startY: 33, restX: 71, restY: 46, delay: 0.15, reach: 1, spin: 780 },
  { photo: "/hero/nohut.png", label: "Nohut", size: 46, startX: 20, startY: 32, restX: 53, restY: 63, delay: 0.19, reach: 0.65, spin: 440 },
  { photo: "/hero-basket/bezelye.png", label: "Bezelye", size: 58, startX: 23, startY: 30, restX: 66, restY: 39, delay: 0.23, reach: 1, spin: 600 },
];

export const heroBasketTravelSpan = TRAVEL_SPAN;

export type DecorativeItem = {
  photo: string;
  label: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
};

export const decorativeItems: DecorativeItem[] = [
  { photo: "/hero-basket/ispanak.png", label: "Ispanak", x: 60, y: 18, size: 92, rotate: -8 },
  { photo: "/hero/pirasa.png", label: "Pırasa", x: 93, y: 22, size: 76, rotate: 10 },
  { photo: "/ingredients/bugday.png", label: "Buğday", x: 57, y: 70, size: 88, rotate: 6 },
  { photo: "/hero-basket/kereviz.png", label: "Kereviz", x: 95, y: 68, size: 84, rotate: -6 },
  { photo: "/hero-basket/aycicek-saksi.png", label: "Saksıda Ayçiçek", x: 78, y: 6, size: 108, rotate: -3 },
];
