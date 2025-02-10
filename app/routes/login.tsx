import { data, Link, redirect, useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getSession, commitSession } from "~/utils/session";
import type { Route } from "./+types/login";
import { validateCredentials } from "~/models/post.server";
import InactivityTimer from "./useAutoReload";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/posts/new");
  }

  const data = { error: session.get("error") };

  return new Response(JSON.stringify(data), {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let form = await request.formData();
  let username = form.get("username")?.toString();
  let password = form.get("password")?.toString();

  const errors: {
    username?: string;
    password?: string;
    general?: string;
  } = {};

  if (!username || username.length < 3) {
    errors.username = "Username masih kosong";
  }

  if (!password || password.length < 3) {
    errors.password = "Password masih kosong";
  }

  const userId = await validateCredentials(username!, password!);

  if (!userId) {
    errors.general = "Username atau Password yang anda masukkan salah";
  }

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }

  if (userId) {
    session.set("userId", userId.id.toString());
  }

  // Login succeeded, send them to the home page.
  return redirect("/posts/new", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let errors = fetcher.data?.errors;

  return (
    <>
      <InactivityTimer timeout={120000} />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10  bg-gradient-to-b from-green-200 to-green-100">
        <div className="w-full max-w-sm shadow-lg">
          <div className={"flex flex-col gap-6"}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your Username below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {errors?.general ? (
                  <em className="text-red-500 text-sm">{errors.general}</em>
                ) : null}
                <fetcher.Form method="post">
                  <div className="flex flex-col gap-6 mt-2">
                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="username"
                        required
                      />
                      {errors?.username ? (
                        <em className="text-red-500 text-sm">
                          {errors.username}
                        </em>
                      ) : null}
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                      />
                      {errors?.password ? (
                        <em className="text-red-500 text-sm">
                          {errors.password}
                        </em>
                      ) : null}
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                  <div className="mt-6 text-center text-sm">
                    Go to{" "}
                    <Link
                      to="/"
                      className="text-primary underline underline-offset-4 hover:text-secondary-foreground"
                    >
                      Home
                    </Link>{" "}
                    Masjid Riyaadhush Shaalihaat
                  </div>
                </fetcher.Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
