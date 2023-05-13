import { ModalProvider } from "@peersyst/react-components";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { config } from "common/config";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "../common/components/navigation/Header/Header";
import Footer from "../common/components/navigation/Footer/Footer";
import { useCounterRoutes } from "ui/counter/router/CounterRouter";

const Routes = () => {
    const dashboardRoutes = useCounterRoutes();

    return useRoutes([...dashboardRoutes]);
};

const Router = (): JSX.Element => {
    return (
        <BrowserRouter basename={config.publicUrl}>
            <ModalProvider>
                <ScrollToTop />
                <Header />
                <Routes />
                <Footer />
            </ModalProvider>
        </BrowserRouter>
    );
};

export default Router;
