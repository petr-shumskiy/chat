import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { newMessageBuilder } from '../utls';
import { IMessage, ColorsType, IServerMessage, IServerUserJoinedOrLeft } from '../types';

import { Box, TextField } from '@material-ui/core';
import { Message } from './Message';
import { useState } from 'react';

interface IChat {
  socket: Socket
  setMessages: Dispatch<SetStateAction<IMessage[]>>
  messages: IMessage[]
  userName: string
  colorMessage: ColorsType
}

export const Chat: React.FC<IChat> = ({
  socket,
  setMessages,
  messages,
  userName,
  colorMessage,
}) => {
  const [messageText, setMessageText] = useState('')

  const setRef = useCallback((element: HTMLElement) => {
    if (element) {
      element.scrollIntoView()
    }
  }, [])


  useEffect(() => {
    socket.on('new message', (data: IServerMessage) => {
      if (data.message.user !== userName) {
        setMessages((prevMessages) => [...prevMessages, data.message])
      }
    })

    socket.on('user left', (data: IServerUserJoinedOrLeft) => {
      setMessages((prevMessages) =>
        [
          ...prevMessages,
          newMessageBuilder('info', null, `${data.username} left`),
          newMessageBuilder('info', null, `There are ${data.numUsers} participants`)
        ]
      )
    })
  }, [])

  // send a message
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (!messageText) {
      return
    }

    const newMessage: IMessage = newMessageBuilder(
      'message',
      userName,
      messageText,
      colorMessage
    )

    setMessages((prevMessages) => [...prevMessages, newMessage])
    socket.emit('new message', newMessage)

    setMessageText('')
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setMessageText(event.currentTarget.value)
  }

  return (
    <Box
      padding='8px'
      style={{ overflowY: 'scroll', height: 'calc(100vh - 60px)' }}
    >
      <Box>
        <ul>
          {messages.map((message, index) => {
            const lastMessage = messages.length - 1 === index
            return (
              <div ref={lastMessage ? setRef : null}>
                <Message
                  key={index}
                  messageType={message.messageType}
                  user={message.user}
                  text={message.text}
                  color={message.color}
                />
              </div>
            )
          })}
        </ul>
      </Box>
      <Box
        height='54px'
        position='fixed'
        bottom='6px'
        right='0.5%'
        width='99%'
      >
        <Box display='flex' justifyContent='center' width='100%'>
          <form onSubmit={handleSubmit} style={{ width: 'inherit' }}>
            <TextField
              fullWidth
              variant='outlined'
              color='primary'
              onChange={handleChange}
              value={messageText} />
          </form>
        </Box>
      </Box>
    </Box >
  )
}
