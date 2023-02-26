import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NormalCard from "../../component/Card/NormalCard";
import { typeOfSeries } from "../../redux/Slices/Film";
import { fetchRecommendations } from "../../services/ApiRequests";
export default function Recommend() {
  const navigate = useNavigate();
  const [recommend, setRecommend] = useState([]);
  const { id } = useParams();
  const type = useSelector(typeOfSeries);

  useEffect(() => {
    const asyncFetchingRecommendedVideos = async () => {
      const { results } = await fetchRecommendations(type, id);
      setRecommend(results);
    };
    asyncFetchingRecommendedVideos();
  }, [type, id]);
  return (
    <div className="max-w-screen w-full overflow-hidden">
      <p className="text-xl font-semibold">Recommended</p>
      <div className="grid-layout mt-5">
        {recommend
          ?.filter((r) => r.poster_path && r.backdrop_path)
          .slice(0, 10)
          .map((r) => (
            <NormalCard key={r.id} data={r} />
          ))}
      </div>
      <button
        onClick={() => navigate("/discover")}
        className="flex justify-center rounded-md mt-6 mx-auto bg-gray-700 p-2 text-white"
      >
        Discover More
      </button>
    </div>
  );
}
