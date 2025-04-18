import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Users, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          {/* Desktop Hero */}
          <div className="hidden md:block">
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

          {/* Mobile Hero */}
          <div className="md:hidden relative">
            <img
              src="https://i.ibb.co/5xKnX0SR/comesoon.png"
              alt="Farm fresh produce"
              className="w-full h-60 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-green-900/60 to-transparent">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to  <span className="text-green-700">OnlyFams</span> -where your daily dose of farm-fresh goodness . </h1>
              <h2 className="text-3xl font-bold text-white"></h2>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: Our Story Section */}
      <section className="hidden md:block py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-green-700 mb-4">100% Green</h2>
              <p className="text-gray-600 mb-4">
              We’re a bunch of farm-loving foodies on a mission to make eating
clean, green, and crazy convenient. Think of us as your produce plug
– no shady middlemen, just straight-up fresh fruits and veggies from
local farms, picked with love and delivered daily.
              </p>
              <p className="text-gray-600">
                We believe in transparency, sustainability, and community. Every box you receive
                tells a story of hard-working farmers and the land they nurture. Join us in
                celebrating real food, grown with care.
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

      {/* Desktop: Our Values Section */}
      <section className="hidden md:block bg-green-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8 text-green-700">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Organic Excellence</h3>
              <p className="text-gray-600 text-sm">
                We source only certified organic produce, free from pesticides and GMOs, to ensure
                the purest quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Sprout className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Our eco-friendly packaging and local sourcing reduce carbon footprints, supporting a
                healthier planet.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Focus</h3>
              <p className="text-gray-600 text-sm">
                We partner with local farmers, fostering strong communities and fair wages for those
                who grow our food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: Our Mission Section */}
      <section className="md:hidden bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold text-green-700 mb-6">100% GREEN</h2>
          <p className="text-base leading-relaxed text-gray-700">
          We’re a bunch of farm-loving foodies on a mission to make eating
clean, green, and crazy convenient. Think of us as your produce plug
– no shady middlemen, just straight-up fresh fruits and veggies from
local farms, picked with love and delivered daily.
          </p>
        </div>
      </section>

      {/* Mobile: Our Commitment Section */}
      <section className="md:hidden bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-6">Our Goal?</h2>
          <p className="text-base leading-relaxed text-gray-700">
          Want to make eating clean, green, and outrageously
fresh as easy as scrolling through your feed? No
middlemen, no mystery, just juicy tomatoes, crunchy
cucumbers, and leafy greens that didn’t spend 12
days in a warehouse wondering where they went
wrong in life…….
          </p>
        </div>
      </section>

      {/* Mobile: Why You’ll Love Us Section */}
      <section className="md:hidden bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-8">Why You’ll Love Us</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <Sprout className="h-8 mr-16 w-8 text-green-600" />
              <div className="mr-10">
                <h3 className="text-lg font-medium">Fresh Daily Deliveries</h3>
                <p className="text-sm text-gray-600">Daily deliveries of seriously fresh produce.</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-medium">Local Farmer Partnerships</h3>
                <p className="text-sm text-gray-600">Sourced straight from local farmers who
                know their soil.</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-lg font-medium">Sustainable Packaging</h3>
                <p className="text-sm text-gray-600">Zero-waste packaging (because the planet is
                  fam too).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile and Desktop: Call-to-Action Section */}
      <section className="bg-green-700 py-12 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join the OnlyFarms Community</h2>
          <p className="text-base mb-6">Experience the difference of fresh, organic produce at your doorstep.</p>
          <Link
            to="/subscriptions"
            className="inline-flex items-center bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors duration-300"
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