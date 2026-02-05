import { ReactNode } from "react";
import { cn } from "@/lib/utils"

interface PanelI{
  children: ReactNode,
  className?: string,
  dataTestId?: string,
}

function Panel({ children, className, dataTestId }: PanelI) {
  return (
    <div className="flex justify-center">
      <div 
        className={cn("bg-white p-6 rounded shadow", className)}
        data-testid={dataTestId || "panel-test"}
      >
        {children}
      </div>
    </div>
  )
}

export default Panel;