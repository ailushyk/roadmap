export const FooterLinks = () => {
  return (
    <div className="mb-24 flex max-w-lg flex-col gap-8 text-center sm:flex-row lg:mb-0 lg:text-left">
      <a
        href="https://cybertwierdza.cybsecurity.org/iii-sezon-lct?utm_source=roadmap&utm_medium=roadmap&utm_campaign=roadmap"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Docs{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Find in-depth information about Cyber Fortress.
        </p>
      </a>
      <a
        href="https://cybertwierdza.cybsecurity.org/iii-sezon-lct?utm_source=roadmap&utm_medium=roadmap&utm_campaign=roadmap"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          League{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Find information about Cyber Fortress - Season III.
        </p>
      </a>
    </div>
  )
}
