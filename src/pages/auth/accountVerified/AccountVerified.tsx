import ConfirmationImage from '@/assets/confirmation.svg';
export function AccountVerified() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
      <img src={ConfirmationImage} alt='account verified' />
      <div className='text-center gap-2'>
        <h2 className='text-[2.625rem] font-bold leading-[3.625rem]'>Verified</h2>
        <p className='text-2xl font-normal leading-8'>Yahoo! You have successfully verified the account</p>
      </div>
    </div>
  );
}
