import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import { VideoForm } from "../components/VideoForm";

export const CreateVideo = () => {
  return (
    <>
      <Navigation></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu></SideMenu>
        <VideoForm></VideoForm>
      </div>
    </>
  );
};