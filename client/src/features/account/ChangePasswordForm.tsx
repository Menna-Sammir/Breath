import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "../../lib/schemas/changePasswordSchema";
import AccountFormWrapper from "./AccountFormWarpper";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { useAccount } from "../../lib/hooks/useAccounts";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
  const { changePassword } = useAccount();

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      await changePassword.mutateAsync(data, {
        onSuccess: () => {
          toast.success("Password changed successfully");
        }
      });
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <AccountFormWrapper<ChangePasswordSchema>
      title="Change Password"
      onSubmit={onSubmit}
      submitButtonText="Update Password"
      resolver={zodResolver(changePasswordSchema)}
      reset={true}
    >
      <TextInput
        name="currentPassword"
        label="Current Password"
        type="password"
        placeholder="Enter your current password"
      />
      <TextInput
        name="newPassword"
        label="New Password"
        type="password"
        placeholder="Enter your new password"
      />
      <TextInput
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
        placeholder="Confirm your new password"
      />
    </AccountFormWrapper>
  );
}
