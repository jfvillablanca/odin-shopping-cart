import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
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
    afterEach(cleanup);

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

    test("clicking shopping bag opens a sidebar", async () => {
        renderWithRouter(<App />);
        const shoppingBagSidebar = await screen.findByRole("complementary", {
            hidden: true,
        });
        const user = userEvent.setup();
        const shoppingBagIcon = screen.getByLabelText("Shopping Bag");
        const checkoutTotal = screen.getByLabelText("Checkout Total");
        const checkoutButton = screen.getByLabelText("Checkout Button");

        await user.click(shoppingBagIcon);

        expect(shoppingBagSidebar).not.toHaveAttribute("hidden", "");
        expect(shoppingBagSidebar).toHaveTextContent(/your bag is empty/i);
        expect(checkoutTotal).toContainHTML("$ 0.00");
        expect(checkoutButton).toHaveAttribute("disabled");
    });

    test.todo("clicking outside closes the shopping bag sidebar", async () => {
        renderWithRouter(<App />);
        const shoppingBagSidebar = await screen.findByRole("complementary", {
            hidden: true,
        });
        const user = userEvent.setup();
        const shoppingBagIcon = screen.getByLabelText("Shopping Bag");

        await user.click(shoppingBagIcon);

        expect(shoppingBagSidebar).toBeInTheDocument();
        expect(shoppingBagSidebar).toHaveAttribute("hidden");
    });
});

describe("Nav tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<Nav handleClick={() => void 0} numOfItemsInBag={0}/>);
    });
});

describe("Home tests", () => {
    test("renders without crashing", () => {
        renderWithRouter(<Home />);
    });
});

describe("Shop tests", () => {
    type ProductData = {
        id: string | number;
        title: string;
        price: string | number;
        description: string;
        images: string[];
    };

    type APIData = {
        id: string | number;
        title: string;
        price: string | number;
        description: string;
        category: unknown;
        images: string[];
    };

    let mockAPIData: APIData[];
    let mockProductData: ProductData[];
    beforeEach(() => {
        mockAPIData = [
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
            {
                id: 2,
                title: "Eloquent Monkey Wrench",
                price: 486,
                description: "Monkey ooh ohh ahh ahh",
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

        mockProductData = Array.isArray(mockAPIData)
            ? mockAPIData.map((product: ProductData) => ({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  images: [...product.images],
              }))
            : [];
    });

    afterEach(cleanup);

    test("renders without crashing", () => {
        (fetch as jest.Mock).mockResolvedValue(createFetchResponse({}));
        act(() => {
            renderWithRouter(
                <Shop productData={[]} handleAddToBag={() => void 0} />
            );
        });
    });

    test("renders a loading indicator if fetch is in progress", () => {
        (fetch as jest.Mock).mockResolvedValue(createFetchResponse({}));
        act(() => {
            renderWithRouter(
                <Shop productData={[]} handleAddToBag={() => void 0} />
            );
        });

        expect(screen.getAllByRole("status")).toHaveLength(16);
    });

    test("renders the product card after receiving data", async () => {
        (fetch as jest.Mock).mockResolvedValue(
            createFetchResponse(mockAPIData.slice(0, 1))
        );
        act(() => {
            renderWithRouter(<App />, { route: "/shop" });
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

    test("every product card has an add to bag button", async () => {
        (fetch as jest.Mock).mockResolvedValue(
            createFetchResponse(mockAPIData)
        );
        act(() => {
            renderWithRouter(<App />, { route: "/shop" });
        });

        const productName1 = mockProductData[0].title;
        const productName2 = mockProductData[1].title;
        const productCards = await screen.findAllByRole("article");
        const addToBag1 = await screen.findByLabelText(
            new RegExp(`add ${productName1} to bag`, "i")
        );
        const addToBag2 = await screen.findByLabelText(
            new RegExp(`add ${productName2} to bag`, "i")
        );

        expect(productCards).toHaveLength(2);
        expect(addToBag1).toBeInTheDocument();
        expect(addToBag1).toHaveAttribute("role", "button");
        expect(addToBag2).toBeInTheDocument();
        expect(addToBag2).toHaveAttribute("role", "button");
    });

    test("adding two products to bag displays correct bag info", async () => {
        (fetch as jest.Mock).mockResolvedValue(
            createFetchResponse(mockAPIData)
        );
        act(() => {
            renderWithRouter(<App />, { route: "/shop" });
        });

        const product1 = mockProductData[0];
        const product2 = mockProductData[1];
        const addToBag1 = await screen.findByLabelText(
            new RegExp(`add ${product1.title} to bag`, "i")
        );
        const addToBag2 = await screen.findByLabelText(
            new RegExp(`add ${product2.title} to bag`, "i")
        );

        const shoppingBagIcon = screen.getByLabelText("Shopping Bag");
        const checkoutTotal = screen.getByLabelText("Checkout Total");

        const user = userEvent.setup();
        await user.click(shoppingBagIcon);
        await user.click(addToBag1);
        await user.click(addToBag2);

        const itemsInBag = await screen.findAllByRole("listitem", {
            name: /bag-item/i,
        });

        expect(itemsInBag).toHaveLength(2);
        itemsInBag.forEach((item, index) => {
            const { title, price } = mockProductData[index];
            const titleElement = item.querySelector(".title");
            const quantityElement = item.querySelector(".quantity");
            const priceElement = item.querySelector(".price");
            const subtotalElement = item.querySelector(".subtotal");

            expect(titleElement).toHaveTextContent(title);
            expect(priceElement).toHaveTextContent(`${price}`);
            expect(quantityElement).toHaveTextContent("1");
            expect(subtotalElement).toHaveTextContent(`${1 * +price}`);
        });
        expect(checkoutTotal).toContainHTML(
            `$ ${(+product1.price + +product2.price).toFixed(2)}`
        );
    });
});
