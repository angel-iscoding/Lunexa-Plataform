"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, Shield, Mail, Globe, RefreshCw, MessageSquare } from "lucide-react"

// Datos simulados del usuario
const userData = {
  nombre: "Administrador",
  email: "admin@lunexa.ai",
  rol: "Administrador",
  departamento: "Tecnología",
  biografia:
    "Administrador del sistema Lunexa IA con experiencia en gestión de plataformas de inteligencia artificial.",
}

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState("perfil")
  const [formData, setFormData] = useState(userData)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando cambios:", formData)
    // Mostrar notificación de éxito (en un caso real)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Configuración</h1>
        <Button className="bg-lunexa-blue hover:bg-lunexa-blue/90" onClick={handleSaveChanges}>
          Guardar cambios
        </Button>
      </div>

      {/* Pestañas de navegación */}
      <div className="flex space-x-2 border-b border-lunexa-navy/60 pb-2 overflow-x-auto">
        <button className={cn("tab-button", activeTab === "perfil" && "active")} onClick={() => setActiveTab("perfil")}>
          Perfil
        </button>
        <button className={cn("tab-button", activeTab === "cuenta" && "active")} onClick={() => setActiveTab("cuenta")}>
          Cuenta
        </button>
        <button
          className={cn("tab-button", activeTab === "notificaciones" && "active")}
          onClick={() => setActiveTab("notificaciones")}
        >
          Notificaciones
        </button>
        <button
          className={cn("tab-button", activeTab === "seguridad" && "active")}
          onClick={() => setActiveTab("seguridad")}
        >
          Seguridad
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      {activeTab === "perfil" && (
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Información de perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-gray-300">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="bg-lunexa-dark border-lunexa-dark"
                />
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
                  onChange={handleInputChange}
                  className="bg-lunexa-dark border-lunexa-dark"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="rol" className="text-sm font-medium text-gray-300">
                  Rol
                </label>
                <Input
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleInputChange}
                  className="bg-lunexa-dark border-lunexa-dark"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="departamento" className="text-sm font-medium text-gray-300">
                  Departamento
                </label>
                <Input
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  className="bg-lunexa-dark border-lunexa-dark"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="biografia" className="text-sm font-medium text-gray-300">
                Biografía
              </label>
              <Textarea
                id="biografia"
                name="biografia"
                value={formData.biografia}
                onChange={handleInputChange}
                className="min-h-[100px] bg-lunexa-dark border-lunexa-dark"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "cuenta" && (
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Preferencias de cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Idioma</h3>
                    <p className="text-xs text-gray-400">Selecciona tu idioma preferido</p>
                  </div>
                  <Select defaultValue="es">
                    <SelectTrigger className="w-[180px] bg-lunexa-dark border-lunexa-dark">
                      <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Zona horaria</h3>
                    <p className="text-xs text-gray-400">Configura tu zona horaria</p>
                  </div>
                  <Select defaultValue="europe-madrid">
                    <SelectTrigger className="w-[180px] bg-lunexa-dark border-lunexa-dark">
                      <SelectValue placeholder="Seleccionar zona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-madrid">UTC+01:00 (Madrid)</SelectItem>
                      <SelectItem value="europe-london">UTC+00:00 (London)</SelectItem>
                      <SelectItem value="america-new_york">UTC-05:00 (New York)</SelectItem>
                      <SelectItem value="asia-tokyo">UTC+09:00 (Tokyo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Tema oscuro</h3>
                    <p className="text-xs text-gray-400">Siempre usar tema oscuro</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Formato de fecha</h3>
                    <p className="text-xs text-gray-400">Selecciona el formato de fecha preferido</p>
                  </div>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="w-[180px] bg-lunexa-dark border-lunexa-dark">
                      <SelectValue placeholder="Formato de fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "notificaciones" && (
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lunexa-blue/10 p-2 rounded-md">
                      <Mail className="h-5 w-5 text-lunexa-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Correo electrónico</h3>
                      <p className="text-xs text-gray-400">Recibir notificaciones por correo</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lunexa-blue/10 p-2 rounded-md">
                      <Globe className="h-5 w-5 text-lunexa-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Navegador</h3>
                      <p className="text-xs text-gray-400">Notificaciones del navegador</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lunexa-blue/10 p-2 rounded-md">
                      <RefreshCw className="h-5 w-5 text-lunexa-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Actualizaciones</h3>
                      <p className="text-xs text-gray-400">Notificaciones de actualizaciones</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lunexa-blue/10 p-2 rounded-md">
                      <MessageSquare className="h-5 w-5 text-lunexa-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Marketing</h3>
                      <p className="text-xs text-gray-400">Recibir correos de marketing</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Frecuencia de notificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" className="border-lunexa-dark bg-lunexa-dark hover:bg-lunexa-panel">
                  Inmediatas
                </Button>
                <Button
                  variant="outline"
                  className="border-lunexa-blue bg-lunexa-blue/10 text-lunexa-blue hover:bg-lunexa-blue/20"
                >
                  Diarias
                </Button>
                <Button variant="outline" className="border-lunexa-dark bg-lunexa-dark hover:bg-lunexa-panel">
                  Semanales
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "seguridad" && (
        <Card className="bg-lunexa-navy border-lunexa-navy">
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium text-gray-300">
                  Contraseña actual
                </label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    className="bg-lunexa-dark border-lunexa-dark pr-10"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium text-gray-300">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    className="bg-lunexa-dark border-lunexa-dark pr-10"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span className="sr-only">{showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-lunexa-dark border-lunexa-dark pr-10"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span className="sr-only">{showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-lunexa-blue/10 p-2 rounded-md">
                      <Shield className="h-5 w-5 text-lunexa-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">Autenticación de dos factores</h3>
                      <p className="text-xs text-gray-400">Habilitar 2FA para mayor seguridad</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Sesiones activas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-lunexa-dark p-3 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-white">Este dispositivo</p>
                    <p className="text-xs text-gray-400">Windows • Chrome • Madrid, España</p>
                  </div>
                  <Badge className="bg-lunexa-active">Activo</Badge>
                </div>
                <div className="flex items-center justify-between bg-lunexa-dark p-3 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-white">iPhone 13</p>
                    <p className="text-xs text-gray-400">iOS • Safari • Madrid, España</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-lunexa-danger text-lunexa-danger hover:bg-lunexa-danger/10"
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
