// IMPORTS
// Images
import Image1 from "../../assets/images/Image-1.png";
import Logo from "../../assets/images/logo.png";

// ------------------------------------------------------------------------

// LAYOUT COMPONENT
const AuthLayout = ({ children }) => {
  return (
    <div className="flex bg-gradient-to-r from-white via-tertiary to-white min-h-screen">
      <div className="w-screen h-screen px-12 pt-4 pb-12 md:w-[60vw] flex flex-col justify-between">
        <div className="w-24 md:w-32 lg:w-40">
          <img src={Logo} alt="BudgetBuddy" />
        </div>
        {children}
      </div>
      <div className="hidden relative md:flex justify-center items-center w-[40vw] h-screen bg-tertiary p-6 lg:w-[50vw]">
        <img src={Image1} alt="save-money-illustration" />
      </div>
    </div>
  );
};

export default AuthLayout;
