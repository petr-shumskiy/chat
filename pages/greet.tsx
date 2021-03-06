import React, {
  useState,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  ChangeEventHandler
} from 'react'
import { Box, InputBase, makeStyles, Typography } from '@material-ui/core';

interface IGreet {
  onSubmit: (event: SyntheticEvent) => void
  setUserName: Dispatch<SetStateAction<string>>
}

const useStyle = makeStyles({
  root: {
    color: '#fff',
    fontSize: '400%',
    display: 'flex',
    justifyContent: 'center'
  },

  inputText: {
    width: '70%',
    textAlign: 'center',
    'borderBottom': '2px solid #fff'
  },
})

export default function Greet(props: IGreet) {
  const { onSubmit, setUserName } = props
  const classes = useStyle()

  const [name, setName] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
    setUserName(event.currentTarget.value)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      bgcolor='black'
      color='white'
      height='100vh'
    >
      <form onSubmit={onSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          color='white'>
          <Typography variant='h3' align='center'>What's your nickname?</Typography>
          <InputBase
            autoFocus
            error
            type='text'
            value={name}
            classes={{
              root: classes.root,
              input: classes.inputText,
            }}

            onChange={handleChange}
          />
        </Box>
      </form>
    </Box>
  )
}