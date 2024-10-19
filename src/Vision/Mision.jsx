import NavBar from "../Navber/NavBar";
import './vision.css'


const Mision = () => {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="mission-container">

                <div className="mission-content">
                    <div className="mission-header">
                        <h1 className="mission-title">School Mission</h1>
                    </div>
                    <p className="mission-statement">
                        "The mission of Rowmari C. G. Zaman High School is to provide a transformative educational experience that empowers students to realize their full potential and become responsible, compassionate, and lifelong learners. Grounded in the principles of equity, integrity, and excellence, our mission is to cultivate a dynamic learning community where every student is inspired to achieve academic success, personal growth, and social responsibility.
                        <br /><br />
                        We are committed to delivering a comprehensive and rigorous curriculum that promotes critical thinking, creativity, and communication skills, preparing students for success in higher education, careers, and citizenship. Through innovative teaching methods, technology integration, and experiential learning opportunities, we strive to foster intellectual curiosity, resilience, and a love for learning in our students.
                        <br /><br />
                        Central to our mission is the holistic development of each individual, encompassing their intellectual, emotional, physical, and social well-being. We aim to create a safe, inclusive, and nurturing environment where diversity is celebrated, and students feel valued, supported, and empowered to reach their highest potential.
                        <br /><br />
                        This mission statement reflects the core values, goals, and aspirations of Rowmari C. G. Zaman High School, outlining its commitment to providing a quality education and nurturing the holistic development of its students."
                    </p>
                </div>
            </div>


        </div>
    );
};

export default Mision;