import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { ArrowLeft } from "lucide-react";
import { Button } from "./components/ui/button";
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 flex flex-col w-full h-screen items-center mx-auto space-y-4 justify-center bg-gradient-to-r from-zinc-100 to-zinc-200">
      {/* <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )} */}
      <div className="h-auto w-80 bg-white shadow-sm rounded-xl p-2 border border-slate-200 -mt-40">
        <img
          src="/carousel/Adjat (11 of 16).jpg"
          className="w-full h-72 object-cover rounded-md bg-center"
        />
        <div className="p-2 ml-2 mt-1">
          <h1 className="text-xl text-red-500 font-bold">{message}</h1>
          <p className="text-base mt-1 text-muted-foreground">{details}</p>
        </div>
        <Link to="/" className="mr-4 mt-3 flex justify-end space-x-2 mb-3">
          <Button
            variant="ghost"
            className="p-2 shadow-lg border border-slate-200 text-secondary-foreground/80"
          >
            <ArrowLeft className="w-6 h-6" /> Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
