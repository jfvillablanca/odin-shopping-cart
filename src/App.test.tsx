import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import Nav from "./Nav";

describe("Nav tests", () => {
    test("renders without crashing", () => {
        render(<Nav />);
    });
});
