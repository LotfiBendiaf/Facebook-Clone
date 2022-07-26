import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Feed from '../components/Feed';
import Header from '../components/Header'
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { db } from '../firebase';

export default function Home({ session, posts }) {
  if (!session) {
    return <Login/>;
  }
  else
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Facebook</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className='flex'>
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed posts={posts} />
        {/* Widgets */}
        <Widgets/>

      </main>

    </div>
  )
}

export async function getServerSideProps(context){
  //Get User
  const session = await getSession(context);

  const refCollection = collection(db, 'posts');
  const q = query(refCollection, orderBy("timestamp", "desc"));

  const posts = await getDocs(q);

  const docs = posts.docs.map(post => ({
    id: post.id,
    ...post.data(),
      timestamp: null
  }))
  
  return {
    props: {
      session,
      posts: docs
    }
  }
}