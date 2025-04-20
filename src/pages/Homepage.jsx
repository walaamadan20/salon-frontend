import { Link } from "react-router-dom";
import brideImg from "../assets/bride.jpg";
import faceImg from "../assets/face.png";
import hairImg from "../assets/hair.jpg";
import heroImg from "../assets/lilies.png";
import makeupImg from "../assets/makeup.jpg";
import nailsImg from "../assets/nails.jpg";

function Homepage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: "#FFF0F5",
        padding: "4rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        {/* Left Side - Logo & Intro */}
        <div style={{ flex: "1 1 400px", paddingRight: "2rem", textAlign: "left" }}>
          <img src={heroImg} alt="Lilies logo" style={{ maxWidth: "180px", marginBottom: "1rem" }} />
          <h2 style={{ color: "#2D2D2D", fontWeight: 400, fontSize: "1.4rem" }}>
            Luxury Salon Where Elegance Blooms
          </h2>
          <p style={{ marginTop: "1rem", color: "#666", maxWidth: "500px" }}>
            Where beauty meets serenity — step into a space made just for you.
          </p>
          <Link to="/services" style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1A1A1A",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 500
          }}>
            Explore Services
          </Link>
        </div>

        {/* Right Side - Offer Banner with Motion */}
        <div style={{
          flex: "1 1 400px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          animation: "slideIn 1.5s ease-out"
        }}>
          <img
            src={makeupImg}
            alt="Makeup Offer"
            style={{ width: "100%", borderRadius: "12px" }}
          />
          <div style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textShadow: "1px 1px 4px #000",
            background: "rgba(26, 26, 26, 0.6)",
            padding: "1rem 2rem",
            borderRadius: "10px"
          }}>
            Get 30% OFF <br />
            <span style={{ fontSize: "1rem", fontWeight: "normal" }}>
              Quick Face Makeup — THIS WEEK ONLY!
            </span>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "#1A1A1A" }}>Mind, Body & Soul</h2>
        <p style={{ maxWidth: "600px", margin: "1rem auto", color: "#444" }}>
          At <strong>Lilies</strong>, we believe true beauty comes from balance. From expert hair treatments
          to relaxing facials and tailored care, our goal is to make you feel confident, calm, and radiant — inside and out.
        </p>
      </section>

      {/* Services Preview With Images */}
      <section style={{ padding: "2rem", backgroundColor: "#FFF7F2" }}>
        <h2 style={{ textAlign: "center", color: "#1A1A1A" }}>What We Offer</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: "2rem"
        }}>
          {[{
            title: "Signature Blowouts",
            desc: "Get the shine, volume, and confidence you deserve.",
            img: hairImg
          }, {
            title: "Nail Art & Gel Services",
            desc: "Elegant and durable nails with unique styles.",
            img: nailsImg
          }, {
            title: "Facial Therapy",
            desc: "Glow from within with our expert facial care.",
            img: faceImg
          }, {
            title: "Bridal & Event Glam",
            desc: "Flawless makeup and hair for your special day.",
            img: brideImg
          }, {
            title: "Wellness Massages",
            desc: "Melt stress away with soothing therapies.",
            img: makeupImg
          }].map((service, i) => (
            <div key={i} style={{
              background: "white",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              maxWidth: "260px"
            }}>
              <img
                src={service.img}
                alt={service.title}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
              />
              <h3 style={{ color: "#1A1A1A" }}>{service.title}</h3>
              <p style={{ color: "#555", fontSize: "0.95rem" }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <h3 style={{ color: "#1A1A1A" }}>Ready to bloom?</h3>
        <p>Book your appointment today and experience the magic of Lilies.</p>
        <Link to="/services" style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#1A1A1A",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 500
        }}>
          Book Now
        </Link>
      </section>

      {/* Contact Us Section */}
      <section style={{ backgroundColor: "#FDF4F7", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "#1A1A1A", marginBottom: "1rem" }}>Contact Us</h2>
        <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8" }}>
          <strong>Location:</strong> Seef, Bahrain <br />
          <strong>Phone:</strong> +973 1700000 <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:info@lilies-salon.com" style={{ color: "#1A1A1A", textDecoration: "none" }}>
            info@lilies-salon.com
          </a>
        </p>
      </section>
    </div>
  );
}

export default Homepage;
