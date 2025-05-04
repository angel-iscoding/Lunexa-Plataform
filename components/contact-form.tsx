"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// URL del backend - Fácilmente editable para futuras conexiones
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ejemplo.com/contacto"

interface FormData {
  nombre: string
  email: string
  mensaje: string
}

interface ContactFormProps {
  title?: string
  description?: string
  onSuccess?: () => void
}

export function ContactForm({
  title = "Contacto",
  description = "Envíanos un mensaje y te responderemos lo antes posible.",
  onSuccess,
}: ContactFormProps) {
  // Estados para manejar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    mensaje: "",
  })

  // Estados para manejar la UI y feedback
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Validación básica de campos
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar errores al editar
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validar el formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar antes de enviar
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Enviar datos al backend usando Axios
      const response = await axios.post(BACKEND_URL, formData)

      console.log("Respuesta del servidor:", response.data)
      setSubmitStatus("success")

      // Limpiar el formulario después del éxito
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      })

      // Llamar al callback de éxito si existe
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setSubmitStatus("error")

      // Mostrar mensaje de error
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "Ocurrió un error al enviar el mensaje")
      } else {
        setErrorMessage("No se pudo conectar con el servidor. Inténtalo más tarde.")
      }
    } finally {
      setIsSubmitting(false)

      // Resetear el estado después de 5 segundos
      setTimeout(() => {
        if (submitStatus === "success") {
          setSubmitStatus("idle")
        }
      }, 5000)
    }
  }

  return (
    <Card className="bg-lunexa-navy border-lunexa-navy w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus === "success" && (
          <Alert className="mb-6 bg-lunexa-active/10 border-lunexa-active text-lunexa-active">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>¡Mensaje enviado!</AlertTitle>
            <AlertDescription>Hemos recibido tu mensaje. Te responderemos lo antes posible.</AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 bg-lunexa-danger/10 border-lunexa-danger text-lunexa-danger">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-300">
              Nombre
            </label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="bg-lunexa-dark border-lunexa-dark"
              placeholder="Tu nombre"
              disabled={isSubmitting}
            />
            {errors.nombre && <p className="text-sm text-lunexa-danger mt-1">{errors.nombre}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Correo electrónico
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-lunexa-dark border-lunexa-dark"
              placeholder="tu@correo.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-lunexa-danger mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="mensaje" className="text-sm font-medium text-gray-300">
              Mensaje
            </label>
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className="min-h-[120px] bg-lunexa-dark border-lunexa-dark"
              placeholder="Escribe tu mensaje aquí..."
              disabled={isSubmitting}
            />
            {errors.mensaje && <p className="text-sm text-lunexa-danger mt-1">{errors.mensaje}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-lunexa-blue hover:bg-lunexa-blue/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="mr-2">Enviando...</span>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            <>
              <span className="mr-2">Enviar mensaje</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
