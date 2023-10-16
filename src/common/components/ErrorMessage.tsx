type Props = {
  message?: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <p className='w-full text-xs leading-[0.6875rem] text-inputError font-normal'>
      {message}
    </p>
  );
}
