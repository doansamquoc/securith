import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPollSchema, defaultValues, type CreatePollInput } from "../schemas/create-poll.schema";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreatePoll } from "../hooks/use-create-poll";
import BasicInfoSection from "./basic-info-section";
import OptionSection from "./option-section";
import SettingSection from "./setting-section";

export function CreatePollForm() {
  const navigate = useNavigate();
  const form = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: defaultValues,
  });

  const { execute } = useCreatePoll();
  async function onSubmit(data: CreatePollInput) {
    const toastId = toast.loading("Đang tạo bầu chọn...");
    try {
      const pollId = await execute(data);
      toast.success("Tạo thành công!", { id: toastId, action: { label: "Xem bầu chọn", onClick: () => navigate(`/polls/${pollId}`) } });
    } catch (error) {
      console.error("Lỗi khi tạo bầu chọn:", error);
      toast.error("Đã xảy ra lỗi khi tạo bầu chọn. Vui lòng thử lại.", { id: toastId });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <BasicInfoSection control={form.control} />
      <OptionSection control={form.control} />
      <SettingSection form={form} />
      <div className="flex items-center justify-end gap-2 pt-4">
        <Button variant="outline" type="button" asChild>
          <Link to="/dashboard">Hủy bỏ</Link>
        </Button>
        <Button variant="outline" type="button" className="mr-auto" onClick={() => form.reset()}>
          Làm mới
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Spinner /> Đang tạo...
            </>
          ) : (
            "Tạo bầu chọn"
          )}
        </Button>
      </div>
    </form>
  );
}
