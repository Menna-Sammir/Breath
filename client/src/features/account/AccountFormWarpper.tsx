import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Resolver,
} from "react-hook-form";

type Props<TFormData extends FieldValues> = {

  onSubmit: (data: TFormData) => Promise<void>;
  children: ReactNode;
  title: string;
  submitButtonText: string;
  resolver?: Resolver<TFormData>;
  reset?: boolean;
};

export default function AccountFormWrapper<TFormData extends FieldValues>({
  onSubmit,
  children,
  submitButtonText,
  resolver,
  title,
  reset,
}: Props<TFormData>) {
  const methods = useForm<TFormData>({ resolver, mode: "onTouched" });

  const formSubmit = async (data: TFormData) => {
    await onSubmit(data);
    if (reset) methods.reset();
  };

  return (
    <FormProvider {...methods}>
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
          onSubmit={methods.handleSubmit(formSubmit)}
          className="flex flex-col px-6 py-2 gap-4 max-w-md mx-auto rounded-2xl bg-white"
        >

          <h2 className="text-2xl italic text-foreground text-center">{title}</h2>

          {children}
          <button
            type="submit"
            disabled={
              !methods.formState.isValid || methods.formState.isSubmitting
            }
            className="w-full rounded-lg py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
