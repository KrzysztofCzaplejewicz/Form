import * as React from "react";
import {FormControl, InputLabel, Input, Grid, MuiThemeProvider, createMuiTheme,} from "@material-ui/core";
import {green, purple} from "@material-ui/core/colors";
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    overrides: {
        MuiInput: {
            root: {
                borderRadius: 2,
                border: '1px solid #D1D1D1',
                padding: '0px 10px',
                width: 'calc(100% - 24px)',
                '&:focus': {
                    borderColor: '#80bdff',
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                },
                color: "#000000",
                fontWeight: 400,
                fontFamily: "Roboto",
                fontSize: "1rem"
            },
            input: {
                WebkitTextFillColor: "#000000 !important"
            },
            underline: {
                '&:before': {
                    borderBottom: "none"
                }
            }

        },

        MuiFormHelperText: {
            root: {
                fontFamily: "Roboto",
                fontWeight: 500,
                right: 0,
                fontSize: "1rem",
                marginTop: 3,
                position: "absolute"
            },
        },

        MuiFormLabel: {
            root: {
                fontFamily: "Roboto",
                color: "#000000",
                fontWeight: 500,
                fontSize: "1rem"
            }
        },

        MuiFormControl: {
            root: {
                flexDirection: "row"
            }
        },
    }
});

const MaterialInput = ({name, label, error, ...rest}) => {
    return (
        <Grid>
            <MuiThemeProvider theme={theme}>
            <FormControl margin='normal'>
                <InputLabel shrink={true} htmlFor={name}>{label}</InputLabel>
                <Input
                    {...rest}
                    id={name}
                    name={name}
                    fullWidth={true}
                />
            </FormControl>
            {error && <div className="alert alert-danger">{error}</div>}
            </MuiThemeProvider>
        </Grid>
    );
};
export default (MaterialInput);