import { Loader2Icon } from "lucide-react";

export default function Loading({ size }: { size?: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Loader2Icon className="animate-spin text-primary" size={size ?? 48} />
    </div>
  );
}
