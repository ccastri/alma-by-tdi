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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


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
    
    <div className=" flex w-screen flex-col space-y- px-8 h-auto bg-[#fef6f6] overflow-x-hidden  overflow-y-hidden  ">
      <div className=' h-screen w-full '>
      <Slider/>
      </div>
      <div className="h-screen sm:h-auto bg-[#fafafa]  ">
         {/* <div className="absolute rounded-r-full blur-lg h-auto inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-[#f5f5f5] to-[#fafafa] z-40 shadow-md" /> */}

  {/* Gradiente derecho */}
  {/* <div className="absolute rounded-l-full blur-xl h-auto inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-[#f5f5f5] to-[#fafafa] z-40 shadow-md" /> */}
        {/* <div className="absolute rounded-b-full blur-xl  h-16  inset-x-0 top-10 w-full bg-gradient-to-b to-[rgba(0,0,0,0)] from-[#DFC7C7] z-10" /> */}
        {/* <div className="absolute rounded-t-full blur-xl  h-24  inset-x-0 bottom-0 w-full bg-gradient-to-t to-[rgba(0,0,0,0)] from-[#DFC7C7] z-10" /> */}
        <RecommendedProducts products={data.recommendedProducts} />
      </div>
      {/* <div className='flex  flex-row w-full '>

      </div> */}
      <div className="w-auto my-4 h-screen overflow-hidden transition-all    xs:mx-0   ">
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

    <div className='w-full flex md:flex-row space-y-4 py-8 xs:flex-col items-center md:justify-between h-screen md:space-x-8 justify-center    md:h-full'>
      <div className='h-[50%] md:w-[60%] md:h-screen  items-center w-full '>

    <img src="/european-like-street.jpeg" className=' md:w-full  object-cover w-screen h-full md:h-screen' alt="" />
      </div>
<Link
  className="md:h-[50%] h-[50%]  w-full md:w-[40%] flex"
  to={`/collections/${collection.handle}`}
>
  {image && (
    // <div className="group w-full relative m-0 h-full flex flex-row">
      <div className="w-full  group flex h-full transform items-center  hover:opacity-80  xs:hover:scale-105 hover:ease-in-out duration-200 hover:shadow-xl shadow-[#BB6A72]  border-[#DFC7C7]">
        <Image
          data={image}
          className=" md:w-full w-auto relative h-full  md:h-screen "
          aspectRatio="1/1"
          sizes="(min-width: 45em) 50vw, 100vw"
          />
          <p className="absolute bottom-0 m-4 p-4  group-hover:font-bold group-hover:text-black text-[#fafafa]  ease-in-out transition-all ">Tendencias</p>
      </div>
    
    )}
</Link>
</div>
  
// </>

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
    <div className="h-full flex flex-col z-10  bg-[#fafafa]">
      <>


      <motion.h2 
      initial={{ x: 250 }}  // posición inicial en la derecha
  animate={{ x: 0 }}    // posición final en el centro
  transition={{
    type: 'spring',     // tipo de transición (rebote)
    stiffness: 100,     // rigidez del rebote
    damping: 5,        // amortiguación del rebote
    duration: 1.5,      // duración de la animación
  }}  className="text-slate-900   text-xl -tracking-wide  items-center  font-light text-center py-4 h-auto  w-full">
    <span>
      <ArrowBackIosIcon 
        className=' mr-6 '  
        onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
      />
    </span>
    Productos Recomendados
    <span>
      <ArrowForwardIosIcon 
        className="ml-8" 
        onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
      />
      </span>
    </motion.h2>
    <Link
    className='w-full  text-slate-300'
     to="/collections/all">
      <p className='w-auto text-center text-[#DFC7C7] hover:font-semibold bg-[#fafafa] hover:text-slate-300 mx-auto'>
        Ver todo
      </p>
    </Link>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <motion.div
  className="  w-full h-full overflow-x-scroll  overflow-y-hidden  scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#fafa] scrollbar-thumb-rounded-md transition-all ease-in-out duration-200 space-x-6 flex z-20"

>
  <AnimatePresence initial={false}>
              {products.nodes.map((product:any) => (
                 <motion.div
        key={product.id}
        className="group group-hover:shadow-md xl:h-screen  md:w-1/3 lg:w-1/4  w-1/2    bg-white  justify-center  flex"
          initial={{ x: 0 }} // Initial position of the carousel
  animate={{ x: -currentIndex * cardWidth }} // Slide the carousel based on the currentIndex
  transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        exit={{ opacity: 0, x: 50 }} // Animation when item is removed
      >
                <Link
                  className="w-screen relative h-full xl:h-full transition-all transform hover:scale-105 hover:ease-in-out group-hover:text-gray-300 text-[#fafafa] font-semibold  flex flex-col"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1.5"
                    className=' object-cover   '
                    sizes="(min-width: 45em) 50vw, 100vw"
                  />
                  <motion.div className=' font-light text-slate-900 bg-[#fafafa] w-full  transition-all duration-200 flex   flex-col   group-hover:ease-in-out  '>
                  <p className='text-md w-full font-medium  text-slate-900     group-hover:text-gray-300 '>{product.title}</p>
                  <Money data={product.priceRange.minVariantPrice} />
                  </motion.div>

    </Link>
                  </motion.div>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </Await>
      </Suspense>

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
