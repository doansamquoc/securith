import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { createPollSchema, defaultValues, type CreatePollInput } from "../schemas/create-poll.schema";
import { cn } from "@/lib/utils";
import { IconTrash } from "@tabler/icons-react";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { useSendTransaction } from "thirdweb/react";
import { createPoll, pollCreatedEvent } from "@/thirdweb/84532/0x45916bd6882e0e15dfc92c1d74745d910fb62e17";
import { contract, client } from "@/lib/thirdweb";
import { parseEventLogs, waitForReceipt } from "thirdweb";
import { formatDateTimeLocal, getFormattedDuration, toUnixBigInt } from "@/features/polls/utils/date-utils";

export function CreatePollForm() {
  const form = useForm<CreatePollInput>({
    resolver: zodResolver(createPollSchema),
    defaultValues: defaultValues,
  });

  const noDeadline = form.watch("settings.noDeadline");
  const [startsAt, endsAt] = form.watch(["startsAt", "endsAt"]);

  // Handle type options field
  const { fields: optionFields, append, remove, replace } = useFieldArray({ control: form.control, name: "options" });

  const startAfterDurationText = startsAt && getFormattedDuration(new Date(), startsAt);
  const endAfterDurationText = getFormattedDuration(startsAt, endsAt);

  /* When enable the `No deadline` and result visibility is visible after end.
    We have to disable the visible after end rule and update the value to `0`*/
  React.useEffect(() => {
    if (noDeadline && form.getValues("settings.resultVisibility") === 2) {
      form.setValue("settings.resultVisibility", 0);
    }
  }, [noDeadline, form]);

  const { mutateAsync } = useSendTransaction({ payModal: false });
  async function onSubmit(data: CreatePollInput) {
    const pendingToast = toast.loading("Đang chuẩn bị...");
    try {
      const transaction = createPoll({
        contract,
        title: data.title,
        desc: data.description ?? "",
        options: data.options.map((o) => o.value),
        // Add 1 minute buffer to the start time to account for transaction processing time
        startsAt: toUnixBigInt(new Date(data.startsAt.getTime() + 60 * 1000)),
        endsAt: toUnixBigInt(data.endsAt),
        settings: {
          multiChoice: data.settings.multiChoice,
          noDeadline: data.settings.noDeadline,
          resultVisibility: data.settings.resultVisibility,
        },
      });

      toast.loading("Đang tạo cuộc bầu chọn...", { id: pendingToast });

      const result = await mutateAsync(transaction);
      const receipt = await waitForReceipt({
        client,
        chain: contract.chain,
        transactionHash: result.transactionHash,
      });

      // Parse event logs to get the created poll ID
      const logs = parseEventLogs({
        events: [pollCreatedEvent()],
        logs: receipt.logs,
      });

      // If the poll was created successfully, show a success message with the poll ID
      if (logs.length > 0) {
        toast.success(`Tạo thành công poll #${logs[0].args.pollId}!`, { id: pendingToast });
      }

      // console.log("Transaction Data:", transactionData);
      form.reset();
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("PollMustStartInTheFuture")) {
        form.setError("startsAt", { message: "Thời gian bắt đầu phải nằm trong tương lai." });
        toast.error("Thời gian bắt đầu phải nằm trong tương lai.", { id: pendingToast });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại.", { id: pendingToast });
      }
    }
  }

  return (
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
                  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Ví dụ: Bạn thích Framework nào nhất?" />
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
                <Button type="button" variant="outline" size="sm" className="border-dashed grow" onClick={() => append({ value: "" })}>
                  Thêm phương án
                </Button>
              )}
            </div>
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
                    <Input type="datetime-local" value={formatDateTimeLocal(field.value)} onChange={(e) => field.onChange(new Date(e.target.value))} />
                    {startAfterDurationText ?? <FieldDescription className="text-xs font-semibold">{startAfterDurationText}</FieldDescription>}
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
                      <FieldDescription className="text-xs font-semibold">{noDeadline ? "Không có thời hạn" : endAfterDurationText}</FieldDescription>
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
                    <Checkbox id="multiChoice" checked={field.value} onCheckedChange={(checked) => field.onChange(!!checked)} />
                    <FieldLabel htmlFor="multiChoice">Cho phép chọn nhiều phương án</FieldLabel>
                  </Field>
                )}
              />

              <Controller
                name="settings.noDeadline"
                control={form.control}
                render={({ field }) => (
                  <Field orientation={"horizontal"}>
                    <Checkbox id="noDeadline" checked={field.value} onCheckedChange={(checked) => field.onChange(!!checked)} />
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
