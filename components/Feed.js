import React from 'react'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'

const Feed = ({ posts }) => {
  return (
    <div className='flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto'>
        <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
            {/* Stories */}
            <Stories />
            {/* Input Box */}
            <InputBox/>
            {/* Post */}
            <Posts posts={posts}/>
        </div>
    </div>
  )
}

export default Feed