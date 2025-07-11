import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter, Link, Route, Routes } from "react-router"
import SearchPage from "./pages/SearchPage.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import DetailsCardDispatcher from "./components/cards/DetailsCardDispatcher.tsx"
import { LoginPage } from "./pages/loginPage.tsx"
import { ProtectedRoute } from "./components/ProtectedRoute.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

export function NotFound() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen ">
      <h1 className="font-bold text-2xl">404 - Page not found</h1>
      <p>This page does not exists.</p>
      <Link to={"/"} className="p-4 bg-blue-400 rounded-2xl w-fit">
        Back to homepage
      </Link>
    </div>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/search/:category/:id"
                element={<DetailsCardDispatcher />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
