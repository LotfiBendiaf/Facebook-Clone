import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Image from "next/image"
import {useRef, useEffect, useState} from 'react';
import { db, storage } from "../firebase";
import { collection, doc, getDocs, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";



const InputBox = () => {
    const { data: session, status } = useSession();
    const inputRef = useRef(null)
    const postsCollection = collection(db, "posts");
    const UsersMessages = doc(db, "UsersMessages", "UM");
    const filePickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);
    const [docId, setDocId] = useState('');


    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollection);
        };

        getPosts();
    }, []);

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        };

        
    };

    const removeImage = () => {
        setImageToPost(null);
    }



    const sendPost = async (e) => {
        e.preventDefault();


        if(!inputRef.current.value) return;

        await addDoc(postsCollection,  {
            message: inputRef.current.value,
            postImage: imageToPost,
            name: session.user.name,
            image: session.user.image,
            email: session.user.email,
            timestamp: serverTimestamp()
        }).then(doc => {

            if(imageToPost){
                const imageRef = ref(storage, `posts/${doc.id}`);
                uploadString(imageRef, imageToPost, 'data_url').then(() => {
                setDocId(doc.id);
                console.log('Image uploaded, Doc Id ', doc.id)

                })


                removeImage();



                    // imageRef.on('state_change', null, error => console.error(error), 
                    // () => {
                    //     //Upload complete
                    //     ref('posts').child(doc.id).getDownloadURL().then(url => {
                    //         const postRef = doc(db, 'posts', doc.id);
                    //         setDoc(postRef, 
                    //         { 
                    //             postImage: url 
                    //         }, 
                    //         { merge: true });
                    //     })
                    // })

            }
        })

        inputRef.current.value = ''
        
    };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
        <div className="flex space-x-4 p-4 items-center">
            <Image 
                className="rounded-full"
                src={session.user.image}
                width={40}
                height={40}
                layout="fixed"
            />
            <form className="flex flex-1" action="">
                <input 
                id="input"
                className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                type="text"
                ref={inputRef}
                placeholder={`What's on your mind, ${session.user.name} ?`}/>

            <button hidden type="submit" onClick={sendPost}>Submit</button>
            </form>
            {imageToPost && (
                <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 
                transition duration-150 transform hover:scale-105 cursor-pointer">
                    <img className="h-10 object-contain" src={imageToPost} alt="" />
                    <p className="text-xs text-red-500 text-center">Remove</p>
                </div>
            )}
        </div>

        <div className="flex justify-evenly p-3 border-t">
            <div className="inputIcon">
                <VideoCameraIcon className="h-7 text-red-500" />
                <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
            </div>
            <div onClick={() => filePickerRef.current.click()} className="inputIcon">
                <CameraIcon className="h-7 text-green-400" />
                <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                <input ref={filePickerRef} hidden type="file" onChange={addImageToPost}/>
            </div>
            <div className="inputIcon">
                <EmojiHappyIcon className="h-7 text-yellow-300" />
                <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
            </div>

        </div>


    </div>
    
  )
}

export default InputBox