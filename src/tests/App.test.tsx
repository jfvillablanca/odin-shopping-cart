import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import App from "../routes/App";
import Home from "../routes/Home";
import Nav from "../routes/Nav";
import Shop from "../routes/Shop";

describe("App tests", () => {
    test("renders without crashing", () => {
        render(<App />);
    });

    });
});

describe("Nav tests", () => {
    test("renders without crashing", () => {
        render(<Nav />);
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
