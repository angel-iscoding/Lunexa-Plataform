"use client"

import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Datos simulados para la tabla de productos
const productos = [
  {
    id: "PRD-001",
    nombre: "Análisis de Datos Avanzado",
    categoria: "Análisis",
    precio: "€299.99",
    stock: 15,
    estado: "Activo",
  },
  {
    id: "PRD-002",
    nombre: "Asistente Virtual IA",
    categoria: "Asistentes",
    precio: "€149.99",
    stock: 28,
    estado: "Activo",
  },
  {
    id: "PRD-003",
    nombre: "Generador de Contenido",
    categoria: "Contenido",
    precio: "€199.99",
    stock: 10,
    estado: "Activo",
  },
  {
    id: "PRD-004",
    nombre: "Reconocimiento de Imágenes",
    categoria: "Visión",
    precio: "€249.99",
    stock: 5,
    estado: "Bajo stock",
  },
  {
    id: "PRD-005",
    nombre: "Chatbot Empresarial",
    categoria: "Asistentes",
    precio: "€399.99",
    stock: 0,
    estado: "Agotado",
  },
  {
    id: "PRD-006",
    nombre: "Análisis Predictivo",
    categoria: "Análisis",
    precio: "€349.99",
    stock: 12,
    estado: "Activo",
  },
]

// Datos para los paneles informativos
const categorias = [
  { nombre: "Análisis", cantidad: 2, color: "bg-lunexa-blue" },
  { nombre: "Asistentes", cantidad: 2, color: "bg-lunexa-blue" },
  { nombre: "Contenido", cantidad: 1, color: "bg-lunexa-blue" },
  { nombre: "Visión", cantidad: 1, color: "bg-lunexa-blue" },
]

const inventario = [
  { estado: "Stock disponible", porcentaje: 70, color: "bg-lunexa-active" },
  { estado: "Bajo stock", porcentaje: 20, color: "bg-lunexa-warning" },
  { estado: "Agotado", porcentaje: 10, color: "bg-lunexa-danger" },
]

const ventasPorProducto = [
  { nombre: "Asistente Virtual IA", porcentaje: 35, color: "bg-blue-500" },
  { nombre: "Análisis de Datos", porcentaje: 25, color: "bg-purple-500" },
  { nombre: "Generador de Contenido", porcentaje: 20, color: "bg-green-500" },
  { nombre: "Otros", porcentaje: 20, color: "bg-gray-500" },
]

export default function ProductosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar productos basados en el término de búsqueda
  const filteredProducts = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para determinar la clase de estado
  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case "Activo":
        return "status-active"
      case "Bajo stock":
        return "status-warning"
      case "Agotado":
        return "status-danger"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Productos</h1>
        <Button className="bg-lunexa-blue hover:bg-lunexa-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar productos..."
            className="pl-9 bg-lunexa-navy border-lunexa-navy"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-lunexa-navy bg-lunexa-navy hover:bg-lunexa-panel">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Card className="bg-lunexa-navy border-lunexa-navy">
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-lunexa-dark/60">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Categoría</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Precio</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((producto) => (
                  <tr key={producto.id} className="border-b border-lunexa-dark/60">
                    <td className="px-4 py-3 text-sm text-gray-300">{producto.id}</td>
                    <td className="px-4 py-3 text-sm text-white">{producto.nombre}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{producto.categoria}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{producto.precio}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{producto.stock}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={getEstadoClass(producto.estado)}>{producto.estado}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="link" className="text-lunexa-blue hover:text-lunexa-blue/80 p-0 h-auto">
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Paneles informativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel de Categorías */}
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorias.map((categoria) => (
              <div key={categoria.nombre} className="flex items-center justify-between">
                <span className="text-gray-300">{categoria.nombre}</span>
                <Badge
                  className={`${categoria.color} text-white rounded-full w-6 h-6 flex items-center justify-center`}
                >
                  {categoria.cantidad}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Panel de Inventario */}
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Inventario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {inventario.map((item) => (
              <div key={item.estado} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{item.estado}</span>
                  <span className="text-white font-medium">{item.porcentaje}%</span>
                </div>
                <Progress value={item.porcentaje} className="h-2 bg-lunexa-dark/60" indicatorClassName={item.color} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Panel de Ventas por producto */}
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Ventas por producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {ventasPorProducto.map((item) => (
              <div key={item.nombre} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{item.nombre}</span>
                  <span className="text-white font-medium">{item.porcentaje}%</span>
                </div>
                <Progress value={item.porcentaje} className="h-2 bg-lunexa-dark/60" indicatorClassName={item.color} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
