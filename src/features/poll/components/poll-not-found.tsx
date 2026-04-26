import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconMapQuestion } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const PollNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh] mt-20 px-4">
      <Card className="w-full max-w-md text-center border-dashed">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-muted rounded-full">
              <IconMapQuestion className="w-10 h-10 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Không tìm thấy</CardTitle>
          <CardDescription className="text-base mt-2">Cuộc bình chọn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ để khám phá các cuộc bình chọn khác.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/dashboard">Quay về trang chủ</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PollNotFound;
