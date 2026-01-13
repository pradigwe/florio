type FontWeightType =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "normal"
  | "bold";

export const Fonts = {
  h1: {
    fontSize: 24,
    fontWeight: "700" as FontWeightType,
  },
  h2: {
    fontSize: 20,
    fontWeight: "600" as FontWeightType,
  },
  h3: {
    fontSize: 16,
    fontWeight: "600" as FontWeightType,
  },
  primaryText: {
    fontSize: 14,
  },
  secondaryText: {
    fontSize: 13,
    opacity: 0.7,
  },
  authText: {
    fontSize: 18,
  },
  navLabelText: {
    fontSize: 12,
  },
};
