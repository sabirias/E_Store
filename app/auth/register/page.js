import { Suspense } from "react";
import RegisterForm from "../../../components/auth/RegisterForm";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

export const metadata = {
  title: "Register - E-Store",
  description:
    "Create a new account to start shopping and get access to exclusive offers.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us and start your shopping journey
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <RegisterForm />
        </Suspense>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
