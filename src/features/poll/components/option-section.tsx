import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Controller, useFieldArray, type Control } from "react-hook-form";
import type { CreatePollInput } from "../schemas/create-poll.schema";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface OptionSectionProps {
  control: Control<CreatePollInput>;
}

const OptionSection = ({ control }: OptionSectionProps) => {
  const { fields: optionFields, append, remove, replace } = useFieldArray({ control: control, name: "options" });
  return (
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
              control={control}
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
  );
};

export default OptionSection;
