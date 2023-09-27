import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type V2_MetaFunction} from '@remix-run/react';
import Contact from '~/components/Contact';
export const meta: V2_MetaFunction = ({data}) => {
  return [{title: `${data.page.title}`}];
};

export async function loader({params, context}: LoaderArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });
  console.log(page)
  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div className="pt-32">
      <header>
        {/* <h1>{page.title}</h1> */}
      </header>
      <div className='w-full bg-[#fff0f0]'>

      {page.title === 'Nosotros' && <Contact/>}
      </div>
      <main dangerouslySetInnerHTML={{__html: page.body}} />
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
