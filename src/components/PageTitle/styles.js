import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    pageTitleContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(5),
    },
    typo: {
        color: theme.palette.text.secondary,
    },
    button: {
        boxShadow: theme.customShadows.widget,
        textTransform: "none",
        "&:active": {
            boxShadow: theme.customShadows.widgetWide,
        },
    },
}));