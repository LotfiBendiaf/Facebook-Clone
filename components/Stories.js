import React from 'react'
import StoryCard from './StoryCard'
import { useSession } from "next-auth/react";


const Stories = () => {
    const { data: session, status } = useSession();
    const stories = [

        {
            name: "Lotfi Bendiaf",
            src: "https://links.papareact.com/zvy",
            profile: session.user.image,
        },
        {
            name: "Elon Musk",
            src: "https://links.papareact.com/4zn",
            profile: "https://links.papareact.com/kxk"
        },
        {
            name: "Jeff Bezos",
            src: "https://links.papareact.com/k2j",
            profile: "https://links.papareact.com/f0p"
        },
        {
            name: "Mark Zuckerberg",
            src: "https://links.papareact.com/xql",
            profile: "https://links.papareact.com/snf"
        },
        {
            name: "Bill Gates",
            src: "https://links.papareact.com/4u4",
            profile: "https://links.papareact.com/zvy"
        },
       
]
  return (
    <div className='flex justify-center space-x-3 mx-auto'>
        {stories.map(story =>
            <StoryCard 
                key={story.src}
                name={story.name} 
                src={story.src}
                profile={story.profile}/>
            )}
        
    </div>
  )
}

export default Stories