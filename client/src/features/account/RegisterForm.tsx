import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccounts";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { useState } from "react";
import RegisterSuccess from "./RegisterSuccess";

export default function RegisterForm() {
  const { registerUser } = useAccount();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });
  const email = watch("email");

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onSuccess: () => setRegisterSuccess(true),
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("Email")) setError("email", { message: err });
            else if (err.includes("Password"))
              setError("password", { message: err });
          });
        }
      },
    });
  };

  return (
    <>
      {registerSuccess ? (
        <RegisterSuccess email={email} />
      ) : (
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-1 text-foreground">
              Let's start planning
            </h1>
            <p
              className="text-2xl md:text-5xl italic text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              your next journey
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-6 gap-4 max-w-md mx-auto rounded-2xl bg-white"
          >
            <TextInput label="Email" control={control} name="email" />
            <TextInput
              label="Display name"
              control={control}
              name="displayName"
            />
            <TextInput
              label="Password"
              type="password"
              control={control}
              name="password"
            />
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full rounded-lg py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Register
            </button>

            <div className="text-center text-sm">
              <span>Already have an account?</span>
              <Link to="/login" className="ml-2 text-indigo-600">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
