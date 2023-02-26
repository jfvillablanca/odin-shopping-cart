import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
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

global.fetch = vi.fn();

function createFetchResponse<T>(data: T) {
    return { json: () => new Promise((resolve) => resolve(data)) };
}

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
        (fetch as jest.Mock).mockResolvedValue(createFetchResponse({}));
        act(() => {
            renderWithRouter(<App />, { route: "/shop" });
        });

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

    test("check if shopping bag is hidden by default", () => {
        renderWithRouter(<App />);
        const shoppingBagSidebar = screen.getByRole("complementary", {
            hidden: true,
        });

        expect(shoppingBagSidebar).toBeInTheDocument();
        expect(shoppingBagSidebar).toHaveAttribute("hidden");
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
    afterEach(cleanup);

    test("renders without crashing", () => {
        (fetch as jest.Mock).mockResolvedValue(createFetchResponse({}));
        act(() => {
            renderWithRouter(<Shop />);
        });
    });

    test("renders a loading indicator if fetch is in progress", () => {
        (fetch as jest.Mock).mockResolvedValue(createFetchResponse({}));
        act(() => {
            renderWithRouter(<Shop />);
        });

        expect(screen.getAllByRole("status")).toHaveLength(16);
    });

    test("renders the product card after receiving data", async () => {
        const mockData = [
            {
                id: 4,
                title: "Handmade Fresh Table",
                price: 687,
                description: "Andy shoes are designed to keeping in...",
                category: {
                    id: 5,
                    name: "Others",
                    image: "https://placeimg.com/640/480/any?r=0.591926261873231",
                },
                images: [
                    "https://placeimg.com/640/480/any?r=0.9178516507833767",
                    "https://placeimg.com/640/480/any?r=0.9300320592588625",
                    "https://placeimg.com/640/480/any?r=0.8807778235430017",
                ],
            },
        ];

        (fetch as jest.Mock).mockResolvedValue(createFetchResponse(mockData));
        act(() => {
            renderWithRouter(<Shop />);
        });

        const productImage = await screen.findByAltText(
            /Andy shoes are designed/i
        );
        const productTitle = await screen.findByRole("heading", {
            name: /handmade fresh table/i,
        });
        const productPrice = await screen.findByText(/687/);
        const productCards = await screen.findAllByRole("article");

        expect(productImage).toBeInTheDocument();
        expect(productTitle).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
        expect(productCards).toHaveLength(1);
    });
});
