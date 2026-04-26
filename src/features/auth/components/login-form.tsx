import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { wallet, client } from "@/lib/thirdweb";
import { toast } from "sonner";
import { preAuthenticate } from "thirdweb/wallets";
import { Controller, useForm } from "react-hook-form";
import { emailSchema, loginDefaultValues, type LoginInput } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useConnect } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";

const LoginForm = () => {
  const { connect, isConnecting, cancelConnection } = useConnect();
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [invalidOtp, setInvalidOtp] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(emailSchema),
    defaultValues: loginDefaultValues,
  });

  async function handleSendEmail(data: LoginInput) {
    setIsSending(true);
    try {
      const result = await preAuthenticate({ client, strategy: "email", email: data.email });
      if (result != null) setOpen(true);
    } catch (e) {
      console.error(e);
      form.setError("email", { message: "Không thể gửi mã OTP. Vui lòng thử lại." });
    } finally {
      setIsSending(false);
    }
  }

  async function onSubmitOTP(otp: string) {
    try {
      await connect(async () => {
        try {
          await wallet.connect({
            client,
            strategy: "email",
            email: form.getValues("email"),
            verificationCode: otp,
            chain: baseSepolia,
          });

          setInvalidOtp(false);
          toast.success("Đăng nhập thành công!");
          setOpen(false);
          form.reset();
        } catch (e) {
          console.error(e);
          setInvalidOtp(true);
        }
        return wallet;
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (otp.length < 6) {
      setInvalidOtp(false);
    }
  }, [otp]);

  return (
    <form onSubmit={form.handleSubmit(handleSendEmail)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input {...field} placeholder="Địa chỉ email" aria-invalid={fieldState.invalid} type="email" autoComplete="off" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={isSending}>
          {isSending ? <Spinner /> : ""} Gửi mã OTP
        </Button>
      </FieldGroup>

      <AlertDialog open={open} onOpenChange={setOpen} defaultOpen={true}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác minh email</AlertDialogTitle>
            <AlertDialogDescription>{`Chúng tôi đã gửi mã xác minh đến ${form.getValues("email")}. Vui lòng nhập mã để tiếp tục.`}</AlertDialogDescription>
          </AlertDialogHeader>

          <Field>
            <FieldLabel htmlFor="digits-only">Nhập mã OTP</FieldLabel>
            <InputOTP
              id="digits-only"
              maxLength={6}
              pattern={"^\\d+$"}
              containerClassName="flex justify-between gap-2"
              value={otp}
              onChange={setOtp}
              spellCheck={true}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} aria-invalid={invalidOtp} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={1} aria-invalid={invalidOtp} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={2} aria-invalid={invalidOtp} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={3} aria-invalid={invalidOtp} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={4} aria-invalid={invalidOtp} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot index={5} aria-invalid={invalidOtp} />
              </InputOTPGroup>
            </InputOTP>
          </Field>

          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                cancelConnection();
                setOpen(false);
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={() => {
                onSubmitOTP(otp);
              }}
              disabled={otp.length !== 6 || isConnecting}
            >
              {isConnecting ? <Spinner /> : ""} Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default LoginForm;
