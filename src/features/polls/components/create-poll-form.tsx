import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
import { createPollSchema, type CreatePollInput } from "../schemas/create-poll.schema";

const getDefaultValues = (): CreatePollInput => ({
  title: "",
  description: "",
  startsAt: new Date(),
  endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  options: ["", ""],
  settings: {
    multiChoice: false,
    noDeadline: false,
  },
});

export function CreatePollForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: getDefaultValues(),
    validators: {
      onChange: createPollSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting poll:", value);
      // Giả lập gọi contract
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Tạo cuộc bầu chọn thành công trên Blockchain!");
      navigate({ to: "/dashboard" });
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-12">
      <div className="space-y-2">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-4 mb-4">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Trở về
          </Link>
        </Button>
        <h1 className="text-4xl font-semibold tracking-tight">Tạo chiến dịch mới</h1>
        <p className="text-muted-foreground text-lg">Thiết lập các thông tin cơ bản cho cuộc bầu chọn của bạn.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-10"
      >
        <div className="space-y-8">
          <div className="grid gap-6">
            <form.Field
              name="title"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">Tiêu đề</Label>
                  <Input
                    id={field.name}
                    placeholder="Ví dụ: Bạn thích Framework nào nhất?"
                    className="h-12 text-lg px-4 bg-muted/30 border-border/50 shadow-none focus-visible:ring-1"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-xs text-destructive mt-1">{field.state.meta.errors.join(", ")}</p>
                  ) : null}
                </div>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">Mô tả chi tiết</Label>
                  <Textarea
                    id={field.name}
                    placeholder="Mô tả mục đích của cuộc bầu chọn này..."
                    className="min-h-[120px] resize-none text-base p-4 bg-muted/30 border-border/50 shadow-none focus-visible:ring-1"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-xs text-destructive mt-1">{field.state.meta.errors.join(", ")}</p>
                  ) : null}
                </div>
              )}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Phương án lựa chọn</Label>
            <form.Field
              name="options"
              mode="array"
              children={(field) => (
                <div className="space-y-3">
                  {field.state.value.map((_, i) => (
                    <div key={i} className="flex gap-3 items-center group">
                      <Input
                        placeholder={`Phương án ${i + 1}`}
                        className="h-12 bg-muted/30 border-border/50 shadow-none focus-visible:ring-1 flex-1"
                        value={field.state.value[i]}
                        onChange={(e) => {
                          const newOptions = [...field.state.value];
                          newOptions[i] = e.target.value;
                          field.handleChange(newOptions);
                        }}
                      />
                      {field.state.value.length > 2 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newOptions = field.state.value.filter((_, idx) => idx !== i);
                            field.handleChange(newOptions);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : <div className="w-9"></div>}
                    </div>
                  ))}
                  {field.state.value.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-dashed border-border text-muted-foreground hover:text-foreground"
                      onClick={() => field.handleChange([...field.state.value, ""])}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Thêm phương án
                    </Button>
                  )}
                  {field.state.meta.errors ? (
                    <p className="text-xs text-destructive mt-1">{field.state.meta.errors.join(", ")}</p>
                  ) : null}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field
              name="startsAt"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ngày bắt đầu</Label>
                  <Input
                    type="date"
                    className="h-12 bg-muted/30 border-border/50 shadow-none focus-visible:ring-1"
                    value={field.state.value.toISOString().split("T")[0]}
                    onChange={(e) => field.handleChange(new Date(e.target.value))}
                  />
                </div>
              )}
            />
            <form.Field
              name="endsAt"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ngày kết thúc</Label>
                  <Input
                    type="date"
                    className="h-12 bg-muted/30 border-border/50 shadow-none focus-visible:ring-1"
                    value={field.state.value.toISOString().split("T")[0]}
                    onChange={(e) => field.handleChange(new Date(e.target.value))}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-xs text-destructive mt-1">{field.state.meta.errors.join(", ")}</p>
                  ) : null}
                </div>
              )}
            />
          </div>

          <div className="p-6 rounded-xl border border-border/50 bg-muted/10 space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Tùy chọn hiển thị</h4>
            <div className="grid grid-cols-1 gap-6">
              <form.Field
                name="settings.multiChoice"
                children={(field) => (
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="multiChoice"
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(!!checked)}
                      className="h-5 w-5 rounded-sm"
                    />
                    <Label htmlFor="multiChoice" className="cursor-pointer font-normal text-base">
                      Cho phép người dùng chọn nhiều phương án
                    </Label>
                  </div>
                )}
              />
              <form.Field
                name="settings.noDeadline"
                children={(field) => (
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="noDeadline"
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(!!checked)}
                      className="h-5 w-5 rounded-sm"
                    />
                    <Label htmlFor="noDeadline" className="cursor-pointer font-normal text-base">
                      Không giới hạn thời gian (Vĩnh viễn)
                    </Label>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" className="w-full h-14 text-lg rounded-full" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Đang xử lý...
                </>
              ) : (
                "Tạo chiến dịch"
              )}
            </Button>
          )}
        />
      </form>
    </div>
  );
}