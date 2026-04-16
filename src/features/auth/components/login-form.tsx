import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../schemas/login.schema";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Facebook, Google, Magic } from "@thesvg/react";

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onBlur: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Dữ liệu chuẩn bị gửi đi:", value);
    },
  });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <Button variant={"outline"} type="button">
          <Google />
          Login via Google
        </Button>
        <Button variant={"outline"} type="button">
          <Facebook />
          Login via Facebook
        </Button>
        <FieldSeparator>Or</FieldSeparator>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter a valid email address"
                  autoComplete="email"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            );
          }}
        />
        <Button className="w-full">
          <Magic />
          Login via Magic
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;