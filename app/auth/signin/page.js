import { Suspense } from "react";
import LoginForm from "../../../components/auth/LoginForm";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export const metadata = {
  title: "Login - E-Store",
  description:
    "Sign in to your account to access your orders, wishlist, and personalized recommendations.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <LoginForm />
        </Suspense>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
