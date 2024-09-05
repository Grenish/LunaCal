import { images } from "./assets";
import AboutMeTabs from "./components/AboutMe";
import Gallery from "./components/Gallery";

const App = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src={images.backGrid}
        alt=""
        className="pointer-events-none fixed z-[-1]"
      />
      <div className="flex flex-col gap-10 items-end h-screen justify-center p-10">
        <AboutMeTabs />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
