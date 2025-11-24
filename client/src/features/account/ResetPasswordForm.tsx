import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccounts";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../lib/schemas/resetPasswordSchema";
import AccountFormWrapper from "./AccountFormWarpper";

export default function ResetPasswordForm() {
  const [params] = useSearchParams();
  const { resetPassword } = useAccount();
  const navigate = useNavigate();

  const email = params.get("email");
  const code = params.get("code");

  if (!email || !code) return <h3>Invalid reset password code</h3>;

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await resetPassword.mutateAsync(
        { email, resetCode: code, newPassword: data.newPassword },
        {
          onSuccess: () => {
            toast.success("Password reset successfully - you can now sign in");
            navigate("/login");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AccountFormWrapper<ResetPasswordSchema>
      title="Reset your password"
      submitButtonText="Reset password"
      onSubmit={onSubmit}
      resolver={zodResolver(resetPasswordSchema)}
    >
      <TextInput label="New password" type="password" name="newPassword" />
      <TextInput
        label="Confirm password"
        type="password"
        name="confirmPassword"
      />
    </AccountFormWrapper>
  );
}
