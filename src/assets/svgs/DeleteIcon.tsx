type Props = {
  className?: string
}

export const DeleteIcon = ({ className }: Props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='#A4A3A8' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path d='M20 7V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V7H2V5H22V7H20ZM6 7V20H18V7H6ZM7 2H17V4H7V2ZM11 10H13V17H11V10Z' />
    </svg>
  )
}
