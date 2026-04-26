import { ResultVisibility, PollStatus, type PollDetails } from "../types/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconArrowRight, IconChartLine, IconCheck } from "@tabler/icons-react";
import { useCastVote } from "../hooks/use-cast-vote";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { castVoteSchema, type CastVoteInput } from "../schemas/cast-vote.schema";
import { toBigInt } from "../utils/date-utils";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link, useParams } from "react-router-dom";

interface PollVoteFormProps {
  readonly poll: PollDetails;
  setPoll: (arg0: PollDetails) => void;
}

export function PollVoteForm({ poll, setPoll }: PollVoteFormProps) {
  const { pollId } = useParams();
  const { execute } = useCastVote();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pendingData, setPendingData] = useState<CastVoteInput | null>(null);

  const form = useForm<CastVoteInput>({
    resolver: zodResolver(castVoteSchema),
    defaultValues: {
      optionIndexes: poll.votedIndices ? poll.votedIndices.map(Number) : [],
    },
    mode: "onChange",
  });

  const onSubmit = (data: CastVoteInput) => {
    setPendingData(data);
    setDialogState("idle");
    setDialogOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!pollId || !pendingData) {
      setDialogState("error");
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      return;
    }

    setDialogState("loading");
    try {
      await execute(BigInt(pollId), pendingData);

      setPoll({
        ...poll,
        hasVoted: true,
        votedIndices: pendingData.optionIndexes.map((index: number) => BigInt(index)),
      });

      setDialogState("success");
    } catch (error) {
      console.error(error);
      setDialogState("error");
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const resultVisibility = poll.settings.resultVisibility;
  const isAlways = resultVisibility === ResultVisibility.Always;
  const isAfterVote = resultVisibility === ResultVisibility.AfterVote && poll.hasVoted;
  const isAfterEnd = resultVisibility === ResultVisibility.AfterEnd && toBigInt(new Date()) > poll.endsAt;
  const shouldShowResult = isAlways || isAfterVote || isAfterEnd;
  const canVote = poll.status === PollStatus.Active && !poll.hasVoted;

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="optionIndexes"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                {poll.settings.multiChoice ? (
                  <FieldGroup>
                    {poll.options.map((option, index) => {
                      const isSelected = field.value.includes(index);
                      return (
                        <FieldLabel key={index}>
                          <Field orientation="horizontal">
                            <Checkbox
                              id={`option-${index}`}
                              checked={isSelected}
                              disabled={!canVote}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, index]);
                                } else {
                                  field.onChange(field.value.filter((i) => i !== index));
                                }
                              }}
                            />
                            <FieldContent>
                              <FieldTitle>{option}</FieldTitle>
                            </FieldContent>
                          </Field>
                        </FieldLabel>
                      );
                    })}
                  </FieldGroup>
                ) : (
                  <RadioGroup
                    value={field.value[0]?.toString() ?? ""}
                    onValueChange={(val) => field.onChange([parseInt(val)])}
                    className="gap-4"
                    disabled={!canVote}
                  >
                    <FieldGroup>
                      {poll.options.map((option, index) => {
                        return (
                          <FieldLabel key={index}>
                            <Field orientation="horizontal">
                              <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={!canVote} />
                              <FieldContent>
                                <FieldTitle>{option}</FieldTitle>
                              </FieldContent>
                            </Field>
                          </FieldLabel>
                        );
                      })}
                    </FieldGroup>
                  </RadioGroup>
                )}
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </>
            )}
          />
        </FieldGroup>

        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <Button type="submit" disabled={!canVote || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Spinner /> : ""}
            {poll.hasVoted ? (
              <>
                <IconCheck className="mr-2" />
                Bạn đã bình chọn
              </>
            ) : (
              <>
                <IconArrowRight className="mr-2" />
                Gửi bình chọn
              </>
            )}
          </Button>
          {shouldShowResult && (
            <Button variant="outline" asChild>
              <Link to="results">
                <IconChartLine className="mr-2" /> Xem kết quả
              </Link>
            </Button>
          )}
        </div>
      </form>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (dialogState === "loading") return;
          setDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận bình chọn</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogState === "loading"
                ? "Đang gửi bình chọn của bạn lên blockchain..."
                : dialogState === "success"
                  ? "Bình chọn của bạn đã được ghi nhận thành công."
                  : "Bạn có chắc chắn muốn gửi bình chọn này không? Hành động này không thể hoàn tác một khi đã được lưu trên blockchain."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {dialogState === "success" ? (
              <div className="flex w-full gap-2 justify-end">
                <Button onClick={() => setDialogOpen(false)}>Xong</Button>
              </div>
            ) : (
              <>
                <AlertDialogCancel disabled={dialogState === "loading"}>Hủy</AlertDialogCancel>
                <Button disabled={dialogState === "loading"} onClick={handleConfirmVote}>
                  {dialogState === "loading" ? "Đang gửi..." : "Xác nhận gửi"}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
