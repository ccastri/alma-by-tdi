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
    if (header !== null && window.scrollY > 0) {
      header.classList.remove("top-8");
      header.classList.add("top-0");
    } else {
      header?.classList.remove("top-0");
      header?.classList.add("top-8");
    }
  });
}

  return (
<div className=''>
  {/* <Banner/> */}
  <header id="myHeader" className="fixed z-40 flex flex-col overflow-hidden justify-between  h-auto transition-all over ease-in-out duration-200 opacity-100 hover:bg-[#F6EEE6] ">
    <div className="md:px-12 xs:px-4 space-x-4 justify-between my-auto w-full items-center flex">
    <div className='flex space-x-2 py-4 justify-center items-center'>
            <HeaderMenuMobileToggle /> 
      <SearchToggle />
    </div>
      <NavLink className="rounded-full my-auto bg-[#fafafa" prefetch="intent" to="/" style={activeLinkStyle} end>
        <div className="sm:w-32 justify-center  my-2 p-2  xs:w-full rounded-full md:rounded-xl bg-[#fafafa]">
          <img className={`hidden sm:flex w-full object-cover`} src='/logo.png' alt="Logo" />
          <img className={`sm:hidden flex h-12 w-12 sm:w-14 sm:h-14 object-cover`} src='/logo-small.png' alt="Logo" />
        </div>
      </NavLink>
      <div className='w-auto mt-2 flex'>
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </div>
  <div className='sticky z-50  border-t-slate-300 hover:bg-[#fafafa] border-dashed border w-screen  items-center justify-center mx-0 opacity-100  md:flex'>
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
          className='text-[#BB6A72] '
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
        className="flex space-y-2 pl-8 group text-[#BB6A72] hover:text-slate-300 py-2 justify-between relative w-full"
        end
        key={sublink.id}
        onClick={closeAside}
        prefetch="intent"
        // style={activeLinkStyle}
        to={subItemURL}
      >
       <p className="text-[#BB6A72] w-full group-hover:text-slate-300"> {sublink.title}</p>
      </NavLink>
    );
  });
    return (
      <div className="flex flex-col w-full relative" key={item.id}>
      
      <div 
       
      className="items-center  justify-between flex w-full flex-row" key={item.id}>
      <NavLink
      onMouseEnter={() => item.items.length > 0 && setIsSubmenuOpen(!isSubmenuOpen)}
        className=" flex space-y-2 px-4 py-2 text-[#BB6A72] w-full duration-200 transition-all justify-between relative"
        end
        key={item.id}
        onClick={closeAside}
        prefetch="intent"
        // style={activeLinkStyle}
        to={url}
        >
        <p className='text-[#BB6A72] '>{item.title} </p>
        </NavLink>
        {item.items.length > 0 && (
          <>
          <KeyboardArrowDownIcon 
          className="group-hover:block text-[#BB6A72]  md:hidden cursor-pointer"
                  onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                 
                  
                  />

          </>
          )}
          </div>

        <div 
        onMouseLeave={() => setIsSubmenuOpen(false)}
        className={`xl:left-0 transition-opacity relative w-full bg-slate-300 border-2 duration-200 ease-in-out ${isSubmenuOpen ? 'opacity-100' : 'opacity-0 hidden '}`}>

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
      
    <nav className="header-ctas flex items-center w-full " role="navigation">

      <div className= " space-x-4 flex items-center w-auto">

      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className='hidden text-sm md:flex text-[#BB6A72]'>
        {isLoggedIn ? 'Cuenta' : 'Iniciar Sesion'}
      </NavLink>
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className=' text-[#BB6A72]'>
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
    <a className="md:hidden " href="#mobile-menu-aside">
      <MenuIcon 
      sx={{ fontSize: '20px' }}
      className='text-[#BB6A72] hover:text-slate-300 transition-all transform hover:scale duration-200 hover:ease-in-out'/>
    </a>
  );
}

function SearchToggle() {
  return <>
  <a href="#search-aside" className=' flex flex-row items-center space-x-2 text-[#BB6A72] '>
  <span className="hidden md:block text-sm text-[#BB6A72]">Buscar</span><SearchOutlinedIcon sx={{ fontSize: '20px' }}/>
  </a>
  </>
}

function CartBadge({count}: {count: number}) {
  return <a href="#cart-aside" className="flex text-sm text-[#BB6A72]">{count !== 0 ? <ShoppingCartFilledIcon sx={{ fontSize: '20px' }} />:<ShoppingCartOutlinedIcon sx={{ fontSize: '20px' }} />}  {count} </a>;
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

    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'text-[#BB6A72]',
  };
}