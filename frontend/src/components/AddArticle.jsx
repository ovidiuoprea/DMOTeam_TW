import React, { useState } from 'react';
import { getCurrentAuthenticatedUser } from '../services/userService';
import { createArticle } from '../services/articleService';

const AddArticle = ({ conference_id }) => {
    const [used,setUsed] = useState(false);
  const user = getCurrentAuthenticatedUser();
  const [articleItem, setArticleItem] = useState({
    title: '',
    content: '',
    conference_id: Number(conference_id),
    author_id: user.user_id,
    reviewer_id1: null,
    reviewer_id2: null,
    is_approved: false,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setArticleItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (articleItem.title.length > 1 && articleItem.content.length > 1) {
      const result = await createArticle(articleItem);
      if(result.ok){
        setUsed(true);
        window.confirm('added ' + result.title);
      }
    }
  };

  return (
    <div className="px-16 py-2">
      <p className="text-3xl mb-8 mt-4 font-bold">Creare Articol</p>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-2 mt-2">
          <label htmlFor="articleTitle" className="block text-m font-medium text-gray-600 mb-2">
            Titlu Articol
          </label>
          <input
            type="text"
            id="articleTitle"
            name="title"
            placeholder="Introdu titlul articolului ..."
            value={articleItem.title}
            onChange={handleOnChange}
            required
            className="w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="articleContent" className="block text-m font-medium text-gray-600 mb-2">
            Conținutul Articolului
          </label>
          <textarea
            id="articleContent"
            name="content"
            placeholder="Scrie Articolul ..."
            value={articleItem.content}
            onChange={handleOnChange}
            required
            className="w-full min-h-[40vh] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className={`w-fit px-8 text-white py-2 rounded-lg ${
                articleItem.title.length < 2 || articleItem.content.length < 2

                ? 'bg-gray-700'
                : used ? 'bg-green-700' : 
                'bg-blue-800 hover:bg-blue-600 transition-colors'
            }`}
            disabled={articleItem.title.length < 2 || articleItem.content.length < 2}
          >
            Adăugare Articol 
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
