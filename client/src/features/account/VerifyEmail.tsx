import { useEffect, useRef, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccounts"
import { Link, useSearchParams } from "react-router";

export default function VerifyEmail() {
    const { verifyEmail, resendConfirmationEmail } = useAccount();
    const [status, setStatus] = useState('verifying');
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');
    const hasRun = useRef(false);

    useEffect(() => {
        if (code && userId && !hasRun.current) {
            hasRun.current = true;
            verifyEmail.mutateAsync({ userId, code })
                .then(() => setStatus('verified'))
                .catch(() => setStatus('failed'))
        }
    }, [code, userId, verifyEmail])

    if (!verifyEmail || !resendConfirmationEmail) {
        return <p>Account service not available</p>;
    }

    const getBody = () => {
        switch (status) {
            case 'verifying':
                return <p>Verifying...</p>
            case 'failed':
                return (
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <p className="text-center">
                            Verification failed. You can try resending the verify link to your email.
                        </p>
                        <button
                            onClick={() => resendConfirmationEmail.mutate({ userId })}
                            disabled={resendConfirmationEmail.isPending}
                            className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Resend verification email
                        </button>
                    </div>
                );
            case 'verified':
                return (
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <p>
                            Email has been verified - you can now login
                        </p>
                        <Link to="/login" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                            Go to login
                        </Link>
                    </div>
                );
        }
    }
    return (
        <div className="flex flex-col items-center justify-center p-8 h-[400px] bg-white rounded-lg shadow-sm">
            <svg className="w-24 h-24 text-indigo-600 mb-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8.5L12 13L4 8.5V6L12 10.5L20 6V8.5Z" />
            </svg>

            <h2 className="text-2xl font-semibold mb-2">Email verification</h2>
            <hr className="w-full mb-4" />
            {getBody()}
        </div>
    )
}