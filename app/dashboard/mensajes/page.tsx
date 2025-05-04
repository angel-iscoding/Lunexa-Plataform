import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MensajesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white md:text-3xl">Mensajes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Chat IA</CardTitle>
          <CardDescription>Interactúa con la IA de Lunexa</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección está en desarrollo. Pronto podrás interactuar con nuestra IA similar a Gemini.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
