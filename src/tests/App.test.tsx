import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import Home from "../routes/Home";
import Nav from "../routes/Nav";
import Shop from "../routes/Shop";

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
