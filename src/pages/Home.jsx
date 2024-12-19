import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/shared/icons/Logo";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

const Home = () => {

    const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center mt-24">
      <Card
        title="Welcome to PodLounge!"
        text="PodLounge is a social media platform for podcasters and listeners. It is a place where you can connect with other podcasters and listen to their podcasts."
        icon={<Logo />}
      >
        <p className="text-[22px] leading-7 text-[#c4c5c5] text-center">
          PodLounge is a social media platform for podcasters and listeners. It
          is a place where you can connect with other podcasters and listen to
          their podcasts.
        </p>
        <div><Button onClick={() => navigate("/authenticate")} text="Let's Get Started" /></div>
        <div className="mt-[-20px] gap-1 flex mx-auto">
          <span className="text-[#0077ff]">Have an invite code?</span>
          <Link to="/login" className="text-[#0077ff] font-bold no-underline">Sign in</Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;


{/* <div className="w-[500px] max-w-[90%] min-h-[300px] bg-[#1d1d1d] p-7 rounded-[20px] text-center">
        <div
          id="headingWrapper"
          className="flex items-center justify-center gap-3 mb-7"
        >
          <Logo />
          <h1 className="text-2xl font-bold">Welcome to PodLounge!</h1>
        </div>
        <p className="text-[22px] leading-7 text-[#c4c5c5]">
          PodLounge is a social media platform for podcasters and listeners. It
          is a place where you can connect with other podcasters and listen to
          their podcasts.
        </p>
        <div>
          <button>
            <span>Get your username</span>
            <ArrowForward />
          </button>
        </div>
        <div>
          <span>Have an invite code?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div> */}