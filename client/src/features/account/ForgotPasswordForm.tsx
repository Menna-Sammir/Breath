import { useAccount } from "../../lib/hooks/useAccounts";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AccountFormWrapper from "./AccountFormWarpper";
import TextInput from "../../app/shared/components/TextInput";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAccount();
  const navigate = useNavigate();

  const onsubmit = async () => {
    const email = (document.getElementById("email") as HTMLInputElement | null)?.value;
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    await forgotPassword.mutateAsync(email, {
      onSuccess: () => {
        toast.success("Password reset email sent. Please check your inbox.");
        navigate("/login");
      },
    });
  };

  return (
    <AccountFormWrapper
      title="Forgot Password"
      submitButtonText="Send Reset Email"
      onSubmit={onsubmit}
    >
      <TextInput label="Email" type="email" id="email" name="email" required />
    </AccountFormWrapper>
  );
}
