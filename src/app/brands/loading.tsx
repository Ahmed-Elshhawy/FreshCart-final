import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<"svg">;

export default function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("w-6 h-6 animate-spin text-gray-600", className)}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  return (
    <div className="flex justify-center items-center p-4">
      <Spinner className="w-8 h-8 text-green-600" />
    </div>
  );
}
