import React, { useState } from 'react';

const RatingCard = ({ user, rating, description, photo }) => {
  return (
    <div className="bg-white bg-opacity-70 border rounded-lg p-4 shadow-md mb-6 backdrop-blur-md w-64 h-64 flex flex-col justify-between">
      <img src={photo} alt={`${user}'s feedback`} className="w-full h-32 object-cover rounded-lg" />
      <h3 className="font-bold text-lg mt-2">{user}</h3>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

const Rating = () => {
  const [ratings, setRatings] = useState([
    {
      user: 'John Doe',
      rating: 4,
      description: 'Very safe area, felt secure during my visit.',
      photo: '/public/dummy/brooke-cagle-Nm70URdtf3c-unsplash.jpg', 
    },
    {
      user: 'Jane Smith',
      rating: 5,
      description: 'Absolutely loved it! Highly recommend.',
      photo: '/public/dummy/panagiotis-falcos-Xm6cn4G1z0c-unsplash.jpg',
    },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newDescription, setNewDescription] = useState('');

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (newRating > 0 && newDescription) {
      const newRatingEntry = {
        user: 'Current User', 
        rating: newRating,
        description: newDescription,
        photo: 'public/dummy/profile.png', 
      };
      setRatings([...ratings, newRatingEntry]);
      setNewRating(0);
      setNewDescription('');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('public/safety/bgratings.jpg')` }}>
      <div className="backdrop-blur-sm bg-black bg-opacity-50 min-h-screen p-10">
        <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Safety Ratings</h2>

          <form onSubmit={handleRatingSubmit} className="mb-8">
            <div className="mb-4">
              <label className="block mb-2 text-white">Rate the safety:</label>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setNewRating(index + 1)}
                    className={index < newRating ? "text-yellow-400 text-3xl cursor-pointer" : "text-gray-300 text-3xl cursor-pointer"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-white">Description:</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-yellow-400"
                placeholder="Write your feedback..."
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg w-full max-w-xs"
              >
                Submit Rating
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ratings.map((rating, index) => (
              <RatingCard key={index} {...rating} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
