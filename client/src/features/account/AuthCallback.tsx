import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "../../lib/hooks/useAccounts";
import { Github, LoaderCircle } from "lucide-react";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchGithubToken } = useAccount();
  const code = params.get("code");
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (!code || fetched.current) return;
    fetched.current = true;

    fetchGithubToken
      .mutateAsync(code)
      .then(() => navigate("/activities"))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [code, fetchGithubToken, navigate]);

  if (!code)
    return <p className="text-red-600">Problem authenticating with GitHub</p>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center h-96 gap-4">
      <div className="flex items-center gap-3">
        <Github />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Logging in with GitHub
        </h2>
      </div>
      {loading ? (
        <LoaderCircle className="animate-spin text-blue-500" />
      ) : (
        <p className="text-red-600">Problem signing in with GitHub</p>
      )}
    </div>
  );
}
