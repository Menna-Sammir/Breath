import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccounts";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [notVerified, setNotVerified] = useState(false);
  const { loginUser, resendConfirmationEmail } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });
  const email = watch("email");

  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail.mutateAsync({ email });
      setNotVerified(false);
    } catch (error) {
      console.log(error);
      toast.error("Problem sending email - please check email address");
    }
  };

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
      onError: (error) => {
        setNotVerified(true);
      },
    });
  };

  // const loginWithGithub = () => {
  //   const clientId = import.meta.env.VITE_GIHUB_CLIENT_ID;
  //   const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
  //   window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirectUri=${redirectUrl}&scope=read:user user:email`;
  // };

  return (
    <>
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
            Login
          </button>
          {/* <Button
        onClick={loginWithGithub}
        startIcon={<GitHub />}
        sx={{ backgroundColor: "black" }}
        type="button"
        variant="contained"
        size="large"
      >
        Login with Github
      </Button> */}
          {notVerified ? (
            <div className="flex flex-col items-center text-center mt-2">
              <p className="text-sm text-red-600">
                Your email has not been verified. You can click the button to
                re-send the verification email
              </p>
              <button
                type="button"
                disabled={resendConfirmationEmail.isPending}
                onClick={handleResendEmail}
                className="mt-2 text-sm text-indigo-600 hover:underline disabled:opacity-50"
              >
                Re-send email link
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm mt-2">
              <p>
                Forgot password? Click{" "}
                <Link to="/forgot-password" className="text-indigo-600">
                  here
                </Link>
              </p>

              <p className="text-center">
                Don't have an account?
                <Link to="/register" className="ml-2 text-indigo-600">
                  Sign up
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
