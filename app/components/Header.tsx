import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';
import type {LayoutProps} from './Layout';
import {
  Image,
} from '@shopify/hydrogen';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header sticky transition-all ease-in-out duration-200 hover:bg-[#F6EEE6]">
    <div className="md:px-12 xs:px-4 my-auto w-full items-center flex">

      <NavLink 
      
      prefetch="intent" to="/" style={activeLinkStyle} end>
        {/* <strong>Alma by tejidos</strong> */}
            <div className=" sm:w-32 my-auto xs:w-auto  xs:rounded-full xs-p-2  rounded-xl  hover:bg-[#F6EEE6]">
        <img className= {`xs:hidden md:flex  w-full object-cover`}  src='/logo.png'/>
        <img className= {`md:hidden xs:flex h-14 w-14 object-cover`}  src='/logo-small.png'/>
    </div>
      </NavLink>
      <div className='hidden w-auto md:block'>

      <HeaderMenu menu={menu} viewport="desktop" />
      </div>
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
    </header>
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
    <div className=" w-full h-full">
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          className=' '
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          >
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        console.log(item)
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
          className="header-menu-item"
          end
          key={item.id}
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to={url}
          >
            {item.title}
          </NavLink>
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
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <div className= "xs:hidden md:flex space-x-4 w-auto">

      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
      </div>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Buscar</a>;
}

function CartBadge({count}: {count: number}) {
  return <a href="#cart-aside">Carrito {count}</a>;
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
    color: isPending ? 'grey' : 'black',
  };
}
