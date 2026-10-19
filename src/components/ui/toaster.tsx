"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            {props.variant !== "hint" && <ToastClose />}
          </Toast>
        )
      })}
      <ToastViewport
        className={
          toasts.some((toast) => toast.variant === "hint")
            ? "left-4 w-auto max-w-[calc(100vw-2rem)] translate-x-0 p-0"
            : undefined
        }
      />
    </ToastProvider>
  )
}
