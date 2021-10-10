export const COLORS = {
    // colors
    black: "#343A40",
    white: "#FFFFFF",
    grey: "#EEEEEE",
    links: "#0066FF",
    blackWallpaper: "0066FF",
    red: "#FF5959",
    green: "#28FFBF",
};

export const SIZES = {
    // global sizes
    marginHorizontal: 20,
    radiusTopButtons: 8,
    radiusBottomButtonsAndInputs: 10,
    radiusPageAndBlocks: 30,
    radiusReminders: 17,

    // font sizes
    largeTitle: 55,
    title: 33,
    commonTitle: 26,
    regular: 18,
    medium: 16,
    text: 14,
    light: 12,
}

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, color: COLORS.white },
    h1: { fontSize: SIZES.title, color: COLORS.white },
    h2: { fontSize: SIZES.medium, color: COLORS.white },
    h3: { fontSize: SIZES.regular, color: COLORS.white },
    h4: { fontSize: SIZES.light, color: COLORS.white },
    p: { fontSize: SIZES.text, color: COLORS.white },
    pReminderTitle: { fontSize: 16, color: COLORS.white },
    pReminderText: { fontSize: 14, color: COLORS.white },
    buttons: { fontSize: SIZES.regular, color: COLORS.white },
    menu: { fontSize: SIZES.medium, color: COLORS.white },
    commonTitle: { fontSize: SIZES.commonTitle, color: COLORS.white },
    dateFromAgenda: { fontSize: 40, color: COLORS.white }
}

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;