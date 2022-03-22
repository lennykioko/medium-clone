import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Post from '../components/Post';
import { sanityClient } from "../sanity";
import { IPost } from "../typings";
interface Props {
  posts: IPost[]
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    description,
    mainImage,
    slug,
    author-> {
      name,
      image
  }
  }`

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }
}

export default Home
