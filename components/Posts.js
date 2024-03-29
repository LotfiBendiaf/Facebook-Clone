import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase";
import Post from "./Post";




const Posts = ({ posts }) => {
  const refCollection = collection(db, 'posts');
  const q = query(refCollection, orderBy("timestamp", "desc"));
  const [realTimePosts] = useCollection(q)
  return (
    <div>
    {
    realTimePosts ?
    realTimePosts?.docs.map((post) => (
      <Post 
        key={post.id}
        name={post.data().name}
        message={post.data().message}
        email={post.data().email}
        timestamp={post.data().timestamp}
        image={post.data().image}
        postImage={post.data().postImage}
        />
    )) : (
      posts.map(post => (
        <Post 
        key={post.id}
        name={post.name}
        message={post.message}
        email={post.email}
        timestamp={post.timestamp}
        image={post.image}
        postImage={post.postImage}
        />
        )
      ))}
  </div>
  )
}

export default Posts