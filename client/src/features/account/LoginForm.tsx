import { useAccount } from "../../lib/hooks/useAccounts";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { Link, LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutate(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        mx: "auto",
        borderRadius: 3,
        maxWidth: "md",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>

        <TextInput
          label="Email"
          type="email"
          control={control}
          name="email"
          fullWidth
        />

        <TextInput
          label="Password"
          type="password"
          control={control}
          name="password"
          fullWidth
        />

        <Box mt={2}>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            size="large"
            variant="contained"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Don't have an account? <Link href="/register">Sign up</Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
