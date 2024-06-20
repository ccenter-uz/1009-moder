import { Box, Img } from '@chakra-ui/react'
import { FC, useState } from 'react'

type IRate = {
  initialValue: number
  maxStars: number
  onRatingChange: (value: number) => void
  gap?: string | { base: string; sm: string; md: string; xl: string }
  width?: string | { base: string; sm: string; md: string; xl: string }
  height?: string | { base: string; sm: string; md: string; xl: string }
  disabled: boolean
  starColor?: 'yellow' | 'grey'
}

const Rate: FC<IRate> = ({
  initialValue,
  maxStars,
  onRatingChange,
  gap = '8px',
  starColor = 'grey',
  width = '20px',
  height = '20px',
  disabled = false
}) => {
  const [rating, setRating] = useState(initialValue || 0)

  const handleClick = (value: number) => {
    if (disabled) return null
    setRating(value)
    if (onRatingChange) {
      onRatingChange(value)
    }
  }

  return (
    <Box display={'flex'} alignItems={'center'} gap={gap}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1

        if (starValue <= rating)
          return (
            <Img
              src={starColor === 'yellow' ? '/star-yellow-fill.svg' : '/star-fill.svg'}
              alt='star'
              key={index}
              onClick={() => handleClick(starValue)}
              width={width}
              height={height}
              style={{ cursor: 'pointer' }}
            />
          )

        return (
          <Img
            src={starColor === 'yellow' ? '/star-yellow-empty.svg' : '/star-emty.svg'}
            alt='star'
            key={index}
            onClick={() => handleClick(starValue)}
            width={width}
            height={height}
            style={{ cursor: 'pointer' }}
          />
        )
      })}
    </Box>
  )
}

export default Rate
