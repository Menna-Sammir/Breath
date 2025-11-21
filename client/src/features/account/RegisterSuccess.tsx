import { useAccount } from "../../lib/hooks/useAccounts";
import { CheckCircle } from "lucide-react";

type Props = {
    email?: string;
}

export default function RegisterSuccess({email}: Props) {
    const {resendConfirmationEmail} = useAccount();

    if (!email) return null;

    return (
        <div className="h-[400px] flex flex-col justify-center items-center p-6 bg-white rounded-2xl">
            <CheckCircle className="text-indigo-600 mb-4" size={96} />
            <h3 className="text-2xl font-semibold mb-2">You have successfully registered!</h3>
            <p className="text-lg mb-4">Please check your email to confirm your account</p>
            <button
                className="w-full max-w-sm bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => resendConfirmationEmail.mutate(email)}
            >
                Re-send confirmation email
            </button>
        </div>
    )
}
