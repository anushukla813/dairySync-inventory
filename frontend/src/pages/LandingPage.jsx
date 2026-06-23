import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

import { GiCow } from "react-icons/gi";
import {FaBoxOpen,FaUsers,FaChartLine} from "react-icons/fa";

import cowImage from "../assets/images/cow.jpeg";

export default function LandingPage() {
  return (
    <div>

      {/* Navbar */}

      <nav className="navbar navbar-expand-lg custom-navbar">

        <div className="container">

          <div className="logo">
            <GiCow className="cow-icon" />
            <span>DairySync</span>
          </div>

          <div className="nav-links">

            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">About</a>

            <Link to = "login">
            <button className="signin-btn">
              Sign In
            </button>

            </Link>
            
          </div>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="hero-section">

        <div className="container">

          <div className="row align-items-center min-vh-50">

            {/* Left Side */}

            <div className="col-lg-6">

              <div className="hero-text">

                <h1>
                  Welcome To 
                  <span> DairySync </span>
                </h1>

                <p>
                  Manage milk inventory, vendors,
                  analytics and customer orders —
                  all in one platform.
                </p>

                <div className="hero-buttons">

                  <Link to = "/register">
                    <button className="primary-btn">
                     Get Started
                  </button>
                  </Link>
                  

                  <a href="/features">
                    <button className="secondary-btn">
                    Learn More
                  </button>
                  </a>
                  

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div className="col-lg-6 text-center">

              <img
                src={cowImage}
                alt="cow"
                className="hero-image"
              />

            </div>

          </div>

        </div>

      </section>

{/* Features */}

<section className="features"
          id="features" >

  <div className="row g-4">

    {/* Inventory */}

    <div className="col-md-4">

      <div className="feature-card">

        <div className="feature-icon inventory-icon">
          <FaBoxOpen />
        </div>

        <h3>Inventory</h3>

        <p>
          Track dairy inventory in real time.
        </p>

      </div>

    </div>

    {/* Vendors */}

    <div className="col-md-4">

      <div className="feature-card">

        <div className="feature-icon vendor-icon">
          <FaUsers />
        </div>

        <h3>Vendors</h3>

        <p>
          Easily manage suppliers and vendors.
        </p>

      </div>

    </div>

    {/* Analytics */}

    <div className="col-md-4">

      <div className="feature-card">

        <div className="feature-icon analytics-icon">
          <FaChartLine />
        </div>

        <h3>Analytics</h3>

        <p>
          Visualize dairy business growth.
        </p>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}