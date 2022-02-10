import { useState } from "react";
import SearchBox from "@components/SearchBox";

export default function Example() {
  const [{ repo, cached, time }, setResult] = useState({});

  return (
    <>
      <SearchBox
        onSubmit={async (value) => {
          const response = await fetch(`/api/repos/${value}`);
          setResult(await response.json());
        }}
      />
      {repo && (
        <div className="mb-6 text-center">
          <div>
            "{repo.login}" has {repo.public_repos} public repos
          </div>
          <div className="text-gray-700">
            Took {time}ms (
            <span className="font-bold text-red-700">
              CACHE{" "}
              {cached
                ? `HIT, ${Math.ceil(repo.time / time)}X faster)`
                : "MISS)"}
            </span>
          </div>
        </div>
      )}
      <div>
        <div
          className="relative rounded border border-red-400 bg-red-100 px-4 py-3 my-6 text-red-700"
          role="alert"
        >
          <strong className="font-bold">Note: </strong>
          <span className="block sm:inline">
            After you search once, hit the search button again to see Redis
            caching in action.
          </span>
        </div>
        <h3 className="mt-0 mb-2 text-center text-3xl font-medium leading-tight">
          How it works
        </h3>
        <p className="container mx-auto px-4">
          This app returns the number of repositories a Github account has. When
          you first search for an account, the server calls Github's API to
          return the response. This can take 100s of milliseconds. The server
          then adds the details of this slow response to Redis for future
          requests. When you search again, the next response comes directly from
          Redis cache instead of calling Github. The responses are usually
          usually in a millisecond or so making it blazing fast.
        </p>
      </div>
    </>
  );
}
