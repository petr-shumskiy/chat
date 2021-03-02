import { IMessage } from '../types';
import { Typography } from '@material-ui/core';

export const Message: React.FC<IMessage> = ({ messageType, user, text, color }) => {
  return (
    <li
      style={{
        listStyle: 'none',
        textAlign: messageType === 'info' ? 'center' : 'start',
        fontSize: '20px'
      }}
    >
      {
        user ? (
          <Typography
            component='span'
            style={{ marginRight: '8px', color }}
          >
            {user}
          </Typography>
        )
          : null
      }

      <Typography
        component='span'
        style={{
          fontWeight: messageType === 'message' ? 700 : 400,
          color: messageType === 'message' ? (color || 'black') : 'gray'
        }}
      >
        {text}
      </Typography>
    </li >
  )
}
