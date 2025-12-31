import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

export default function FeatureBadge({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="secondary"
      className="px-3 py-1 text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
    >
      {children}
    </Badge>
  );
}
