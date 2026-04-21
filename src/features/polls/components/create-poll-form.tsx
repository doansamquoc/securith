import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { createPollSchema, type CreatePollInput } from "../schemas/create-poll.schema";
import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { formatDuration, intervalToDuration } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect } from "react";

/**
 * Formats a Date object to a string compatible with <input type="datetime-local" />
 * Format: YYYY-MM-DDTHH:mm
 */
const formatDateTimeLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function CreatePollForm() {
  const form = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: "",
      description: "",
      options: [{ value: "" }, { value: "" }],
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      settings: {
        multiChoice: false,
        noDeadline: false,
        resultVisibility: 0,
      },
    },
  });

  // Watch the `noDeadline` rule
  const noDeadline = form.watch("settings.noDeadline");

  // Handle type options field
  const {
    fields: optionFields,
    append,
    remove,
    replace,
  } = useFieldArray({
    control: form.control,
    name: "options",
  });

  // Watch start time, end time and calculate the time interval between them
  const [startsAt, endsAt] = form.watch(["startsAt", "endsAt"]);

  const startAfterDuration = intervalToDuration({
    start: new Date(),
    end: startsAt,
  });
  const startAfterDurationText =
    startsAt < new Date()
      ? ""
      : "Sau " +
        formatDuration(startAfterDuration, {
          format: ["years", "months", "days", "hours", "minutes"],
          locale: vi,
        });

  const startMs = startsAt ? startsAt.getTime() : Date.now();
  const endMs = endsAt ? endsAt.getTime() : Date.now();
  const diffMs = endMs - startMs;

  const endAfterDuration = intervalToDuration({
    start: startsAt || new Date(),
    end: endsAt || new Date(),
  });
  const endAfterDurationText =
    diffMs < 10 * 60 * 1000
      ? ""
      : "Sau " +
        formatDuration(endAfterDuration, {
          format: ["years", "months", "days", "hours", "minutes"],
          locale: vi,
        });

  // When enable the `No deadline` and result visibility is visible after end.
  // We have to disable the visible after end rule and update the value to `0`.
  useEffect(() => {
    if (noDeadline && form.getValues("settings.resultVisibility") === 2) {
      form.setValue("settings.resultVisibility", 0);
    }
  }, [noDeadline, form]);

  function onSubmit(data: CreatePollInput) {
    toast("You submitted the following values:", {
      description: <code>{JSON.stringify(data, null, 2)}</code>,
      position: "bottom-right",
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="flex items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight uppercase">Tạo Cuộc Bầu Chọn Mới</h1>
          <p className="text-xs text-muted-foreground uppercase">Điền thông tin bên dưới để bắt đầu cuộc bầu chọn.</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tiêu đề</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Ví dụ: Bạn thích Framework nào nhất?"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Mô tả (Tùy chọn)</FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Mô tả chi tiết mục đích của cuộc bầu chọn này..."
                      className="min-h-25"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phương án lựa chọn</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <>
                {optionFields.map((item, index) => (
                  <Controller
                    key={item.id}
                    name={`options.${index}.value` as const}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <InputGroup>
                          <InputGroupInput {...field} placeholder={`Lựa chọn ${index + 1}...`} />
                          {optionFields.length > 2 && (
                            <InputGroupAddon align={"inline-end"}>
                              <InputGroupButton onClick={() => remove(index)}>
                                <IconTrash />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>

                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                ))}
                <div className="flex flex-row gap-2">
                  {optionFields.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-dashed hover:text-destructive"
                      onClick={() => replace([{ value: "" }, { value: "" }])}
                    >
                      Xóa tất cả
                    </Button>
                  )}
                  {optionFields.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-dashed grow"
                      onClick={() => append({ value: "" })}
                    >
                      Thêm phương án
                    </Button>
                  )}
                </div>
              </>
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Thời gian</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  name="startsAt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="startsAt">Bắt đầu</FieldLabel>
                      <Input
                        type="datetime-local"
                        value={formatDateTimeLocal(field.value)}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                      {startAfterDurationText ?? (
                        <FieldDescription className="text-xs font-semibold">{startAfterDurationText}</FieldDescription>
                      )}
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="endsAt"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className={cn(noDeadline && "opacity-50 pointer-events-none")}>
                      <FieldLabel htmlFor="endsAt">Kết thúc</FieldLabel>
                      <Input
                        type="datetime-local"
                        disabled={noDeadline}
                        value={formatDateTimeLocal(field.value)}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                      {endAfterDurationText ?? (
                        <FieldDescription className="text-xs font-semibold">
                          {noDeadline ? "Không có thời hạn" : endAfterDurationText}
                        </FieldDescription>
                      )}

                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thiết lập</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Controller
                  name="settings.multiChoice"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation={"horizontal"}>
                      <Checkbox
                        id="multiChoice"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <FieldLabel htmlFor="multiChoice">Cho phép chọn nhiều phương án</FieldLabel>
                    </Field>
                  )}
                />

                <Controller
                  name="settings.noDeadline"
                  control={form.control}
                  render={({ field }) => (
                    <Field orientation={"horizontal"}>
                      <Checkbox
                        id="noDeadline"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                      />
                      <FieldLabel htmlFor="noDeadline">Không thời hạn</FieldLabel>
                    </Field>
                  )}
                />

                <Controller
                  name="settings.resultVisibility"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Hiển thị kết quả</FieldLabel>
                      <Select value={field.value.toString()} onValueChange={(val) => field.onChange(Number(val))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Trạng thái hiển thị" />
                        </SelectTrigger>
                        <SelectContent align="center" position="popper">
                          <SelectGroup>
                            <SelectItem value="0">Luôn hiển thị</SelectItem>
                            <SelectItem value="1">Sau khi bầu</SelectItem>
                            {noDeadline ? "" : <SelectItem value="2">Sau khi kết thúc</SelectItem>}
                            <SelectItem value="3">Không bao giờ</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard">Hủy bỏ</Link>
          </Button>
          <Button variant="outline" type="button" className="mr-auto" onClick={() => form.reset()}>
            Làm mới
          </Button>
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard">Xem trước</Link>
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
    </div>
  );
}
