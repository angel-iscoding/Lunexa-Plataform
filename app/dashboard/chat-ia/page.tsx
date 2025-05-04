"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Tipos para los mensajes y conversaciones
interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
}

interface Conversation {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

// Datos simulados
const initialConversations: Conversation[] = [
  {
    id: "conv1",
    title: "Soporte técnico",
    lastMessage: "¿Cómo puedo ayudarte con tu problema técnico?",
    timestamp: "01:56 a.m.",
  },
  {
    id: "conv2",
    title: "Consulta de producto",
    lastMessage: "Aquí tienes la información sobre nuestros productos de IA.",
    timestamp: "Ayer",
  },
  {
    id: "conv3",
    title: "Análisis de datos",
    lastMessage: "He analizado los datos que me enviaste.",
    timestamp: "Lun",
  },
]

const initialMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      content: "Hola, soy el asistente de Lunexa IA. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: "01:56 a.m.",
    },
  ],
  conv2: [],
  conv3: [],
}

export default function ChatIAPage() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [activeConversation, setActiveConversation] = useState<string>("conv1")
  const [newMessage, setNewMessage] = useState<string>("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Crear nuevo mensaje del usuario
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Actualizar mensajes
    const updatedMessages = {
      ...messages,
      [activeConversation]: [...(messages[activeConversation] || []), userMessage],
    }

    setMessages(updatedMessages)
    setNewMessage("")

    // Simular respuesta del asistente después de un breve retraso
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now()}-ai`,
        content: "Gracias por tu mensaje. Estoy procesando tu solicitud y te responderé en breve.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), aiResponse],
      }))

      // Actualizar la última conversación
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation
            ? { ...conv, lastMessage: aiResponse.content, timestamp: aiResponse.timestamp }
            : conv,
        ),
      )
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewConversation = () => {
    const newConvId = `conv-${Date.now()}`

    // Crear nueva conversación
    const newConv: Conversation = {
      id: newConvId,
      title: "Nueva conversación",
      lastMessage: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Añadir mensaje inicial del asistente
    const initialMessage: Message = {
      id: `msg-${Date.now()}-ai`,
      content: "Hola, soy el asistente de Lunexa IA. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    // Actualizar estado
    setConversations([newConv, ...conversations])
    setMessages((prev) => ({
      ...prev,
      [newConvId]: [initialMessage],
    }))
    setActiveConversation(newConvId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white md:text-3xl">Chat IA</h1>
        <Button className="bg-lunexa-blue hover:bg-lunexa-blue/90" onClick={startNewConversation}>
          Nueva conversación
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
        {/* Lista de conversaciones */}
        <div className="md:col-span-1 bg-lunexa-navy rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-medium mb-4">Conversación actual</h2>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn("chat-conversation", activeConversation === conversation.id && "active")}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="font-medium">{conversation.title}</div>
                <div className="text-sm text-gray-400 truncate">{conversation.lastMessage}</div>
                <div className="text-xs text-gray-500 mt-1">{conversation.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de chat */}
        <div className="md:col-span-2 bg-lunexa-navy rounded-lg flex flex-col h-full">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages[activeConversation]?.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "ai" ? "justify-start" : "justify-end")}>
                {message.sender === "ai" && (
                  <Avatar className="h-10 w-10 mr-2 bg-lunexa-blue text-white">
                    <div className="text-xs font-bold">AI</div>
                  </Avatar>
                )}
                <div className={cn("max-w-[80%]", message.sender === "ai" ? "chat-message-ai" : "chat-message-user")}>
                  <div>{message.content}</div>
                  <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-lunexa-dark/60">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Escribe un mensaje..."
                className="bg-lunexa-dark border-lunexa-dark"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                className="bg-lunexa-blue hover:bg-lunexa-blue/90 rounded-full h-10 w-10 p-0"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
