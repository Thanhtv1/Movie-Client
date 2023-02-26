import React, { memo } from "react";
import { fetchRelatedVideos } from "../../services/ApiRequests";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateRelatedVideos } from "../../redux/Slices/Detail";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectVideos } from "../../redux/Slices/Detail";

function RelatedVideos() {
  const {type, id } = useParams();
  const dispatch = useDispatch();
  const relatedItems = useSelector(selectVideos);

  useEffect(() => {
    const asyncFetchingRelatedVideos = async () => {
      try {
        const { results } = await fetchRelatedVideos(type, id);
        dispatch(updateRelatedVideos(results));
      } catch (error) {
        console.log(error);
      }
    };
    asyncFetchingRelatedVideos();
  }, [dispatch, type, id]);
  return (
    <div className="mt-3">
      <h1 className="text-xl font-medium py-3">Related Videos</h1>
      <div className="flex flex-col w-full md:flex-row flex-wrap ">
        {relatedItems && relatedItems?.length > 0
          ? relatedItems
              .filter((item) => item.type === "Trailer" && item.key !== null)
              .map((item) => (
                <ul key={item.id}>
                  <li className="md:mr-4 mb-3">
                    <iframe
                      className="w-full md:w-52 h-56"
                      src={`https://www.youtube.com/embed/${item.key}`}
                      allowFullScreen
                      title="video"
                    />
                  </li>
                </ul>
              ))
          : "No Related Videos Found"}
      </div>
    </div>
  );
}

export default memo(RelatedVideos);
