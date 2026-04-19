import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import type React from "react";

interface SuccessAlertProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const SuccessAlert = ({ icon, title, description }: SuccessAlertProps) => {
  return (
    <Alert className="border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      {description ?? <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default SuccessAlert;
