import { createContext, useContext } from "react";

export const context = createContext(undefined);
export function usePortfolio() {
  const portfolioContext = useContext(context);
  if (context === undefined) {
    throw new Error(" must be within provider");
  }
  return portfolioContext;
}
