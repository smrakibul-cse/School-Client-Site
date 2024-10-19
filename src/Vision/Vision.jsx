import NavBar from "../Navber/NavBar";
import './vision.css';

const Vision = () => {
    return (
        <div>
            <NavBar />
            <div className="vision-container">

                <div className="vision-content">
                    <div className="vision-header">
                        <h1 className="vision-title">School Vision</h1>
                    </div>
                    <p className="vision-statement">
                        The vision statement of Rowmari C. G. Zaman High School outlines its aspirations and long-term goals, reflecting its commitment to excellence in education and holistic development of its students. Here's a possible vision statement for the school:
                        <br /><br />
                        "Rowmari C. G. Zaman High School envisions a nurturing and empowering educational environment where every student is inspired to achieve their fullest potential. We strive to cultivate a culture of academic excellence, innovation, and critical thinking, equipping our students with the knowledge, skills, and values to thrive in a rapidly changing world. Our vision is to foster a community of lifelong learners who are socially responsible, globally aware, and compassionate leaders, dedicated to making a positive impact on society. Through collaboration, creativity, and continuous improvement, we aim to be a beacon of educational excellence, shaping the future generation for success and meaningful contributions to the world."
                        <br /><br />
                        This vision statement encapsulates the school's aspirations towards providing quality education, fostering personal growth, and preparing students to become responsible citizens and leaders in the global community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Vision;
