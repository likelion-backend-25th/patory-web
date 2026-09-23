import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { RootLayout } from "@/layouts/RootLayout";
import { FeedPage } from "@/pages/FeedPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PostDetailPage } from "@/pages/PostDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <FeedPage /> },
      { path: "feed", element: <Navigate to="/" replace /> },
      { path: "login", element: <Navigate to="/" replace /> },
      { path: "posts/:postId", element: <PostDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
