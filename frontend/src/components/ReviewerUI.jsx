import React, {useState} from "react";
import ShowAllArticles from "./ShowAllArticles";
import Button from "./Button";

const ReviewerUI = ({user}) => {
    const [activePage, setActivePage] = useState();

    const VIEW_ASSIGNED_ARTICLES = 1;

    return (
        <div className=' pt-[80px] h-full w-full'>
          <div className='grid grid-cols-[2fr_4fr] h-full w-full max-lg:grid-cols-1 max-lg:h-fit'>
            <div className='bg-yellow-100 h-full w-full px-8 py-8'>
              <div className='mb-8'>
                <p className='text-2xl font-bold text-center'>Bine ai venit, <span className='text-blue-800'>{user ? user.name : ""}</span>  !</p>
                <p className='text-xl text-center'>Rolul tau: <span className='text-xl font-bold text-blue-800'>{user ? user.role : ""}</span></p>
              </div>
              <div className='text-lg indent-20'>
                <p>
                  Ca reviewer, poți reviziona articolele la care ai fost atribuit, le poți marca drept aprobate și poți oferi feedback.
                </p>
                <p>
                  Gestionează toate articolele asignate cu ușurință, într-un singur loc.
                </p>
              </div>
              <div className='justify-center flex flex-col gap-4 px-16 mt-10'>
                <Button text={"Vezi articolele"} onClick={() => setActivePage(VIEW_ASSIGNED_ARTICLES)} />
                {/* <Button text={"Starea articolelor"} onClick={() => setActivePage(SHOW_ALL_ARTICLES_PAGE)} /> */}
              </div>
            </div>
            <div className=''>
              {activePage===VIEW_ASSIGNED_ARTICLES && <ShowAllArticles show_all={false} reviewer_id={11}/>}
              
            </div>
          </div>
        </div>
    );
}

export default ReviewerUI;