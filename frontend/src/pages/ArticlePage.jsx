import React from 'react'
import NavBar from '../components/NavBar'
import Review from '../components/Review'


const ArticlePage = () => {
  return (
    <div className='w-full'>
      <NavBar />  
      <div className='grid grid-cols-[1fr_2.5fr] max-lg:grid-cols-1 h-full w-full pt-[80px] bg-gray-200'>
        <div className='flex justify-center p-10 px-2'>
          <div className='bg-white w-fit h-fit grid grid-cols-2 p-2 rounded-lg'>
            <div className='flex flex-col p-4 gap-3'>
              <p className='text-right'>Autorul articolului: </p>
              <p className='text-right'>Conferinta: </p>    
              <p className='text-right'>Statusul articolului:</p>                 
            </div>
            <div className='flex flex-col p-4 gap-3 '>
              <span className='font-bold'>*Nume Autor*</span> 
              <span className='font-bold'>*Nume conferinta*</span>
              <span className='font-bold text-red-700'>*Status articol*</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center p-10 px-2'>
          <div className='flex flex-col max-w-[700px] bg-white p-10 pl-16 gap-10'>
            <h1 className='font-bold text-center'>Article title</h1>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Fringilla taciti vitae torquent fames iaculis accumsan ridiculus aliquam. Praesent auctor orci diam fringilla enim facilisi. Odio fusce velit ligula non elit. Habitasse dui nunc ultrices phasellus, ante laoreet aptent. Curae sem sollicitudin consequat sollicitudin orci montes? Parturient laoreet senectus egestas nostra vehicula class. Sociosqu consequat placerat elit habitasse nec, amet pharetra. Donec ac laoreet himenaeos montes odio habitant eleifend curae.Dapibus convallis hac sed elementum sapien fringilla nunc arcu. Nulla magna molestie mi congue nascetur enim. Pretium ultrices efficitur fusce libero suscipit class molestie. Ut penatibus primis gravida feugiat condimentum, mattis auctor fermentum. Primis sit massa natoque luctus placerat blandit. Libero conubia lobortis varius leo congue convallis? Nullam aliquet cursus fringilla risus maecenas massa orci auctor. Pretium urna rhoncus consectetur per massa facilisis. Id magna at quisque integer dis class morbi ultrices per.Primis vel ex ridiculus euismod a finibus. Netus ullamcorper cras himenaeos sit dapibus fusce vestibulum maecenas ante. Condimentum a erat habitasse magna gravida; vehicula leo. Luctus elementum fringilla fringilla leo lectus ornare ligula ante. Iaculis sollicitudin sapien justo arcu blandit quis interdum imperdiet ac. Porta vulputate enim nisl, venenatis venenatis ipsum mus aenean tristique. Penatibus velit nisl ligula sit, inceptos magnis. Convallis quis eros nascetur donec rutrum leo.Dolor sociosqu penatibus morbi erat sociosqu vulputate nec. Nisl turpis parturient condimentum, gravida class vulputate. Penatibus blandit curabitur lectus magna dolor eleifend. Aenean habitasse viverra fames lectus potenti sem. Nisi imperdiet enim iaculis; fringilla id augue porttitor pretium? Elementum sapien primis dictumst conubia bibendum venenatis nec. Mus curae condimentum eu auctor efficitur eu auctor ligula. Cubilia gravida nascetur fermentum dolor ad dis velit suspendisse.</p>
          </div>
        </div>
        
      </div>


      <div>
        <div className='h-fit flex flex-wrap items-center p-10'>
          <h1 className='text-2xl font-bold  mr-2'>
            Review-urile criticilor
          </h1>
          <div>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
          </div>
        </div>

        <div className='flex flex-col px-10 max-lg:px-2 gap-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Review key={index} />
        ))}
        </div>
        
      </div>
      

      
    </div>
  )
}

export default ArticlePage