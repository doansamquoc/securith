import { CreatePollForm } from "@/features/poll/components/create-poll-form";

export default function CreatePollPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight uppercase">Tạo Cuộc Bầu Chọn Mới</h1>
          <p className="text-xs text-muted-foreground uppercase">Điền thông tin bên dưới để bắt đầu cuộc bầu chọn.</p>
        </div>
      </div>
      <CreatePollForm />
    </div>
  );
}
