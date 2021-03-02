import { MessageType, ColorsType, IMessage } from './types';

export const newMessageBuilder = (
  messageType: MessageType,
  user: string,
  text: string,
  color?: ColorsType
): IMessage => ({ messageType, user, text, color })



export function getRandomColor(min = 0, max = 6): ColorsType {
  const colors: ColorsType[] = [
    'red',
    'green',
    'MediumAquaMarine',
    'Tan',
    'blue',
    'indigo',
    'brown',
    'blueviolet'
  ]

  min = Math.ceil(min);
  max = Math.floor(max);
  const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
  return colors[randomValue]
}