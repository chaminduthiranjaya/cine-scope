"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { setInitialWatchList, WatchListState } from "@/store/watchListSlice";

const WATCHLIST_STORAGE_KEY = "cinescope:watchlist";

// Small helper component that runs once on client to sync Redux <-> localStorage
function WatchlistPersistence() {
  useEffect(() => {
    // On mount: hydrate from localStorage if available
    try {
      const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WatchListState;
        if (parsed && parsed.items && typeof parsed.items === "object") {
          store.dispatch(setInitialWatchList(parsed.items));
        }
      }
    } catch (err) {
      // Ignore malformed JSON or access errors
      console.error("Failed to load watchlist from localStorage ", err);
    }

    // Subscribe to store changes and persist watchlist
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const snapshot: WatchListState = {
        items: state.watchList.items,
      };

      try {
        window.localStorage.setItem(
          WATCHLIST_STORAGE_KEY,
          JSON.stringify(snapshot)
        );
      } catch (err) {
        console.error("Failed to save watchlist to localStorage ", err);
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <WatchlistPersistence />
      {children}
    </Provider>
  );
}