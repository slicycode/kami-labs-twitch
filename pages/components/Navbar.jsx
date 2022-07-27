import { AiFillHome } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className='bg-[#252626]'>
      <img
        src='https://kami-labs.fr/wp-content/uploads/2022/04/header_kami_labs_v2.jpg'
        alt=''
      />
      <div className='flex items-center gap-x-5 p-3 w-[70%] mx-auto'>
        {/* LIEN VERS SITE PRINCIPAL*/}
        <a href='/' target='_blank' rel='noreferrer'>
          <AiFillHome className='h-6 w-6 hover:cursor-pointer hover:scale-105' />
        </a>
        <span className='uppercase font-bold text-sm'>News Wotlk classic</span>
      </div>
    </div>
  );
};

export default Navbar;
