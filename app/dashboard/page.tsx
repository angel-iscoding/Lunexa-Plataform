import {
  BarChart,
  LineChart,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/dashboard"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  // Datos simulados para los gráficos
  const barChartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: "Ventas",
        data: [65, 59, 80, 81, 56, 55, 40, 60, 75, 85, 90, 100],
        backgroundColor: "#1A66FF",
      },
    ],
  }

  const lineChartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        label: "Usuarios",
        data: [30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
        borderColor: "#00C2FF",
        backgroundColor: "rgba(0, 194, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }

  // Datos simulados para la tabla
  const pedidos = [
    { id: 1, nombre: "Juan Pérez", ciudad: "Madrid", fecha: "2023-05-01", estado: "Entregado", monto: "$1,200" },
    { id: 2, nombre: "María López", ciudad: "Barcelona", fecha: "2023-05-02", estado: "Procesado", monto: "$850" },
    { id: 3, nombre: "Carlos Ruiz", ciudad: "Valencia", fecha: "2023-05-03", estado: "Cancelado", monto: "$350" },
    { id: 4, nombre: "Ana Martínez", ciudad: "Sevilla", fecha: "2023-05-04", estado: "Entregado", monto: "$720" },
    { id: 5, nombre: "Pedro Sánchez", ciudad: "Bilbao", fecha: "2023-05-05", estado: "Procesado", monto: "$1,500" },
  ]

  // Función para determinar el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "bg-green-500/10 text-green-500"
      case "Procesado":
        return "bg-yellow-500/10 text-yellow-500"
      case "Cancelado":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white md:text-3xl">Panel de Análisis</h1>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+5.2% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">+2.1% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+12.5% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">+8.3% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">+15.2% respecto al mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,950</div>
            <p className="text-xs text-muted-foreground">+7.4% respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dinámica de ventas</CardTitle>
            <CardDescription>Ventas mensuales durante el último año</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={barChartData} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad general de usuarios</CardTitle>
            <CardDescription>Tendencia de usuarios activos</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={lineChartData} height={300} />
          </CardContent>
        </Card>
      </div>

      {/* Tarjetas adicionales */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Facturas pagadas</CardTitle>
            <CardDescription>Resumen de facturas pagadas este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,450</div>
            <p className="text-sm text-muted-foreground">85 facturas pagadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fondos recibidos</CardTitle>
            <CardDescription>Total de fondos recibidos este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$15,890</div>
            <p className="text-sm text-muted-foreground">92 transacciones</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de pedidos */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos de clientes</CardTitle>
          <CardDescription>Lista de pedidos recientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium">Nombre</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Ciudad</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Fecha</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Monto</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm">{pedido.nombre}</td>
                    <td className="px-4 py-3 text-sm">{pedido.ciudad}</td>
                    <td className="px-4 py-3 text-sm">{pedido.fecha}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge className={getEstadoColor(pedido.estado)}>{pedido.estado}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{pedido.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
