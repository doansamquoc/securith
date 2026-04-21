import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type React from "react";

interface WarnAlertProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const WarnAlert = ({ icon, title, description }: WarnAlertProps) => {
  return (
    <Alert className="border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-50">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      {description ?? <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default WarnAlert;
