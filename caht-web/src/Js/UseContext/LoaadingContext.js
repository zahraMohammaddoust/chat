import { createContext, useContext, useState } from "react";
const IsLoadingStateContext = createContext();
const IsLoadingSetStateContext = createContext();
export function LoaadingContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <IsLoadingStateContext.Provider value={isLoading}>
      <IsLoadingSetStateContext.Provider value={setIsLoading}>
       {children}ّ
      </IsLoadingSetStateContext.Provider>
    </IsLoadingStateContext.Provider>
  );
}
export function useIsLoading() {
  return useContext(IsLoadingStateContext);
}
export function useSetIsLoading() {
  return useContext(IsLoadingSetStateContext);
}
