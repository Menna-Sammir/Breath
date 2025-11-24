import { useAccount } from "../../lib/hooks/useAccounts";
import { data, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AccountFormWrapper from "./AccountFormWarpper";
import TextInput from "../../app/shared/components/TextInput";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAccount();
  const navigate = useNavigate();

  const onsubmit = async () => {
    await forgotPassword.mutateAsync(data.email, {
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
