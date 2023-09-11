/**
 * A side bar component with Overlay that works without JavaScript.
 * @example
 * ```ts
 * <Aside id="search-aside" heading="SEARCH">`
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  id = 'aside',
}: {
  children?: React.ReactNode;
  heading: React.ReactNode;
  id?: string;
}) {
  return (
    <div aria-modal className="overlay p-4 bg-[#fafafa] z-50" id={id} role="dialog">
      <button
        className="close-outside"
        onClick={() => {
          history.go(-1);
          window.location.hash = '';
        }}
      />
      <>
        <div className="flex  items-center px-2 justify-between space-x-2 mb-4">
          <div >{heading}</div>
          <CloseAside />
        </div>
        <main>{children}</main>
      </>
    </div>
  );
}

function CloseAside() {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <span className="close font-bold text-[#BB6A72]  hover:text-slate-300  text-center h-8 text-md w-8 border-2 border-[#BB6A72]  no-underline hover:border-slate-300 rounded-full cursor-pointer" onClick={() => history.go(-1)}>
      &times;
    </span>
  );
}
