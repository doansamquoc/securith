import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Trash2, Loader2, ArrowLeft, Calendar as CalendarIcon, Settings2, ListTodo } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
import { createPollSchema, type CreatePollInput } from "../schemas/create-poll.schema";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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

/**
 * Formats a Date object to a string compatible with <input type="datetime-local" />
 * Format: YYYY-MM-DDTHH:mm
 */
const formatDateTimeLocal = (date: Date) => {
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (e) {
    return "";
  }
};

export function CreatePollForm() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: getDefaultValues(),
    validators: {
      onChange: createPollSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting poll:", value);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Tạo cuộc bầu chọn thành công!");
      navigate({ to: "/dashboard" });
    },
  });

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tạo chiến dịch mới</h1>
          <p className="text-sm text-muted-foreground">Điền thông tin bên dưới để bắt đầu cuộc bầu chọn.</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
            <CardDescription>Tiêu đề và mô tả nội dung cho cuộc bầu chọn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form.Field
              name="title"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tiêu đề</Label>
                  <Input
                    id={field.name}
                    placeholder="Ví dụ: Bạn thích Framework nào nhất?"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Mô tả</Label>
                  <Textarea
                    id={field.name}
                    placeholder="Mô tả chi tiết mục đích của cuộc bầu chọn này..."
                    className="min-h-[100px]"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-lg">Phương án lựa chọn</CardTitle>
              <CardDescription>Thêm các lựa chọn cho người tham gia.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <form.Field
              name="options"
              mode="array"
              children={(field) => (
                <div className="space-y-3">
                  {field.state.value.map((_, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="relative flex-1">
                        <Input
                          placeholder={`Lựa chọn ${i + 1}`}
                          value={field.state.value[i]}
                          onChange={(e) => {
                            const newOptions = [...field.state.value];
                            newOptions[i] = e.target.value;
                            field.handleChange(newOptions);
                          }}
                        />
                      </div>
                      {field.state.value.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            const newOptions = field.state.value.filter((_, idx) => idx !== i);
                            field.handleChange(newOptions);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {field.state.value.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full border-dashed"
                      onClick={() => field.handleChange([...field.state.value, ""])}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Thêm phương án
                    </Button>
                  )}
                  {field.state.meta.errors && (
                    <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                Thời gian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form.Field
                name="startsAt"
                children={(field) => (
                  <div className="space-y-2">
                    <Label>Ngày bắt đầu</Label>
                    <Input
                      type="datetime-local"
                      value={formatDateTimeLocal(field.state.value)}
                      onChange={(e) => field.handleChange(new Date(e.target.value))}
                    />
                  </div>
                )}
              />

              <form.Subscribe
                selector={(state) => state.values.settings.noDeadline}
                children={(noDeadline) => (
                  <form.Field
                    name="endsAt"
                    children={(field) => (
                      <div className={cn("space-y-2", noDeadline && "opacity-50 pointer-events-none")}>
                        <Label>Ngày kết thúc</Label>
                        <Input
                          type="datetime-local"
                          disabled={noDeadline}
                          value={formatDateTimeLocal(field.state.value)}
                          onChange={(e) => field.handleChange(new Date(e.target.value))}
                        />
                        {field.state.meta.errors && (
                          <p className="text-xs font-medium text-destructive">{field.state.meta.errors.join(", ")}</p>
                        )}
                      </div>
                    )}
                  />
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                Thiết lập
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form.Field
                name="settings.multiChoice"
                children={(field) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiChoice"
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(!!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="multiChoice" className="text-sm font-medium leading-none cursor-pointer">
                        Đa lựa chọn
                      </Label>
                      <p className="text-xs text-muted-foreground">Người dùng có thể chọn nhiều phương án.</p>
                    </div>
                  </div>
                )}
              />
              <form.Field
                name="settings.noDeadline"
                children={(field) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="noDeadline"
                      checked={field.state.value}
                      onCheckedChange={(checked) => field.handleChange(!!checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="noDeadline" className="text-sm font-medium leading-none cursor-pointer">
                        Không thời hạn
                      </Label>
                      <p className="text-xs text-muted-foreground">Cuộc bầu chọn diễn ra vĩnh viễn.</p>
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard">Hủy bỏ</Link>
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="min-w-[140px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tạo...
                  </>
                ) : (
                  "Tạo chiến dịch"
                )}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
