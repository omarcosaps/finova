"use client"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024
const ACCEPTED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
])
const ACCEPTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"])
const ACCEPT_ATTR = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"

type AlterarFotoPerfilDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initials: string
  currentAvatarUrl: string | null
  onConfirm: (avatarUrl: string) => void
}

function getFileExtension(fileName: string): string {
  const index = fileName.lastIndexOf(".")
  if (index < 0) return ""
  return fileName.slice(index).toLowerCase()
}

function validateProfilePhoto(file: File): string | null {
  const extension = getFileExtension(file.name)
  const hasValidMime = ACCEPTED_MIME_TYPES.has(file.type)
  const hasValidExtension = ACCEPTED_EXTENSIONS.has(extension)

  if (!hasValidMime && !hasValidExtension) {
    return "Selecione uma imagem nos formatos JPG, PNG ou WEBP."
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "A imagem deve ter no máximo 2 MB."
  }

  return null
}

export function AlterarFotoPerfilDialog({
  open,
  onOpenChange,
  initials,
  currentAvatarUrl,
  onConfirm,
}: AlterarFotoPerfilDialogProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const previewUrlRef = React.useRef<string | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const setPreview = React.useCallback((nextUrl: string | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
    previewUrlRef.current = nextUrl
    setPreviewUrl(nextUrl)
  }, [])

  const discardPreview = React.useCallback(() => {
    setPreview(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }, [setPreview])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) discardPreview()
    onOpenChange(nextOpen)
  }

  React.useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
    }
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validationError = validateProfilePhoto(file)
    if (validationError) {
      setError(validationError)
      setPreview(null)
      if (inputRef.current) inputRef.current.value = ""
      return
    }

    setError(null)
    setPreview(URL.createObjectURL(file))
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleConfirm = () => {
    if (!previewUrlRef.current) return

    const confirmedUrl = previewUrlRef.current
    previewUrlRef.current = null
    setPreviewUrl(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
    onConfirm(confirmedUrl)
    onOpenChange(false)
  }

  const displayUrl = previewUrl ?? currentAvatarUrl

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alterar foto de perfil</DialogTitle>
          <DialogDescription>
            Selecione uma imagem JPG, PNG ou WEBP de até 2 MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <Avatar size="lg" className="size-24">
            {displayUrl ? (
              <AvatarImage src={displayUrl} alt="Prévia da foto de perfil" />
            ) : null}
            <AvatarFallback className="bg-primary text-2xl font-medium text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_ATTR}
            className="sr-only"
            onChange={handleFileChange}
            tabIndex={-1}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            Escolher arquivo
          </Button>

          {error ? (
            <p className="text-center text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!previewUrl}
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
