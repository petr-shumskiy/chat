import { SyntheticEvent, useEffect, useState } from 'react'
import Greet from './greet';
import { io } from 'socket.io-client'
import { newMessageBuilder, getRandomColor } from '../utls';
import { IMessage, ColorsType, IServerUserJoinedOrLeft } from '../types';
import { Chat } from '../components/Chat';


export default function Index() {
  const socket = io('http://192.168.0.144:3000').connect()
  const greetingMessage = newMessageBuilder('info', null, 'Welcome to chat')

  const [isLogged, setLogged] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([greetingMessage])
  const [userName, setUserName] = useState('')
  const [colorMessage, setColor] = useState<ColorsType | null>(null)


  useEffect(() => {
    socket.on('user joined', (data: IServerUserJoinedOrLeft) => {
      setColor(getRandomColor())
      setMessages((prevMessages) =>
        [
          ...prevMessages,
          newMessageBuilder('info', null, `${data.username} was joined`),
          newMessageBuilder('info', null, `There are ${data.numUsers} participants`)
        ]
      )
    })
  }, [])


  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    setLogged(true)
    setMessages((prevMessages) => [...prevMessages,])

    socket.emit('add user', userName)
  }



  return (
    isLogged
      ? <Chat
        socket={socket}
        messages={messages}
        setMessages={setMessages}
        userName={userName}
        colorMessage={colorMessage}
      />
      : <Greet onSubmit={onSubmit} setUserName={setUserName} />
  )
}