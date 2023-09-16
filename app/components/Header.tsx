import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {LayoutProps} from './Layout';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartFilledIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Image,
} from '@shopify/hydrogen';
import LoginIcon from '@mui/icons-material/Login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Banner from './Banner';
// import AddIcon from '@mui/icons-material/Add';
type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
if (typeof window !== 'undefined') {
  // Tu código que utiliza window aquí
  window.addEventListener("scroll", function() {
    const header = document.getElementById("myHeader");
    const navMenu = document.getElementById("myNav")
    if (header !== null && navMenu !== null && window.scrollY > 0) {
      header.classList.remove("top-8");
      header.classList.add("top-0");
      // navMenu.classList.add("bg-[#Fafafa]");
      // navMenu.classList.add("bg-none");
    } else {
      header?.classList.remove("top-0") ;
      header?.classList.add("top-8");
    }
  });
}

  return (
<div className=''>
  {/* <Banner/> */}
  <header id="myHeader" className="fixed z-40 flex flex-col overflow-hidden justify-between  h-auto transition-all over ease-in-out duration-200 opacity-100  ">
    <div className="md:px-12 xs:px-4 space-x-4 hover:bg-[#F6EEE6] justify-between my-auto w-full items-center flex">
    <div className='flex space-x-2 py-2 justify-center items-center'>
            <HeaderMenuMobileToggle /> 
      <SearchToggle />
    </div>
      <NavLink className="rounded-full py-2 my-auto bg-[#fafafa" prefetch="intent" to="/" style={activeLinkStyle} end>
        <div className="sm:w-auto justify-center    xs:w-full rounded-full md:rounded-xl ">
          <img className={`hidden sm:flex w-full h-14 object-cover`} src='/logo-remove.png' alt="Logo" />
          <img className={`sm:hidden flex h-20 w-20 sm:w-14 sm:h-14 object-cover`} src='/logo-small-remove.png' alt="Logo" />
        </div>
      </NavLink>
      <div className='w-auto   flex'>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </div>
  <div id="myNav" className='sticky z-50   hover:bg-[#fafafa] 
  w-screen  items-center justify-center mx-0 opacity-100  md:flex'>
    <HeaderMenu menu={menu} viewport="desktop" />
  </div>
  </header>
</div>
  );
}

export function HeaderMenu({
  menu,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  viewport: Viewport;
}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}`
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <div 
    // className="sticky z-50 w-full flex items-center justify-center    h-full"
    >
    <nav className={className} role="navigation">
      {/* {viewport === 'mobile' && (
        <NavLink
          end
          className='text-slate-900 '
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          >
        </NavLink>
      )} */}
      {/* {menu?.items} */}
  {(menu || FALLBACK_HEADER_MENU).items
  // .filter(item => item?.title !== 'Contacto')
  .map((item) => {
    if (!item || !item.url) return null;
    // console.log(item);
    // if the url is internal, we strip the domain
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain)
        ? new URL(item.url).pathname
        : item.url;
       const submenu = item.items.map((sublink) => {
    if (!sublink || !sublink.url) return null; // Comprobación adicional
const subItemURL =
      sublink.url.includes('myshopify.com') ||
      sublink?.url.includes(publicStoreDomain)
        ? new URL(sublink?.url).pathname
        : sublink.url;
    return (
      <NavLink
        className="flex space-y-2 pl-8 group text-slate-900 hover:text-slate-300 py-2 justify-between relative w-full"
        end
        key={sublink.id}
        onClick={closeAside}
        prefetch="intent"
        // style={activeLinkStyle}
        to={subItemURL}
      >
       <p className="text-slate-900 w-full group-hover:text-slate-300"> {sublink.title}</p>
      </NavLink>
    );
  });
    return (
      <div className="flex flex-col w-full relative" key={item.id}>
      
      <div 
       
      className="items-center hover:text-[#DFC7C7] duration-300 transition-all hover:ease-in-out group justify-between flex w-full flex-row" key={item.id}>
      <NavLink
      onMouseEnter={() => item.items.length > 0 && setIsSubmenuOpen(!isSubmenuOpen)}
        className={`  b group-hover:text-[#DFC7C7] flex space-y-2 px-4 py-2 w-full duration-200 transition-all hover:ease-in-out justify-between relative `}
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        // style={activeLinkStyle}
        to={url}
        >
        <p className='text-[#fafafa] w-auto  text-2xl font-normal duration-200 transition-all '><span className='hover:text group-hover:text-[#DFC7C7] text-slate-900'>{item.title}</span> </p>
        </NavLink>
        {item.items.length > 0 && (
          <>
          <KeyboardArrowDownIcon 
          className="group-hover:block text-slate-900  md:hidden cursor-pointer"
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                 
                  
                  />

          </>
          )}
          </div>

        <div 
        onMouseLeave={() => setIsSubmenuOpen(false)}
        className={`xl:left-0 transition-opacity relative w-full    duration-200 ease-in-out ${isSubmenuOpen ? 'opacity-100' : 'opacity-0 hidden '}`}>

        {submenu}
        </div>
        </div>
        );
      })}

    </nav>
  </div>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
      
    <nav className="flex items-center w-full " role="navigation">

      <div className= " space-x-4 text-light flex items-center w-auto">

      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className='hidden items-center text-center justify-center text-xs text-light md:flex text-slate-900'>
        {isLoggedIn ? (`Cuenta: `) : <div className="w-auto  space-x-2  text-center">Iniciar Sesion <LoginIcon  className="ml-2 font-light" sx={{ fontSize: '30px' }} /></div>}
      </NavLink>
      {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className=' '>
        {isLoggedIn ?   :}
      </NavLink> */}
      <CartToggle cart={cart} />
      </div>
    </nav>
  );
}
// #BB6A72, #F6EEE6, #DFC7C7

function HeaderMenuMobileToggle() {
  return (
    <a className="md:hidden " href="#mobile-menu-aside">
      <MenuIcon 
      sx={{ fontSize: '30px' }}
      className='text-slate-900 hover:text-slate-300 transition-all transform hover:scale duration-200 hover:ease-in-out'/>
    </a>
  );
}

function SearchToggle() {
  return <>
  <a href="#search-aside" className=' flex flex-row space-x-2 items-center  text-slate-900 '>
  <SearchOutlinedIcon className="font-extralight" sx={{ fontSize: '30px' }}/><span className="hidden md:block text-xs text-slate-900">Buscar</span>
  </a>
  </>
}

function CartBadge({count}: {count: number}) {
  return <a href="#cart-aside" className="flex text-sm text-slate-900">{count !== 0 ? <ShoppingCartFilledIcon sx={{ fontSize: '30px' }} />:<ShoppingCartOutlinedIcon sx={{ fontSize: '30px' }} />}  {count} </a>;
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return<> <CartBadge count={0} /></>
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Colecciones',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Politicas',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'Nosotros',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {

    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'text-slate-900',
  };
}