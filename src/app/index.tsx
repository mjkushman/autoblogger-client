import { AppProvider } from "./provider";
import { AppRouter } from "./router";
import {useState, useEffect} from 'react'

export const App = () => {

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
