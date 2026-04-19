import { type Poll } from "../types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Vote } from "lucide-react";

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
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <CardHeader className="bg-muted/30 pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Vote className="h-5 w-5 text-primary" />
          Tham gia bầu chọn
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form id="vote-form" onSubmit={handleSubmit} className="space-y-4">
          {poll.options.map((option, index) => {
            const isSelected = selected.includes(index);
            return (
              <div
                key={index}
                className={cn(
                  "relative flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer group",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                    : "border-border/50 hover:border-border hover:bg-muted/30"
                )}
                onClick={() => handleToggle(index)}
              >
                <div className="flex items-center justify-center">
                  {poll.settings.multiChoice ? (
                    <Checkbox
                      id={`option-${index}`}
                      checked={isSelected}
                      onCheckedChange={() => handleToggle(index)}
                      className="h-5 w-5 rounded-md border-border/60 group-hover:border-primary/50"
                    />
                  ) : (
                    <div className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected ? "border-primary bg-primary" : "border-border/60 group-hover:border-primary/50"
                    )}>
                      {isSelected && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </div>
                  )}
                </div>
                <Label 
                  htmlFor={`option-${index}`} 
                  className={cn(
                    "flex-1 cursor-pointer text-base font-medium transition-colors",
                    isSelected ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                  )}
                >
                  {option}
                </Label>
                {isSelected && (
                  <CheckCircle2 className="h-5 w-5 text-primary animate-in zoom-in-50 duration-300" />
                )}
              </div>
            );
          })}
        </form>
      </CardContent>
      <CardFooter className="bg-muted/10 border-t p-6">
        <Button 
          form="vote-form"
          type="submit" 
          className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20" 
          disabled={selected.length === 0 || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Đang gửi...
            </>
          ) : (
            "Gửi bình chọn của bạn"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
