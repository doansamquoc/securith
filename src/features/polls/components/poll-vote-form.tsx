import { type Poll } from "../types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        {poll.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
            onClick={() => handleToggle(index)}
          >
            {poll.settings.multiChoice ? (
              <Checkbox
                id={`option-${index}`}
                checked={selected.includes(index)}
                onCheckedChange={() => handleToggle(index)}
              />
            ) : (
              <RadioGroup value={selected[0]?.toString()}>
                <RadioGroupItem value={index.toString()} id={`option-${index}`} checked={selected.includes(index)} />
              </RadioGroup>
            )}
            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
              {option}
            </Label>
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full" disabled={selected.length === 0 || isSubmitting}>
        {isSubmitting ? "Đang gửi..." : "Gửi bình chọn"}
      </Button>
    </form>
  );
}
