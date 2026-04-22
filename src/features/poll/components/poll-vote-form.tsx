import { type Poll } from "../types/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PollVoteFormProps {
  poll: Poll;
  onVote: (selectedOptions: number[]) => void;
  isSubmitting?: boolean;
}

export function PollVoteForm({ poll, onVote, isSubmitting }: PollVoteFormProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (poll.settings.multiChoice) {
      setSelected((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    } else {
      setSelected([index]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length > 0) {
      onVote(selected);
    }
  };

  return (
    <>
      <div>
        <form id="vote-form" onSubmit={handleSubmit} className="space-y-4">
          {poll.settings.multiChoice ? (
            <FieldGroup className="gap-4">
              {poll.options.map((option, index) => {
                const isSelected = selected.includes(index);
                return (
                  <FieldLabel key={index}>
                    <Field orientation="horizontal">
                      <Checkbox id={`option-${index}`} checked={isSelected} onCheckedChange={() => handleToggle(index)} />
                      <FieldContent>
                        <FieldTitle>{option}</FieldTitle>
                        <FieldDescription>This is description for {option}</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                );
              })}
            </FieldGroup>
          ) : (
            <RadioGroup value={selected[0]?.toString()} onValueChange={(val) => setSelected([parseInt(val)])} className="gap-4">
              {poll.options.map((option, index) => {
                return (
                  <FieldLabel key={index}>
                    <Field orientation="horizontal">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <FieldContent>
                        <FieldTitle>{option}</FieldTitle>
                        <FieldDescription>This is description for {option}</FieldDescription>
                      </FieldContent>
                    </Field>
                  </FieldLabel>
                );
              })}
            </RadioGroup>
          )}
        </form>
      </div>
      <div>
        <Button form="vote-form" type="submit" disabled={selected.length === 0 || isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              Đang gửi...
            </>
          ) : (
            "Gửi bình chọn của bạn"
          )}
        </Button>
      </div>
    </>
  );
}
