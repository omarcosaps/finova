import * as React from "react"
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react"

import { DEFAULT_ICON_STROKE } from "./registry"

/**
 * Wrapper em torno de HugeiconsIcon com stroke e convenções do design system.
 */
function DsIcon({ strokeWidth = DEFAULT_ICON_STROKE, ...props }: HugeiconsIconProps) {
  return <HugeiconsIcon strokeWidth={strokeWidth} {...props} />
}

export { DsIcon }
