type Shades = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
};

type LimitedShades = {
  50: string;
  100: string;
  200: string;
};

export type Colors = {
  base: Shades & { 700: string; 800: string; 900: string };
  rose: Shades & { 700: string };
  lavender: LimitedShades;
  coral: LimitedShades;
  peach: LimitedShades;
  mauve: LimitedShades;
  periwinkle: LimitedShades;
  pearl: LimitedShades;
  transparent?: string;
};

export const colors: Colors = {
  transparent: "rgba(0,0,0,0)",
  base: {
    50: "#FFFFFF",
    100: "#F8F8F8",
    200: "#E8E8E8",
    300: "#B8B8B8",
    400: "#888888",
    500: "#484848",
    600: "#383838",
    700: "#282828",
    800: "#1C1C1C",
    900: "#121212",
  },
  rose: {
    50: "#F9EEF8",
    100: "#FFDCFC",
    200: "#F8C6F5",
    300: "#F3BCDF",
    400: "#E9A5D3",
    500: "#DF8AC7",
    600: "#D56DB4",
    700: "#CB54A1",
  },
  lavender: {
    50: "#F8F5FD",
    100: "#F3EAFB",
    200: "#E9D8F8",
  },
  coral: {
    50: "#FFE8E8",
    100: "#FFD1D1",
    200: "#FFBABA",
  },
  peach: {
    50: "#FFF0E8",
    100: "#FFE1D1",
    200: "#FFD2BA",
  },
  mauve: {
    50: "#F5E8FF",
    100: "#EBD1FF",
    200: "#E1BAFF",
  },
  periwinkle: {
    50: "#E8F0FF",
    100: "#D1E1FF",
    200: "#BAD2FF",
  },
  pearl: {
    50: "#FFFDF9",
    100: "#FFF8F0",
    200: "#FFF4E8",
  },
};
