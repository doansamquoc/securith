import PollInfoCard from "./poll-info-card";
import ShareCard from "./share-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PollVoteForm } from "./poll-vote-form";
import PollAlert from "./poll-alert";
import CopyButton from "@/components/copy-button";
import { shortenAddress } from "@/utils/utils";
import { formatRelativeTime, toDate } from "../utils/date-utils";
import { PollStatus, type PollDetails as PollDetailType } from "../types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconDotsVertical, IconTrash, IconLock } from "@tabler/icons-react";
import { useDeletePoll } from "../hooks/use-delete-poll";
import { toast } from "sonner";
import { useActiveAccount } from "thirdweb/react";
import { useNavigate, useParams } from "react-router-dom";
import { useClosePoll } from "../hooks/use-close-poll";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface PollDetailsProps {
  poll: PollDetailType;
}

const PollDetails = ({ poll }: PollDetailsProps) => {
  const [pollData, setPollData] = useState(poll);
  const { pollId } = useParams();
  const navigate = useNavigate();
  const { execute: deletePoll } = useDeletePoll();
  const { execute: closePoll } = useClosePoll();
  const account = useActiveAccount();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogState, setDeleteDialogState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [closeDialogState, setCloseDialogState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isCreator = account?.address.toLowerCase() === pollData.creator.toLowerCase();

  const handleDelete = async () => {
    if (!pollId) return;
    setDeleteDialogState("loading");
    try {
      await deletePoll(BigInt(pollId));
      setDeleteDialogState("success");
    } catch {
      setDeleteDialogState("error");
      toast.error("Có lỗi xảy ra khi xóa cuộc bình chọn");
    }
  };

  const handleClose = async () => {
    if (!pollId) return;
    setCloseDialogState("loading");
    try {
      await closePoll(BigInt(pollId));
      setPollData({
        ...pollData,
        status: PollStatus.Cancelled,
        endsAt: 1n,
      });
      setCloseDialogState("success");
    } catch {
      setCloseDialogState("error");
      toast.error("Có lỗi xảy ra khi đóng cuộc bình chọn");
    }
  };

  return (
    <>
      <PollAlert poll={pollData} />
      <Card className="py-4 md:py-6">
        <CardHeader className="px-4 md:px-6 flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-bold">{pollData.title}</CardTitle>
            <CardDescription className="flex items-center text-xs font-semibold gap-2">
              <span className="flex items-center">
                Bởi {shortenAddress(pollData.creator)} <CopyButton textToCopy={pollData.creator} size={"icon-xs"} variant={"ghost"} />
              </span>
              <span>{formatRelativeTime(toDate(pollData.createdAt))}</span>
            </CardDescription>
          </div>
          {isCreator && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md shrink-0">
                  <IconDotsVertical className="h-4 w-4" />
                  <span className="sr-only">Tùy chọn</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    setCloseDialogState("idle");
                    setCloseDialogOpen(true);
                  }}
                >
                  <IconLock className="mr-2 h-4 w-4" />
                  Đóng
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteDialogState("idle");
                    setDeleteDialogOpen(true);
                  }}
                >
                  <IconTrash className="mr-2 h-4 w-4" />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent className="px-4 md:px-6 space-y-6">
          {pollData.description && <CardDescription>{pollData.description}</CardDescription>}
          <div className="flex flex-col">
            <div className="md:col-span-8 space-y-4">
              <div className="">
                <h3 className="text-md font-medium uppercase">{pollData.settings.multiChoice ? "Chọn nhiều đáp án" : "Chọn một đáp án"}</h3>
              </div>
              <div className="space-y-6">
                <PollVoteForm poll={pollData} setPoll={setPollData} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShareCard />
        <PollInfoCard />
      </div>

      {/* Delete Dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (deleteDialogState === "loading") return;
          setDeleteDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteDialogState === "loading"
                ? "Đang xóa cuộc bình chọn..."
                : deleteDialogState === "success"
                  ? "Đã xóa cuộc bình chọn thành công."
                  : "Bạn có chắc chắn muốn xóa cuộc bình chọn này không? Hành động này không thể hoàn tác."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {deleteDialogState === "success" ? (
              <Button onClick={() => navigate("/dashboard")}>Về trang chủ</Button>
            ) : (
              <>
                <AlertDialogCancel disabled={deleteDialogState === "loading"}>Hủy</AlertDialogCancel>
                <Button variant="destructive" disabled={deleteDialogState === "loading"} onClick={handleDelete}>
                  {deleteDialogState === "loading" ? <Spinner /> : "Xóa"}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Close Dialog */}
      <AlertDialog
        open={closeDialogOpen}
        onOpenChange={(open) => {
          if (closeDialogState === "loading") return;
          setCloseDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận đóng</AlertDialogTitle>
            <AlertDialogDescription>
              {closeDialogState === "loading"
                ? "Đang đóng cuộc bầu chọn..."
                : closeDialogState === "success"
                  ? "Đã đóng cuộc bình chọn thành công."
                  : "Bạn có chắc chắn muốn đóng cuộc bình chọn này không? Người dùng sẽ không thể tiếp tục bình chọn."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {closeDialogState === "success" ? (
              <div className="flex w-full gap-2 justify-end">
                <Button variant="outline" onClick={() => setCloseDialogOpen(false)}>
                  Xong
                </Button>
                <Button onClick={() => navigate("/dashboard")}>Về trang chủ</Button>
              </div>
            ) : (
              <>
                <AlertDialogCancel disabled={closeDialogState === "loading"}>Hủy</AlertDialogCancel>
                <Button disabled={closeDialogState === "loading"} onClick={handleClose}>
                  {closeDialogState === "loading" ? <Spinner /> : "Đóng bình chọn"}
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PollDetails;
