
export const ZERO = 0
export const ONE = 1

export const maxLineClamp = (count) => {
  return {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: count,
    WebkitBoxOrient: 'vertical'
  }
}
