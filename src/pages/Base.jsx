import Landing from "./Landing";
import Services from "./Services";
import Packages from "./Packages";
import Blogs from "./Blogs";
import Footer from "./Footer";
// import Review from './pages/Review';
const Base = () => {
  return (
    <>
      <div className="content">
        <Landing />
      </div>
      <Services />
      <Packages />
      <Blogs />
      {/* <Review/> */}
      <Footer/>
    </>
  );
};
export default Base;
