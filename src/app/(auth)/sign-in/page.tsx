"use client";
import { signIn, useSession } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SignInPage = () => {
  const session = useSession();
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userSignData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await signIn.email({
      email: userSignData.email,
      password: userSignData.password,
    });

    if (data) {
      toast.success(`${data?.user.name}, successfully sing-in`, {
        icon: "😃",
        duration: 4000,
      });
      router.push("/");
    }else{
        toast.error(`Something went wrong. Please try again`);
        console.log(error);
        return;
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Get started by creating your account today.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            {/* Name */}
            <TextField
              isRequired
              name="name"
              type="text"
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-semibold text-slate-700">
                Full name
              </Label>

              <Input
                placeholder={session?.data?.user?.name}
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-2"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700">
                Email address
              </Label>

              <Input
                placeholder="john@example.com"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              className="flex flex-col gap-2"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700">
                Password
              </Label>

              <Input
                placeholder="Enter your password"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10"
              />

              <Description className="text-xs leading-5 text-slate-500">
                Use at least 8 characters, 1 uppercase letter, and 1 number.
              </Description>

              <FieldError className="text-sm text-red-500" />
            </TextField>

            {/* Buttons */}
            <div className="mt-1 flex w-full flex-col gap-3">
              <Button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99]"
              >
                Create account
              </Button>

              <Button
                type="reset"
                variant="secondary"
                className="flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Simple, secure, and ready to get started.
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
