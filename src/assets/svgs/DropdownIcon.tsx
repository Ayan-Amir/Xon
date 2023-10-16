type DropdownIconProps = {
  className?: string
}

export function DropdownIcon({ className }: DropdownIconProps) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className} w-[0.8888rem] xxl:w-5 h-[0.8888rem] xxl:h-5`}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.78509 6.59833C4.11053 6.27289 4.63817 6.27289 4.9636 6.59833L9.99935 11.6341L15.0351 6.59833C15.3605 6.27289 15.8882 6.27289 16.2136 6.59833C16.539 6.92376 16.539 7.4514 16.2136 7.77684L10.5886 13.4018C10.2632 13.7273 9.73553 13.7273 9.41009 13.4018L3.78509 7.77684C3.45966 7.4514 3.45966 6.92376 3.78509 6.59833Z'
        fill='#202427'
      />
    </svg>
  );
}
