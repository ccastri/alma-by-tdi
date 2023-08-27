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
  return (
    // ! Aqui estoy quitando el overflow EN LA JUEGAAAA!!!
    <div className="home flex flex-col space-y-12 overflow-x-hidden p-12 ">
      {/* <div className='w-full overflow-x-scroll'> */}
      <Slider/>
      {/* </div> */}
      <div className="w-[33.33%]  transition-all mt-12 mb-12 mx-6 rounded-md transform  hover:opacity-80 hover:bg-[#F6EEE6] hover:scale-125 hover:ease-in-out duration-200 hover:shadow-xl shadow-[#BB6A72] hover:border-2 border-[#DFC7C7]">

      <FeaturedCollection collection={data.featuredCollection} />
      </div>
      <RecommendedProducts products={data.recommendedProducts} />
      <div className='flex  flex-row w-full '>

      </div>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  const image = collection.image;
  console.log(collection)
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection group  m-6 rounded-md  relative">
          <h2 className="absolute opacity-0 duration-200 transition-all transform hover:ease-in-out   bottom-0 p-4 rounded bg-[#F6EEE6] my-auto group-hover:opacity-80">En Tendencia</h2>
          <Image data={image} className="" sizes="(min-width: 45em) 20vw, 50vw" />
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
  }}  className="text-[#886969]">Productos Recomendados</motion.h2>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products flex">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >

                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
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
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
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
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
