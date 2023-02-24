import { render, screen } from "@testing-library/react";
import {
    BrowserRouter,
    createMemoryRouter,
    RouterProvider,
} from "react-router-dom";
import { describe, expect, test } from "vitest";
import createRouterConfig from "../routerConfig";
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
        const router = createMemoryRouter(createRouterConfig(), {
            initialEntries: ["/"],
        });
        render(<RouterProvider router={router} />);

        expect(
            screen.getByRole("heading", { name: /you are home/i })
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
        render(<Home />);
    });
});

describe("Shop tests", () => {
    test("renders without crashing", () => {
        render(<Shop />);
    });
});
