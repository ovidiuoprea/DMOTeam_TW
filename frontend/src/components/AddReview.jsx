import React, { useState } from "react";
import { createReview } from "../services/reviewsService";

function AddReview({user_id,article_id}) {
  const [rating, setRating] = useState(""); // Stochează ratingul
  const [feedback, setFeedback] = useState(""); // Stochează feedbackul
  const [message, setMessage] = useState(""); // Stochează un mesaj pentru utilizator
  const [isApproved, setIsApproved] = useState(false); // Stochează starea de aprobare


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    await createReview(rating,feedback,user_id,article_id,isApproved);

    // Resetarea formularului
    setRating("");
    setFeedback("");
    setIsApproved(false);
    setMessage("Review-ul a fost trimis cu succes!");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Adaugă un Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Rating (1-5):
          </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Feedback Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Feedback:
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Checkbox pentru aprobare */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isApproved}
            onChange={(e) => setIsApproved(e.target.checked)}
            id="approveCheckbox"
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="approveCheckbox" className="text-gray-700">
            Aprobat?
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Trimite
        </button>
      </form>

      {/* Mesaj pentru utilizator */}
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("succes") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddReview;
