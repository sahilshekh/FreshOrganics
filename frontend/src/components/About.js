// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Users, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            About FreshOrganics
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Bringing fresh, organic produce from local farms to your table.
          </p>
          <img
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWluZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Fresh organic vegetables"
            className="w-full h-auto aspect-[6/3] object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, FreshOrganics began with a simple mission: to make fresh, organic produce accessible to everyone. Partnering with local farmers, we source the highest-quality vegetables, harvested at their peak to ensure maximum flavor and nutrition. Our subscription model delivers farm-fresh goods straight to your door, supporting sustainable agriculture and healthy living.
              </p>
              <p className="text-gray-600">
                We believe in transparency, sustainability, and community. Every box you receive tells a story of hard-working farmers and the land they nurture. Join us in celebrating real food, grown with care.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://i.ibb.co/5xKnX0SR/comesoon.png"
                alt="Farmer in field"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Organic Excellence
              </h3>
              <p className="text-gray-600 text-sm">
                We source only certified organic produce, free from pesticides and GMOs, to ensure the purest quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Sprout className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sustainability
              </h3>
              <p className="text-gray-600 text-sm">
                Our eco-friendly packaging and local sourcing reduce carbon footprints, supporting a healthier planet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Community Focus
              </h3>
              <p className="text-gray-600 text-sm">
                We partner with local farmers, fostering strong communities and fair wages for those who grow our food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Join the FreshOrganics Family
          </h2>
          <p className="text-lg mb-6">
            Experience the joy of fresh, organic produce delivered to your door.
          </p>
          <Link
            to="/subscriptions"
            className="inline-flex items-center bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Explore Subscriptions
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;