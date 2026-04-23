import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { CreatePollInput } from "../schemas/create-poll.schema";
import { formatDateTimeLocal, getFormattedDuration } from "../utils/date-utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import { cn } from "@/lib/utils";

interface SettingSectionProps {
  form: UseFormReturn<CreatePollInput>;
}

const SettingSection = ({ form }: SettingSectionProps) => {
  const noDeadline = form.watch("settings.noDeadline");
  const [startsAt, endsAt] = form.watch(["startsAt", "endsAt"]);

  const startAfterDurationText = startsAt && getFormattedDuration(new Date(), startsAt);
  const endAfterDurationText = getFormattedDuration(startsAt, endsAt);

  /* When enable the `No deadline` and result visibility is visible after end.
      We have to disable the visible after end rule and update the value to `0`*/
  React.useEffect(() => {
    if (noDeadline && form.getValues("settings.resultVisibility") === 2) {
      form.setValue("settings.resultVisibility", 0);
    }
  }, [noDeadline, form]);

  return (
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
  );
};

export default SettingSection;
