import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface AlertCustomProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  variant?: "success" | "destructive" | "info" | "warning";
}

const AlertCustom = ({ icon, title, description, variant = "info" }: AlertCustomProps) => {
  const variantClasses = {
    success: "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-50",
    destructive: "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50",
    info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-50",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-50",
  };
  return (
    <Alert className={variantClasses[variant]}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertCustom;
