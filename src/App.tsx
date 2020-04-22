import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from "@material-ui/core/styles";
import './App.css';
import {Box, CssBaseline} from "@material-ui/core";
import {APP_PATH_LandingPage, APP_PATH_STATISTICS, FORBIDDEN_URL} from "./resources/AppConstants";
import Forbidden from "./error/Forbidden";
import NotFound from "./error/NotFound";
import Statistics from "./Statistics";
import LandingPage from "./LandingPage";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import TabBar from "./ui/Tabs";

function App() {
    let theme = createMuiTheme({
        palette: {
            type: false ? 'dark' : 'light', // mediaquery on dark theme
            // primary: {main: blue[500]},
            // secondary: red,
        },
    });
    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box display={"flex"} flexDirection={"column"} className={"AppBox"}>
                <Header/>
                <Box display={"flex"} flexDirection={"column"} className="AppContent">
                    <TabBar/>
                    <Switch>
                        <Route path={`${APP_PATH_STATISTICS}/:battleTag`} component={Statistics}/>
                        <Route path={FORBIDDEN_URL} component={Forbidden}/>
                        <Route path={APP_PATH_LandingPage} render={() => <LandingPage/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Box>
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}

export default withRouter(App);
