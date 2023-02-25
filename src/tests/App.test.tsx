import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../routes/App";
import Home from "../routes/Home";
import Nav from "../routes/Nav";
import Shop from "../routes/Shop";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    };
};

describe("App tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<App />);
    });

    test("renders home page by default", () => {
        renderWithRouter(<App />);

        expect(
            screen.getByRole("heading", { name: /you are home/i })
        ).toBeInTheDocument();
    });

    test("navigates to home page when Home link is clicked", async () => {
        renderWithRouter(<App />, { route: "/shop" });

        const user = userEvent.setup();
        const linkToHome = screen.getByRole("link", { name: /home/i });
        await user.click(linkToHome);

        expect(
            screen.getByRole("heading", { name: /you are home/i })
        ).toBeInTheDocument();
    });

    test("navigates to shop page when Shop link is clicked", async () => {
        renderWithRouter(<App />, { route: "/" });

        const user = userEvent.setup();
        const linkToShop = screen.getByRole("link", { name: /shop/i });
        await user.click(linkToShop);

        expect(
            screen.getByRole("heading", { name: /browse our catalog/i })
        ).toBeInTheDocument();
    });

    test("navigates to a 404 page on a bad route", () => {
        renderWithRouter(<App />, { route: "/non-existent-page" });

        expect(
            screen.getByRole("heading", { name: /404: page not found/i })
        ).toBeInTheDocument();
    });
});

describe("Nav tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<Nav />);
    });
});

describe("Home tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<Home />);
    });
});

describe("Shop tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<Shop />);
    });
});
