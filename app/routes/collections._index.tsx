import {useLoaderData, Link} from '@remix-run/react';
import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';

export async function loader({context, request}: LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections">
      <h1>Colecciones</h1>
      <Pagination connection={collections}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Cargar Previos</span>}
            </PreviousLink>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Cargar mas ↓</span>}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  );
}

function CollectionsGrid({collections}: {collections: CollectionFragment[]}) {
  return (
    <div className="grid  xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
      {collections.map((collection, index) => (
        <div className="hover:scale-105 transition-all transform hover:ease-in-out " key={index}>

        <CollectionItem
        
        key={collection.id}
        collection={collection}
          index={index}
          />
          </div>
      ))}
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="collection-item p-4 group hover:text-[#F6EEE6] text-[#BB6A72]"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {collection.image && (
        <Image
          alt={collection.image.altText || collection.title}
          aspectRatio="1/1.3"
          className='object-contain group '
          data={collection.image}
          loading={index < 3 ? 'eager' : undefined}
        />
      )}
      <h5 className='py-4 rounded-b-md text text-[#BB6A72] text-center group-hover:text-[#F6EEE6] group-hover:bg-[#DFC7C7]'>{collection.title}</h5>
    </Link>
  );
}

export const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
