import { ContactForm } from "@/components/contact-form"

export default function ContactoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white md:text-3xl">Contacto</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Estamos aquí para ayudarte</h2>
          <p className="text-gray-300">
            Si tienes alguna pregunta sobre nuestros productos o servicios, no dudes en ponerte en contacto con
            nosotros. Nuestro equipo estará encantado de ayudarte.
          </p>

          <div className="space-y-4 mt-8">
            <div className="bg-lunexa-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Soporte técnico</h3>
              <p className="text-gray-300">soporte@lunexa.ai</p>
              <p className="text-gray-300">Lun-Vie: 9:00 - 18:00</p>
            </div>

            <div className="bg-lunexa-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Ventas</h3>
              <p className="text-gray-300">ventas@lunexa.ai</p>
              <p className="text-gray-300">Lun-Vie: 9:00 - 20:00</p>
            </div>

            <div className="bg-lunexa-panel p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Oficina principal</h3>
              <p className="text-gray-300">Calle Innovación, 123</p>
              <p className="text-gray-300">28001 Madrid, España</p>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
