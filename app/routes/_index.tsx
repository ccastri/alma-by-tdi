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
  console.log(recommendedProducts)

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  console.log(data)
  return (
    // ! Aqui estoy quitando el overflow EN LA JUEGAAAA!!!
    
    <div className=" flex w-full flex-col space-y- h-auto bg-[#fef6f6] overflow-x-hidden  overflow-y-hidden  ">
      <div className=' justify-between mx-auto items-center h-screen w-screen bg-[#F6EEE6]'>
      <Slider/>
      </div>
      <div className=" bg-[#fafafa] relative ">
         {/* <div className="absolute rounded-r-full blur-lg h-auto inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-[#f5f5f5] to-[#fafafa] z-40 shadow-md" /> */}

  {/* Gradiente derecho */}
  {/* <div className="absolute rounded-l-full blur-xl h-auto inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-[#f5f5f5] to-[#fafafa] z-40 shadow-md" /> */}
        <div className="absolute rounded-b-full blur-xl  h-16  inset-x-0 top-10 w-full bg-gradient-to-b to-[rgba(0,0,0,0)] from-[#DFC7C7] z-10" />
        <RecommendedProducts products={data.recommendedProducts} />
        <div className="absolute rounded-t-full blur-xl  h-24  inset-x-0 bottom-0 w-full bg-gradient-to-t to-[rgba(0,0,0,0)] from-[#DFC7C7] z-10" />
      </div>
      {/* <div className='flex  flex-row w-full '>

      </div> */}
      <div className="w-full my-6 h-auto overflow-hidden transition-all    xs:mx-0 xl:px-6  transform  hover:opacity-80  hover:bg-gradient-to-t from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7] xs:hover:scale-105 hover:ease-in-out duration-200 hover:shadow-xl shadow-[#BB6A72] hover:border-2 border-[#DFC7C7]">
{/* Debo revisar que es lo que estoy consumiendo aqui porque lo que necesito son todas las colecciones */}
      <FeaturedCollection collection={data.featuredCollection} />
      </div>
      {/* <div className='w-full flex flex-col border'> */}
<div className='w-full'>

      <Reviews/>
</div>

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
  className="xs:relative w-full px-2 flex"
  to={`/collections/${collection.handle}`}
>
  {image && (
    <div className="group w-full relative m-0 h-auto flex flex-row">
      <div className="w-full bg-[#fafafa]">
        <Image
          data={image}
          className="object-contain w-full h-auto md:h-72"
          aspectRatio="1/2"
          sizes="(min-width: 45em) 20vw, 50vw"
        />
      </div>
      <span className="w-full  absolute  opacity-0 duration-200 h-full transition-all transform group-hover:ease-in-out group-hover:scale-105 group-hover:bg-gradient-to-t from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7] xs:text-xs tracking-tighter italic xs:pt-36 md:pt-0 my-auto group-hover:opacity-80 text-center">
        En Tendencia
      </span>
    </div>
  )}
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
    <div className=" z-10 bg-gray-500">
      <>


      <motion.h2 
      initial={{ x: 250 }}  // posición inicial en la derecha
  animate={{ x: 0 }}    // posición final en el centro
  transition={{
    type: 'spring',     // tipo de transición (rebote)
    stiffness: 100,     // rigidez del rebote
    damping: 5,        // amortiguación del rebote
    duration: 1.5,      // duración de la animación
  }}  className="text-[#fafafa] text-lg tracking-wide font-bold text-center pt-6 h-auto  w-full">Productos Recomendados</motion.h2>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className=" h-full rounded  w-full overflow-x-scroll overflow-y-hidden scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#fafa] scrollbar-thumb-rounded-md transition-all ease-in-out duration-200 space-x-6 flex z-40">
              {products.nodes.map((product:any) => (
                <div 
                key={product.id}
                className=" group group-hover:shadow-md w-36 items-center p-4 justify-center  rounded-md  flex ">
                 
                <Link
                  
                  className="w-auto  rounded-md h-auto transition-all transform hover:scale-105 hover:ease-in-out group-hover:text-gray-300 text-[#fafafa] font-semibold  flex flex-col"
                  to={`/products/${product.handle}`}
                >

                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1.5"
                    className=''
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  {/* <div className='h-20 justify-between px-2 flex flex-col'> */}

                  <div className=' transition-all duration-200 flex flex-col items-center justify-center  group-hover:text-gray-300 group-hover:ease-in-out rounded-b mx-4 text-sm'>
                  <p className='text-xs w-36 flex-wrap text-center  group-hover:text-gray-300 '>{product.title}</p>
                  <Money data={product.priceRange.minVariantPrice} />
                  </div>

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
      first: 6) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;
// El querry tenia dos propiedades mas acompañando a first: sortKey: UPDATED_AT, reverse: true
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
    images(first: 3) {
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
