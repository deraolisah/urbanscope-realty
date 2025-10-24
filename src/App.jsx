// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import PropertyProvider from "./contexts/PropertyContext";
import AuthProvider from "./contexts/AuthContext";
import FavoritesProvider from "./contexts/FavoritesContext";
import { PreloaderProvider } from './contexts/PreloaderContext';
import PreloaderWrapper from './layouts/PreloaderWrapper';

function App() {
  return (
    <PreloaderProvider>
      <PropertyProvider>
        <AuthProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <PreloaderWrapper>
                <AppRoutes />
              </PreloaderWrapper>
            </BrowserRouter>
          </FavoritesProvider>
        </AuthProvider>
      </PropertyProvider>
    </PreloaderProvider>
  );
}  

export default App;