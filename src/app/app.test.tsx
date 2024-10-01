import { describe, expect, test } from "vitest";
import { App } from "./app";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "../favorites/favorites-provider";

describe("Snapshot test", () => {
  test("Test whether app matches snapshot", () => {
    const app = render(
      <QueryClientProvider client={new QueryClient()}>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </QueryClientProvider>
    );
    expect(app).toMatchSnapshot();
  });
});
