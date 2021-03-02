export type ColorsType =
  'red' |
  'green' |
  'MediumAquaMarine' |
  'Tan' |
  'blue' |
  'indigo' |
  'brown' |
  'blueviolet'

export type MessageType = 'message' | 'info'

export interface IMessage {
  messageType: MessageType
  user: string
  text: string
  color?: ColorsType
}
export interface IServerMessage {
  username: string
  message: IMessage
}

export interface IServerUserJoinedOrLeft {
  username: string
  numUsers: number
}