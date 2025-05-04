"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Esquema de validación para el formulario
const productSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre del producto es obligatorio" }),
  categoria: z.string().min(1, { message: "La categoría del producto es obligatoria" }),
  precio: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val.replace(",", ".").replace(/[^\d.]/g, ""))
      return !isNaN(num) && num > 0
    },
    { message: "El precio debe ser un número positivo" },
  ),
  stock: z.string().refine(
    (val) => {
      const num = Number.parseInt(val)
      return !isNaN(num) && num >= 0
    },
    { message: "El stock debe ser un número entero no negativo" },
  ),
  imagen: z.any().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProduct?: (product: ProductFormValues) => void
  onEditProduct?: (id: string, product: ProductFormValues) => void
  editProduct?: {
    id: string
    nombre: string
    categoria: string
    precio: string
    stock: number
    imagen?: string
  } | null
  isEditing?: boolean
}

export function AddProductDialog({
  open,
  onOpenChange,
  onAddProduct,
  onEditProduct,
  editProduct = null,
  isEditing = false,
}: AddProductDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      imagen: undefined,
    },
  })

  const selectedCategoria = watch("categoria")

  // Cargar datos del producto cuando estamos en modo edición
  useEffect(() => {
    if (open && isEditing && editProduct) {
      setValue("nombre", editProduct.nombre)
      setValue("categoria", editProduct.categoria)
      setValue("precio", editProduct.precio.replace("€", ""))
      setValue("stock", String(editProduct.stock))

      if (editProduct.imagen) {
        setImagePreview(editProduct.imagen)
      } else {
        setImagePreview(null)
      }
    } else if (!open) {
      // Limpiar el formulario cuando se cierra el modal
      reset()
      setImagePreview(null)
    }
  }, [open, isEditing, editProduct, setValue, reset])

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)

    try {
      // Simular una petición al servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isEditing && editProduct && onEditProduct) {
        // Modo edición
        onEditProduct(editProduct.id, data)
      } else if (onAddProduct) {
        // Modo añadir
        onAddProduct(data)
      }

      // Cerrar el modal y resetear el formulario
      reset()
      setImagePreview(null)
      onOpenChange(false)
    } catch (error) {
      console.error("Error al procesar producto:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar la carga de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Crear una URL para la vista previa
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Guardar el archivo en el formulario
      setValue("imagen", file)
    }
  }

  // Eliminar la imagen
  const handleRemoveImage = () => {
    setValue("imagen", undefined)
    setImagePreview(null)

    // Limpiar el input de archivo
    const fileInput = document.getElementById("imagen") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar producto" : "Añadir nuevo producto"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifica los detalles del producto seleccionado."
              : "Completa los detalles del nuevo producto para añadirlo al inventario."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-sm font-medium text-gray-300">
              Nombre del producto
            </label>
            <Input
              id="nombre"
              {...register("nombre")}
              placeholder="Nombre del producto"
              className="bg-lunexa-dark border-lunexa-dark"
            />
            {errors.nombre && <p className="text-sm text-lunexa-danger mt-1">{errors.nombre.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="categoria" className="text-sm font-medium text-gray-300">
              Categoría del producto
            </label>
            <Select
              onValueChange={(value) => setValue("categoria", value)}
              value={selectedCategoria}
              defaultValue={selectedCategoria}
            >
              <SelectTrigger className="w-full bg-lunexa-dark border-lunexa-dark">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Análisis">Análisis</SelectItem>
                <SelectItem value="Asistentes">Asistentes</SelectItem>
                <SelectItem value="Contenido">Contenido</SelectItem>
                <SelectItem value="Visión">Visión</SelectItem>
              </SelectContent>
            </Select>
            {errors.categoria && <p className="text-sm text-lunexa-danger mt-1">{errors.categoria.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="precio" className="text-sm font-medium text-gray-300">
              Precio
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
              <Input
                id="precio"
                {...register("precio")}
                placeholder="0.00"
                className="pl-8 bg-lunexa-dark border-lunexa-dark"
              />
            </div>
            {errors.precio && <p className="text-sm text-lunexa-danger mt-1">{errors.precio.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-medium text-gray-300">
              Stock disponible
            </label>
            <Input
              id="stock"
              type="number"
              min="0"
              {...register("stock")}
              placeholder="0"
              className="bg-lunexa-dark border-lunexa-dark"
            />
            {errors.stock && <p className="text-sm text-lunexa-danger mt-1">{errors.stock.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="imagen" className="text-sm font-medium text-gray-300">
              Imagen del producto (opcional)
            </label>

            {imagePreview ? (
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Vista previa"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="imagen"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-lunexa-dark bg-lunexa-dark/50 hover:bg-lunexa-dark"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG o GIF (máx. 2MB)</p>
                  </div>
                  <input id="imagen" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-lunexa-dark bg-lunexa-dark hover:bg-lunexa-panel"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-lunexa-blue hover:bg-lunexa-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (isEditing ? "Actualizando..." : "Añadiendo...") : isEditing ? "Actualizar" : "Añadir"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
