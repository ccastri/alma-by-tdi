import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';
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
type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
<>
  <header className=" header flex flex-col overflow-hidden pt-2 h-auto transition-all over ease-in-out duration-200 hover:bg-[#F6EEE6] ">
    <div className="md:px-12 xs:px-4 space-x-4 justify-between my-auto w-full items-center flex">
    <div className='flex space-x-2'>
            <HeaderMenuMobileToggle /> 
      <SearchToggle />
    </div>
      <NavLink className="rounded-full bg-[#fafafa" prefetch="intent" to="/" style={activeLinkStyle} end>
        <div className="sm:w-32 p-2 my-auto xs:w-full rounded-full md:rounded-xl bg-[#fafafa]">
          <img className={`hidden sm:flex w-full object-cover`} src='/logo.png' alt="Logo" />
          <img className={`sm:hidden flex h-12 w-12 sm:w-14 sm:h-14 object-cover`} src='/logo-small.png' alt="Logo" />
        </div>
      </NavLink>
      <div className='w-auto flex'>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </div>
  <div className='sticky z-50  w-screen mt-2  py-2 items-center justify-center mx-0 opacity-20 hover:opacity-100 bg-[#fafafa] md:flex'>
    <HeaderMenu menu={menu} viewport="desktop" />
  </div>
  </header>
</>
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
  const className = `header-menu-${viewport}`;

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
      {viewport === 'mobile' && (
        <NavLink
          end
          className='text-[#BB6A72] '
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          >
        </NavLink>
      )}
      {/* {menu?.items} */}
  {(menu || FALLBACK_HEADER_MENU).items
  // .filter(item => item?.title !== 'Contacto')
  .map((item) => {
    if (!item || !item.url) return null;
    console.log(item);
    // if the url is internal, we strip the domain
    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain)
        ? new URL(item.url).pathname
        : item.url;
    return (
      <>
      <NavLink
        className=" flex border-2 relative w-full"
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        style={activeLinkStyle}
        to={url}
      >
        {item.title} 
        {item.items.length > 0 && (
          <div className="group flex w-full space-x-2  flex-col">
        <KeyboardArrowDownIcon/>
{/* ------------------------------------------------------------------------------------------------ */}
{/*--------------------- MAÑANA SEPARO ESTO CON UN ESTADO; IMPORTANTE CONTAINERIZAR!!!! --------------*/}
{/* ------------------------------------------------------------------------------------------------ */}
        <div className=' absolute z-50 w-full  mt-6 hover:border-2 flex flex-col '>
          {item.items.map(subitem =>
          {
            const url =
            subitem?.url?.includes('myshopify.com') ||
            subitem?.url?.includes(publicStoreDomain)
            ? new URL(subitem?.url).pathname
            : subitem.url;
            // }
            return(
              <div key={subitem.id} className=" border-4 flex flex-col group-hover:opacity-100 opacity-0">
        <NavLink
           end
           key={subitem.id}
           onClick={closeAside}
           prefetch="intent"
           style={activeLinkStyle}
           to={`${url}`}
           > {subitem.title} </NavLink>
        </div>
        )})}
        </div>
        </div>
        )}
        </NavLink>
        </>
    );
  })}

    </nav>
  {/* <img alt=""className='absolute' src='/logo-small.png'/> */}
  </div>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas flex items-center w-full " role="navigation">

      <div className= " space-x-4 flex items-center w-auto">

      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className='hidden text-xs md:flex text-[#BB6A72]'>
        {isLoggedIn ? 'Cuenta' : 'Iniciar Sesion'}
      </NavLink>
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className='md:hidden flex text-[#BB6A72]'>
        {isLoggedIn ?  <PersonOutlineIcon sx={{ fontSize: '20px' }} /> :<LoginIcon sx={{ fontSize: '20px' }} />}
      </NavLink>
      <CartToggle cart={cart} />
      </div>
    </nav>
  );
}
// #BB6A72, #F6EEE6, #DFC7C7

function HeaderMenuMobileToggle() {
  return (
    <a className=" " href="#mobile-menu-aside">
      <span ><MenuIcon 
      sx={{ fontSize: '20px' }}
      className='text-[#BB6A72] hover:text-slate-300 transition-all transform hover:scale duration-200 hover:ease-in-out'/></span>
    </a>
  );
}

function SearchToggle() {
  return <>
  <a href="#search-aside" className=' flex flex-row items-center text-[#BB6A72] '>
  <span className="hidden md:block text-xs text-[#BB6A72]">Buscar</span><SearchOutlinedIcon sx={{ fontSize: '20px' }}/>
  </a>
  </>
}

function CartBadge({count}: {count: number}) {
  return <a href="#cart-aside" className="flex text-xs text-[#BB6A72]">{count !== 0 ? <ShoppingCartFilledIcon sx={{ fontSize: '20px' }} />:<ShoppingCartOutlinedIcon sx={{ fontSize: '20px' }} />}  {count} </a>;
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
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
    fontFamily: 'Assistant, sans-serif',
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'text-[#BB6A72]',
  };
}