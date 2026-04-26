import { CreatePollForm } from "@/features/poll/components/create-poll-form";

export default function CreatePollPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-10 space-y-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold tracking-tight uppercase">Tạo Cuộc Bầu Chọn Mới</h1>
        <p className="text-sm text-muted-foreground text-center">Hoàn thành các thông tin bên dưới để tạo cuộc bầu chọn của bạn</p>
      </div>
      <CreatePollForm />
    </div>
  );
}
