import ImageButton from "@/ui/components/image-button";
import RoomOfImage from "@/public/project-images/roomof.png";
import DriveImage from "@/public/project-images/3drive.png";
import PortfolioImage from "@/public/project-images/portfolio.png";

const Projects = () => {
  return (
    <>
      <div className="lg:w-9/10 w-8/10 pt-1" id="projects-container">
        <ImageButton
          title="RoomOf"
          period="2023.09-2023.12"
          description="가상 메모리얼 서비스"
          src={RoomOfImage}
        />
        <ImageButton
          title="3Drive"
          period="2025.03-2025.07"
          description="3D기반 클라우드 스토리지 서비스"
          titleFont="notable"
          isOdd={false}
          src={DriveImage}
        />
        <ImageButton
          title="Bonsng"
          period="2025.01-2025.08"
          description="개인 포트폴리오"
          titleFont="logo"
          src={PortfolioImage}
        />
      </div>
    </>
  );
};

export default Projects;
