import React from 'react';
import Navbar from '../components/common/Navbar/Navbar';
import PageHeader from '../components/common/PageHeader/PageHeader';
import AboutSection from '../components/common/HomeSection/AboutSection';
import CounterSection from '../components/common/HomeSection/CounterSection';
import OurPartners from '../components/common/HomeSection/OurPartner';
import MapSection from '../components/common/HomeSection/MapSection';
import Footer from '../components/common/Footer/Footer';

function Page() {
  return (
    <>
      <Navbar />
      <PageHeader
        title={"About us"}
        backgroundImage={"/assets/slider4.jpg"}
        breadcrumbs={[]}
      />
      <AboutSection/>
      <CounterSection/>
      <OurPartners/>
      <MapSection/>
   
      {/* <section className="fresh-vegetable-section py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="fresh-image-2">
                <div 
                  className="relative w-full h-64 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://pixydrops.com/mediox-html/assets/images/about/about-1-1.jpg')" }}
                ></div>
              </div>
              <div className="fresh-image">
                <div 
                  className="relative w-full h-64 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://pixydrops.com/mediox-html/assets/images/about/about-1-1.jpg')" }}
                ></div>
              </div>
            </div>
            <div className="fresh-contain flex flex-col justify-center">
              <div>
                <div className="review-title mb-6">
                  <h4 className="text-lg font-semibold text-gray-700">About Us</h4>
                  <h2 className="text-3xl font-bold text-gray-900">About Company</h2>
                </div>
                <div className="delivery-list">
                  <p className="text-gray-600 mb-6">
                    Care-tex is a rehabilitation and orthopedic manufacturing company based in Lucknow, Uttar Pradesh. Care-tex was established in the year 2000 and as the name states it was formed with the motive to provide care and comfort to its user with the help of textile at minimum cost . The organization has shown a very rapid and healthy growth since from its starting and it’s one of the key companies in India providing good quality products at a reasonable price.We have always believed in giving back to community and over years it has become our major driving force to become a key player in the field of orthopedics not only in India but all over the world with this we pray to god to give us more strength to work on our goals to achieve them and revolutionize the orthopedic industry .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Footer/>
    </>
  );
}

export default Page;