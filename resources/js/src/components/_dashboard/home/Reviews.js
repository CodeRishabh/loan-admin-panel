import React from "react";
import Carousel from "react-elastic-carousel";
import { FaRegStar, FaStar } from "react-icons/fa";
import { topReviews } from "../../../api";
import { useEffect } from "react";
import { useState } from "react";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 }
];

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(
    () => {
      topReviews().then((res) => {
        setReviews(res);
      })
    },
    []
  );

  return (
    <div>
      <Carousel
        itemPadding={[0, 30]}
        transitionMs={400}
        enableAutoPlay
        autoPlaySpeed={2500}
        className="attraction-carousel my-5"
        focusOnSelect={true}
        breakPoints={breakPoints}
      >
        {reviews.map(rev =>
          <div
            className="row testimonial align-items-center"
            style={{ width: "18rem" }}
          >
              <div className="col-12" style={{textAlign: 'left', marginBottom: '6px'}}>
              <h4 className="testimonial-name">
                {rev.firstname}
              </h4>
            </div>
            <div className="col-12">
              <div className="testimonial__details mb-0">
                <div className="d-flex">
                {[...Array(5)].map((elementInArray, index) =>
                <div key={index}>
                    {
                  (index<rev.rating) ? (<FaStar size={30} />): (<FaRegStar size={30}  />)
                    }
                </div>
              )}
                </div>
              </div>
            </div>

            <div className="col-12">
              <p className="testimonial-text mb-25">
                {rev.review}
              </p>
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
}
