import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller, type Control } from "react-hook-form";
import type { CreatePollInput } from "../schemas/create-poll.schema";

interface BasicInfoSectionProps {
  control: Control<CreatePollInput>;
}

const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <Controller
            name="title"
            control={control}
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
            control={control}
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
  );
};

export default BasicInfoSection;
