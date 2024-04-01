const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    innerBackground: "lightgray", // temporary, change value later, use this for inner container backgrounds
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "wheat", //temporary, change value later , Use this for the background of cards like forum posts
  },
  dark: {
    text: "#fff",
    background: "#18191A",
    innerBackground: "#242526",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    cardBackground: "#3A3B3C",
  },
  tabColors: {
    dark: "lightgray",
    light: "fff",
  },
};
