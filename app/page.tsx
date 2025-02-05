import { decksBySearch } from "@/lib/queries/decksBySearch"
import { auth } from "auth"
import { decksByAuthorEmail } from "@/lib/queries/decksByAuthorEmail"
import { getAuthorByEmail } from "@/lib/queries/getAuthorByEmail"
import SearchForm from "@/components/SearchForm"
import DeckCard, { DeckTypeCard } from "@/components/DeckCard"
// import { DECKS_QUERY_BY_AUTHOR_ID } from "@/sanity/lib/queries"
// import { sanityFetch, SanityLive } from "@/sanity/lib/live"
// import { getServerSession } from "next-auth/next"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; userid?: string }>
}) {
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await auth()
  console.log(session?.user?.email)

  let decks: any = undefined
  let author: any = undefined
  if (params.search !== null) {
    // by search
    const result1 = await decksBySearch(params.search)
    // const result1 = await sanityFetch({
    //   query: DECKS_QUERY_BY_AUTHOR_ID,
    //   params,
    // })
    decks = result1
  } else {
    if (session?.user?.email) {
      // by author email
      const result2 = await decksByAuthorEmail(session.user?.email)
      // const result2 = await sanityFetch({
      //   query: DECKS_QUERY_BY_AUTHOR_email,
      //   params,
      // })
      decks = result2
      author = await getAuthorByEmail(session.user?.email)
      // author = {
      //   username: result2.data.username,
      //   _id: result2.data._id,
      //   image: result2.data.image,
      //   bio: result2.data.bio,
      //   saved_decks: result2.data.saved_decks,
      // }
    }
  }
  if (true) {
    if (session?.user?.email) {
      const result2 = await decksByAuthorEmail(session.user?.email)
      // const result2 = await sanityFetch({
      //   query: DECKS_QUERY_BY_AUTHOR_ID,
      //   params,
      // })
      decks = result2
      // author = {
      //   username: result2.data.username,
      //   _id: result2.data._id,
      //   image: result2.data.image,
      //   bio: result2.data.bio,
      //   saved_decks: result2.data.saved_decks,
      // }
    }
  }
  console.log("decks", decks)
  console.log("author", author)
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Create Your Cards <br />
          Search For Decks
        </h1>

        <p className="sub-heading !max-w-3xl">Submit Your Ideas.</p>

        <SearchForm query={query} />
      </section>

      {/* <section className="section_container">
        <p className="text-30-semibold">
          {query
            ? `Search results for "${query}"`
            : session && session?.user
            ? "Your decks"
            : "Login to view your decks"}
        </p>

        <ul className="mt-7 card_grid">
          {decks?.length > 0 ? (
            decks.map((post: DeckTypeCard) => (
              <DeckCard
                key={post?.id}
                post={post}
                author={author}
                savedDecks={[]}
                // savedDecks={author.saved_decks ? author.saved_decks : []}
              />
            ))
          ) : (
            <p className="no-results">No Decks Found</p>
          )}
        </ul>
      </section> */}

      {/* <SanityLive /> */}
    </>
  )
}
