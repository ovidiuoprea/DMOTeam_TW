import React from "react";
import { useState } from "react";
import ToggleSwitchButton from "./ToggleSwitchButton/ToggleSwitchButton";
import Button from "./Button";

const NotLoggedInUI = () => { 
    const [isShowingLoginButtons, showLoginButtons] = useState(false);

    const oneTimeLogin = (role) => {
        console.log("Hello", role);
    }
    return (
        <div className=' pt-[80px] h-full w-full'>
          <div className='grid grid-cols-[2fr_4fr] h-full w-full max-lg:grid-cols-1 max-lg:h-fit'>
            <div className='bg-yellow-100 h-full w-full px-8 py-8'>
              <div className='mb-8'>
                <p className='text-2xl font-bold text-center'>Bine ai venit!</p>
              </div>
              <div className='text-lg indent-20'>
                <p>
                    Scopul aplicației de față este să permită organizarea unor conferințe. Pentru a continua, este necesar să te autentifici sau înregistrezi.
                    
                </p>
                <p>
                    La înregistrare, poți selecta rolul tău în această aplicație - poți fi organizator, reviewer sau autor.
                </p>
                {isShowingLoginButtons && 
                    <div  className="mt-16 flex flex-col items-center justify-center gap-8">
                        <Button text={"Organizer instant login"} onClick={() => oneTimeLogin("Organizer")} />
                        <Button text={"Reviewer instant login"} onClick={() => oneTimeLogin("Reviewer")} />
                        <Button text={"Author instant login"} onClick={() => oneTimeLogin("Author")} />
                    </div>}
                
              </div>
            </div>
      
            <div className="self-end justify-self-end mb-8 mr-8">
                  <ToggleSwitchButton isShowingLoginButtons={isShowingLoginButtons} handleToggleSwitchChange={()=>{showLoginButtons(!isShowingLoginButtons)}} />
            </div>
          </div>
        </div>
    )
}

export default NotLoggedInUI;