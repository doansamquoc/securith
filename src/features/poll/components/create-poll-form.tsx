import { Button } from "@/components/ui/button";
import { createPollSchema, defaultValues, type CreatePollInput } from "../schemas/create-poll.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreatePoll } from "../hooks/use-create-poll";
import BasicInfoSection from "./basic-info-section";
import OptionSection from "./option-section";
import SettingSection from "./setting-section";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link, useNavigate } from "react-router-dom";

export function CreatePollForm() {
  const navigate = useNavigate();
  const form = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: defaultValues,
  });

  const { execute } = useCreatePoll();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pendingData, setPendingData] = useState<CreatePollInput | null>(null);
  const [createdPollId, setCreatedPollId] = useState<string | null>(null);

  const onSubmit = (data: CreatePollInput) => {
    setPendingData(data);
    setDialogState("idle");
    setDialogOpen(true);
  };

  const handleConfirmCreate = async () => {
    if (!pendingData) return;

    setDialogState("loading");
    try {
      const pollId = await execute(pendingData);
      if (pollId) {
        setCreatedPollId(pollId);
        setDialogState("success");
        form.reset();
      } else {
        setDialogState("error");
        toast.error("Đã xảy ra lỗi khi tạo bầu chọn. Vui lòng thử lại.");
      }
    } catch (err: any) {
      console.error(err);
      setDialogState("error");
      setDialogOpen(false); // Close dialog on validation error from contract to show form errors

      const code = err.message || "";
      if (code.includes("PollMustStartInTheFuture")) {
        form.setError("startsAt", { message: "Thời gian bắt đầu không được ở quá khứ" });
        return;
      }

      toast.error("Đã xảy ra lỗi khi tạo bầu chọn. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoSection control={form.control} />
        <OptionSection control={form.control} />
        <SettingSection form={form} />
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard">Hủy bỏ</Link>
          </Button>
          <Button variant="outline" type="button" className="mr-auto" onClick={() => form.reset()}>
            Làm mới
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Tạo bầu chọn
          </Button>
        </div>
      </form>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (dialogState === "loading") return;
          setDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận tạo cuộc bình chọn</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogState === "loading"
                ? "Đang đẩy dữ liệu cuộc bình chọn của bạn lên blockchain..."
                : dialogState === "success"
                  ? "Cuộc bình chọn của bạn đã được tạo thành công trên blockchain."
                  : "Bạn có chắc chắn muốn tạo cuộc bình chọn này không? Thông tin sẽ được lưu trữ công khai trên mạng lưới Base Sepolia."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {dialogState === "success" ? (
              <div className="flex w-full gap-2 justify-end">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Về trang chủ
                </Button>
                <Button onClick={() => createdPollId && navigate(`/polls/${createdPollId}`)}>Xem cuộc bình chọn</Button>
              </div>
            ) : (
              <>
                <AlertDialogCancel disabled={dialogState === "loading"}>Hủy</AlertDialogCancel>
                <Button disabled={dialogState === "loading"} onClick={handleConfirmCreate}>
                  {dialogState === "loading" ? "Đang tạo..." : "Xác nhận tạo"}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
