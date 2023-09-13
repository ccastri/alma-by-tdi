import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  type V2_MetaFunction,
} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {AnimatePresence, motion} from 'framer-motion'
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
      <div className=' justify-between mx-auto items-center h-full w-screen bg-[#F6EEE6]'>
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
      <div className="w-full my-6 h-auto overflow-hidden transition-all    xs:mx-0 xl:px-6  transform  hover:opacity-80  xs:hover:scale-105 hover:ease-in-out duration-200 hover:shadow-xl shadow-[#BB6A72] hover:border-2 border-[#DFC7C7]">
{/* Debo revisar que es lo que estoy consumiendo aqui porque lo que necesito son todas las colecciones */}
      <FeaturedCollection collection={data.featuredCollection} />
      </div>
      {/* <div className='w-full flex flex-col border'> */}
<div>

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
<>
      <h3 className="text-center font-bold leading-tight tracking-widest text-[#BB6A72] py-2 text-3xl">¡Enterate de las nuevas tendencias en Alma!</h3>
    <div className='w-full md:flex  md:px-20 flex-row md:h-screen'>
    <img src="/pink-girl-bg.jpg" className='md:w-full w-auto px-8 h-screen mx-auto' alt="" />
<Link
  className=" w-full  flex"
  to={`/collections/${collection.handle}`}
>
  {image && (
    // <div className="group w-full relative m-0 h-full flex flex-row">
      <div className="w-full px-8 h-screen ">
        <Image
          data={image}
          className=" md:w-full w-auto  h-screen "
          aspectRatio="1/1"
          sizes="(min-width: 45em) 50vw, 100vw"
          />
      </div>
    
    )}
</Link>
</div>
  
</>

);
}

{/* <span className="w-full  absolute  opacity-0 duration-200 h-full transition-all transform group-hover:ease-in-out group-hover:scale-105 group-hover:bg-gradient-to-t from-[#F6EEE6] via-[#BB6A72] to-[#DFC7C7] xs:text-xs tracking-tighter italic xs:pt-36 md:pt-0 my-auto group-hover:opacity-80 text-center">
  En Tendencia
</span> */}

// !THIS IS THE FUNCTION TO RENDER OUT Recommended products
function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 200;
  return (
    <div className=" z-10 bg-[#fafafa]">
      <>


      <motion.h2 
      initial={{ x: 250 }}  // posición inicial en la derecha
  animate={{ x: 0 }}    // posición final en el centro
  transition={{
    type: 'spring',     // tipo de transición (rebote)
    stiffness: 100,     // rigidez del rebote
    damping: 5,        // amortiguación del rebote
    duration: 1.5,      // duración de la animación
  }}  className="text-[#BB6A72] italic text-lg tracking-wider bg-slate-200 items-center  font-bold text-center py-6 h-auto  w-full">Productos Recomendados</motion.h2>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <motion.div
  className="h-full rounded w-full overflow-x-scroll overflow-y-hidden py-8 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#fafa] scrollbar-thumb-rounded-md transition-all ease-in-out duration-200 space-x-6 flex z-40"
  initial={{ x: 0 }} // Initial position of the carousel
  animate={{ x: -currentIndex * cardWidth }} // Slide the carousel based on the currentIndex
  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
>
  <AnimatePresence initial={false}>
              {products.nodes.map((product:any) => (
                 <motion.div
        key={product.id}
        className="group group-hover:shadow-md w-44 border-2  items-center px-4 bg-white  justify-center rounded-md flex"
        exit={{ opacity: 0, x: 50 }} // Animation when item is removed
      >
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
                  <div className=' transition-all duration-200 flex text-[#BB6A72]  flex-col items-center justify-center  group-hover:text-gray-300 group-hover:ease-in-out rounded-b mx-4 text-sm'>
                  <p className='text-xs w-36 flex-wrap text-[#BB6A72]  text-center  group-hover:text-gray-300 '>{product.title}</p>
                  <Money data={product.priceRange.minVariantPrice} />
                  </div>

    </Link>
                  </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Await>
      </Suspense>
      <br />
            <div className='flex space-x-2 w-full justify-center items-center'>
              <button onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}>
  Previous
</button>
<button onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}>
  Next
</button></div>
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
