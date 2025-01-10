import { useWebRTC } from "../hooks/useWebRTC"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

const Room = () => {
  const { roomId } = useParams()
  const {user} = useAuth()

  useEffect(() => {
    console.log('RoomId:', roomId)
    console.log('User:', user)
  })

  const { clients, provideRef } = useWebRTC(roomId, user)

  return (
    <div>
      <h1>All Connected clients</h1>
      {
        clients.map(client => (
          <div key={client.id}>
            <audio ref={(instance) => provideRef(instance, client.id)} controls autoPlay></audio>
            <h2>{client.name}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Room