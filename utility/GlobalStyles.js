const lineHeightMultiplicator = 1.375;

export const globalStyles = {
  fontSizes: {
    xxs: "0.6666666667rem",
    xs: "0.7777777777778rem",
    sm: "0.875rem" /* 14px */,
    s: "0.88888888888889rem",
    m: "1rem" /* 16px */,
    ml: "1.125rem" /* 18px */,
    l: "1.25rem" /* 20px */,
    xl: "1.388889rem",
    xxl: "2rem",
    xxxl: "2.77778rem",
    xxxxl: "7rem"
  },

  lineHeights: {
    xxs: 0.6666666667 * lineHeightMultiplicator + "rem",
    xs: 0.7777777777778 * lineHeightMultiplicator + "rem",
    s: 0.88888888888889 * lineHeightMultiplicator + "rem",
    m: 1 * lineHeightMultiplicator + "rem",
    l: 1 * lineHeightMultiplicator + "rem",
    xl: 1.388889 * lineHeightMultiplicator + "rem",
    xxl: 2 * lineHeightMultiplicator * 2 + "rem",
    xxxl: 2.77778 * lineHeightMultiplicator * 2 + "rem",
    xxxxl: 7 * lineHeightMultiplicator * 2 + "rem"
  },

  colors: {
    vomo_green: "#6bcb97",
    vomo_black: "#414042",
    vomo_dkblack: "#333333",
    vomo_light_bg: "#EDF0F4",
    vomo_blue: "#1a287f",
    vomo_ltblue: "#2c3e93",
    vomo_blgrey: "#5c666f",
    vomo_grey: "#b7bfc5",
    vomo_ltgrey: "#c9c9c9",
    vomo_white: "#fff",
    vomo_red: "indianred"
  },

  pages: {
    header: {
      header_height: "90px"
    }
  }
};
