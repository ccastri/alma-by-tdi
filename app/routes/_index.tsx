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
// import Slider from '../components/Slider'

const sliderItems:string[] = [
'PhotoRoom_20230811_171642.jpg',
'PhotoRoom_20230811_171700.jpg',
'PhotoRoom_20230811_172032.jpg',
'PhotoRoom_20230811_172055.jpg',
'PhotoRoom_20230811_172118.jpg',
'PhotoRoom_20230811_172356.jpg',
'PhotoRoom_20230811_172423.jpg',
'PhotoRoom_20230811_172447.jpg',
]

// #BB6A72, #F6EEE6, #DFC7C7
const Slider = () => {
  return (
    <div className='w-full h-[calc(100vw- 64px)] rounded-md   bg-[#F6EEE6] py-12  '>
      <div 
       className=' h-full flex space-x-44 overflow-x-scroll overflow-y-hidden scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#F6EEE6] scrollbar-thumb-rounded-md rounded-md  bg-[#DFC7C7]'>
        {sliderItems.map((img, index)=>
          <div className='  flex-shrink-0 w-full min-h-full rounded-md' key={index}
            // whileHover={{ scale: 1.1 }} // Ejemplo: escala al pasar el cursor
          >
            <img 
              className="w-full mx-auto transform transition-all duration-200  ease-in-out hover:scale-105 cursor-grab  h-[calc(100vw- 64px)] object-cover"
              src={`/${img}`} alt={`Image ${index}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

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
    <div className="home overflow-x-hidden">
      {/* <div className='w-full overflow-x-scroll'> */}
      <Slider/>
      {/* </div> */}
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
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
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <>
      <motion.h2 animate={{x:250}}>Productos Recomendados</motion.h2>
      </>
      <Suspense fallback={<div>Cargando...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
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
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
