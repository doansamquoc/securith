import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconShieldCancel } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const PollAccessDenied = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-md text-center border-dashed border-destructive/50">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <IconShieldCancel className="w-10 h-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Quyền truy cập bị từ chối</CardTitle>
          <CardDescription className="text-base mt-2">Bạn không có quyền xem kết quả của cuộc bình chọn này.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Kết quả của cuộc bình chọn có thể bị ẩn đối với người chưa tham gia hoặc được thiết lập thành riêng tư bởi người tạo.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="default">
            <Link to="/dashboard">Quay về trang chủ</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PollAccessDenied;
