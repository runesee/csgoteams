import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./app/app";
import { FavoritesProvider } from "./favorites/favorites-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
