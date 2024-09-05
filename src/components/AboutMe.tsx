import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const AboutMeTabs = () => {
 

  return (
    <div className="w-[35%] bg-[#363c43] p-3 rounded-xl shadow-lg drop-shadow-lg shadow-black">
      <TabGroup>
        <TabList className="w-full p-2 bg-[#171717] rounded-2xl text-white flex items-center justify-between text-center gap-7">
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-[#282935] w-full p-2 rounded-lg text-gray-200 drop-shadow-2xl font-bold scale-105 transition-all ease-in-out"
                : "w-full bg-[#1d1d1d] p-2 rounded-xl text-gray-400"
            }
          >
            About Me
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-[#282935] w-full p-2 rounded-lg text-gray-200 drop-shadow-2xl font-bold scale-105 transition-all ease-in-out"
                : "w-full bg-[#1d1d1d] p-2 rounded-xl text-gray-400"
            }
          >
            Experiences
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-[#282935] w-full p-2 rounded-lg text-gray-200 drop-shadow-2xl font-bold scale-105 transition-all ease-in-out"
                : "w-full bg-[#1d1d1d] p-2 rounded-xl text-gray-400"
            }
          >
            Recommended
          </Tab>
        </TabList>
        <TabPanels className="mt-5 text-gray-400">
          <TabPanel>
            <p>
              Hello! I'm Dave, your sales rep here from Salesforce. I've been
              working at this awesome company for 3 years now. <br />I was born
              and raised in Albany, NY & have been living in Santa Carla for the
              past 10 years with my wife Tiffany and my 4-year-old twin
              daughters- Emma and Ella. Both of them are just starting school,
              so my calendar is usually blocked between 9-10 AM.
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              I have been working in the sales industry for the past 10 years. I
              started my career as a sales executive at a small startup in
              Albany, NY. <br /> I was responsible for generating leads and
              converting them into customers. After working there for 2 years, I
              moved to Santa Carla and joined Salesforce as a sales rep. I have
              been working here for the past 3 years and have been promoted
              twice. I am currently responsible for managing a team of 5 sales
              reps and generating revenue for the company.
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              I recommed this industry because it is very rewarding. You get to
              meet new people every day and help them solve their problems. It
              is also a very lucrative industry with a lot of growth
              opportunities. <br /> If you are good at building relationships and have
              a passion for sales, then this is the industry for you. I would
              recommend starting your career at a small company where you can
              learn the basics and then move to a bigger company like Salesforce
              where you can grow your career.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default AboutMeTabs;
