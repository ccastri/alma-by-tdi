import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  type V2_MetaFunction,
} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {motion} from 'framer-motion'
import Slider from '../components/Slider'
import Reviews from '~/components/Reviews';
import Perks from '~/components/Perks';



// #BB6A72, #F6EEE6, #DFC7C7


export const meta: V2_MetaFunction = () => {
  return [{title: 'Alma by TDI'}];
};

export async function loader({context}: LoaderArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  console.log(data)
  return (
    // ! Aqui estoy quitando el overflow EN LA JUEGAAAA!!!
    <div className="home flex flex-col space-y-12 overflow-x-hidden xs:p-4 overflow-y-hidden md:p-12 ">
      {/* <div className='w-full overflow-x-scroll'> */}
      <Slider/>
      {/* </div> */}
      <RecommendedProducts products={data.recommendedProducts} />
      {/* <div className='flex  flex-row w-full '>

      </div> */}
      <div className="w-full my-6 h-auto overflow-hidden transition-all    xs:mx-0 xl:mx-12  transform  hover:opacity-80  hover:bg-gradient-to-t from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7] xs:hover:scale-105 hover:ease-in-out duration-200 hover:shadow-xl shadow-[#BB6A72] hover:border-2 border-[#DFC7C7]">
{/* Debo revisar que es lo que estoy consumiendo aqui porque lo que necesito son todas las colecciones */}
      <FeaturedCollection collection={data.featuredCollection} />
      </div>
      {/* <div className='w-full flex flex-col border'> */}

      <Reviews/>
      <Perks/>
      {/* </div> */}
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  const image = collection.image;
  return (
    <Link
      className=" hover:bg-gradient-to-t pt-2 from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7]"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className=" group  xs:m-0    relative">
          <p className="absolute w-full opacity-0 duration-200 h-full transition-all transform group-hover:ease-in-out group-hover:scale-125 group-hover:bg-gradient-to-t from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7] xs:text-xs tracking-tighter italic  pt-36    my-auto group-hover:opacity-80 text-center">En Tendencia</p>
          <Image data={image} className="object-cover w-full  " aspectRatio="1/1.5" sizes="(min-width: 45em) 20vw, 50vw" />
          {/* <>{console.log(collection)}</> */}
        </div>
      )}
      {/* <h1>{collection.title}</h1> */}
    </Link>
  );
}


// !THIS IS THE FUNCTION TO RENDER OUT Recommended products
function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <>


      <motion.h2 
      initial={{ x: 250 }}  // posición inicial en la derecha
  animate={{ x: 0 }}    // posición final en el centro
  transition={{
    type: 'spring',     // tipo de transición (rebote)
    stiffness: 100,     // rigidez del rebote
    damping: 50,        // amortiguación del rebote
    duration: 1.5,      // duración de la animación
  }}  className="text-[#886969] text-xs text-center mb-2 w-full">Productos Recomendados</motion.h2>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products h-full w-full overflow-x-scroll overflow-y-hidden scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#F6EEE6] scrollbar-thumb-rounded-md space-x-6 bg-[#fafaf] flex">
              {products.nodes.map((product) => (
                <div 
                key={product.id}
                className=" w-full  rounded-md  flex hover:bg-[#F6EEE6]">
                <Link
                  
                  className="w-full transition-all transform hover:scale-90 hover:ease-in-out hover:text-[#DFC7C7] text-[#886969] font-semibold recommended-product flex flex-col justify-between"
                  to={`/products/${product.handle}`}
                >

                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/2"
                    className=''
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  {/* <div className='h-20 justify-between px-2 flex flex-col'> */}

                  <p className='text-2xs w-auto flex-1 text-justify  '>{product.title}</p>
                  <p className='bottom-0 h-full text-xs'>
                    <Money data={product.priceRange.minVariantPrice} />
                  </p>
                  {/* </div> */}
                </Link>
                  </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}
export {RecommendedProducts}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection(
    $country: CountryCode,
    $language: LanguageCode
    
    ) @inContext(country: $country, language: $language) {
    collections(
      first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts (
    $country: CountryCode, 
    $language: LanguageCode
    ) @inContext(country: $country, language: $language) {
    products(first: 20, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
