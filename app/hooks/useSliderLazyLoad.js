import { useState } from "react";

const useSliderLazyLoad = (imageUrls, visibleSlidesCount) => {
    const [imageUrlsState, setImageUrlsState] = useState(imageUrls.map(() => null));

    // Function to load images for visible slides
    const loadImages = (currentSlide) => {
        const startIndex = currentSlide;
        const endIndex = currentSlide + visibleSlidesCount;

        const newImageUrls = [...imageUrlsState];

        for (let i = startIndex; i < endIndex; i++) {
            if (!imageUrlsState[i] && imageUrls[i]) {
                newImageUrls[i] = imageUrls[i];
            }
        }

        setImageUrlsState(newImageUrls);
    };

    return [imageUrlsState, loadImages];
};

export default useSliderLazyLoad;
