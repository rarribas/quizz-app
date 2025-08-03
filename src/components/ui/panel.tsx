import { ReactNode } from "react";
import { cn } from "@/lib/utils"

interface PanelI{
  children: ReactNode,
  className?: string,
}

function Panel({ children, className }: PanelI) {
  return (
    <div className="flex justify-center">
      <div className={cn("bg-white p-6 rounded shadow", className)}>
        {children}
      </div>
    </div>
  )
}

export default Panel;