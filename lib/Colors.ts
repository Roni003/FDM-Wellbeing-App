const tintColorLight = "#2f95dc"; // IOS blue?
const lowOpacityTintLight = "rgba(47, 149, 220, 0.85)";

const tintColorDark = "#3ECF8E"; //Supabase green
const lowOpacityTintDark = "rgba(62, 207, 142, 0.75)";

const fdmGreen = "#C5FF00"; //FDM theme green ( button, text)
const fdmHighlight = "#A7D900"; // FDM highlight, tint

export default {
  light: {
    text: "#000",
    textSecondary: "#00002A",
    background: "#ffffff",
    innerBackground: "#f2f2f2",
    tint: tintColorLight,
    lowOpacityTint: lowOpacityTintLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    cardBackground: "rgba(210, 210, 210, 0.5)",
    tabBarBackground: "FFFFF",
    borderColor: "rgba(0,0,0,0.2)",
  },
  dark: {
    text: "#E4E6EB",
    textSecondary: "#B0B3B8",
    background: "#1E1E1E",
    innerBackground: "#242526",
    tint: fdmGreen,
    lowOpacityTint: lowOpacityTintDark,
    tabIconDefault: "#ccc",
    tabIconSelected: fdmHighlight,
    //cardBackground: "#3A3B3C", // roni
    cardBackground: "rgba(255, 255, 255, 0.08)", // FDM
    tabBarBackground: "#3A3B3C",
    borderColor: "rgba(250, 250, 250, 0.2)",
  },
};
