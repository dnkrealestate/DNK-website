"use client";

import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const YouTubeFeed = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const videoPlayerRef = useRef(null);
  const videosPerPage = 20;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=PLPiY8b2lNU8av9zqdNysCafoxL4KUCHGR&key=AIzaSyA-OOedaGN2MrPLyJErWwF417ItfWurCxQ`
        );
        const data = await response.json();
        const videoItems = data.items.filter(
          (item) => item.snippet?.resourceId?.videoId
        );
        setVideos(videoItems);
        setSelectedVideo(videoItems[0]);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const offset = currentPage * videosPerPage;
  const currentVideos = videos.slice(offset, offset + videosPerPage);
  const pageCount = Math.ceil(videos.length / videosPerPage);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setTimeout(() => {
      videoPlayerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full bg-[#040406] flex items-center justify-center">
      <div className="container max-w-[1240px] py-5 px-4 md:py-9">
        {selectedVideo && (
          <div ref={videoPlayerRef} className="mb-8">
            <div className="aspect-video w-full mb-4">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src={`https://www.youtube.com/embed/${selectedVideo.snippet.resourceId.videoId}?rel=0`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="text-xl font-semibold">
              {selectedVideo.snippet.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {selectedVideo.snippet.description.slice(0, 150)}...
            </p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6">Latest Podcast Video</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentVideos.map((video) => (
            <div
              key={video.etag}
              onClick={() => handleVideoClick(video)}
              className="cursor-pointer transition hover:scale-[1.02]"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="rounded-lg w-full"
              />
              <p className="mt-2 text-sm font-medium">{video.snippet.title}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-5 pagination-block">
          <ReactPaginate
            className="flex gap-2 text-white items-center"
            previousLabel={<IoIosArrowBack className="text-[1.5rem]" />}
            nextLabel={<IoIosArrowForward className="text-[1.5rem]" />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"previous-button"}
            nextClassName={"next-button"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubeFeed;
