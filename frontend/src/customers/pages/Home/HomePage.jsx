import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import MultipleItemsCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import RestaurantCard from "../../components/RestarentCard/RestaurantCard";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user, dispatch]);

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="banner relative flex flex-col justify-center items-center -z-50">
        <div className="w-[50vw] text-center z-10">
          <h1 
            className="text-2xl lg:text-7xl font-bold py-5 italic"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            <span style={{ color: "#FF914D" }}>Go</span>
            <span style={{ color: "#FFFFFF" }}>Eats</span>
          </h1>
          <p className="text-xl lg:text-4xl text-gray-300">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>
        {/* Overlay for translucent black tint */}
        <div className="cover absolute inset-0"></div>
        <div className="fadout"></div>
      </section>

      {/* Top Meals Section */}
      <section className="p-10 lg:py-10 lg:px-20">
        <h2 className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Top Meals
        </h2>
        <MultipleItemsCarousel />
      </section>

      {/* Restaurant Cards Section */}
      <section className="px-5 lg:px-20">
        <h2 className="text-2xl font-semibold text-gray-400 py-3">
          Order From Our Handpicked Favorites
        </h2>
        <div className="flex flex-wrap items-center justify-around">
          {restaurant?.restaurants?.length > 0 ? (
            restaurant.restaurants.map((item, i) => (
              <RestaurantCard data={item} index={i} key={item.id || i} />
            ))
          ) : (
            <p className="text-gray-500 text-lg">No restaurants available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
