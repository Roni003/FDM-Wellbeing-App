const tintColorLight = "#2f95dc";
const tintColorDark = "#3ECF8E";

export default {
  light: {
    text: "#000",
    textSecondary: "#00002A",
    background: "#ffffff",
    innerBackground: "#f2f2f2",
    tint: tintColorLight,
    lowOpacityTint: "rgba(47, 149, 220, 0.85)",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "rgba(210, 210, 210, 0.5)",
    tabBarBackground: "FFFFF",
    borderColor: "rgba(0,0,0,0.2)",
  },
  dark: {
    text: "#E4E6EB",
    textSecondary: "#B0B3B8", // If we need to use later
    background: "#18191A",
    innerBackground: "#242526",
    tint: tintColorDark,
    lowOpacityTint: "rgba(62, 207, 142, 0.75)",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    cardBackground: "#3A3B3C",
    tabBarBackground: "#3A3B3C",
    borderColor: "rgba(250, 250, 250, 0.2)",
  },
};
