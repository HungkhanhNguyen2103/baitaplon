import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import Search from "./Components/Search";
import User from "./Components/User";
import Bus from "./Components/Tables/Bus";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <Navigation />
          {/* <Routes>
                  <Route path="" element={<Home/>}/> 
                  <Route path="tablesBus" element={<Footer/>}/> 
                </Routes> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                {/* Topbar Search */}
                <Search />
                {/* Topbar Navbar */}
                {/* Nav Item - User Information */}
                <User />
              </nav>
              {/* End of Topbar */}
              <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="tablesBus" element={<Bus/>}/>
              </Routes>
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <Footer />
            {/* End of Footer */}
          </div>
        </div>
        {/* End of Page Wrapper */}
      </div>
    </BrowserRouter>
  );
}

export default App;
