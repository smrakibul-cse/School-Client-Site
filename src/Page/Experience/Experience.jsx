import NavBar from "../../Navber/NavBar";

const Experience = () => {
    return (
        <div className="">
            <div className="relative z-10">
                <NavBar />
            </div>
            <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-500 flex flex-col">
                <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center ">
                        Our School Experience
                    </h1>
                    <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-4 md:p-8 w-full md:w-11/12 lg:w-3/4 rounded-lg ">
                        <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-800 roboto-slab text-justify">
                            Rowmari C. G. Zaman High School encompasses a rich tapestry of academic excellence, holistic development, and community engagement. With a legacy spanning decades, our institution has been a cornerstone of educational leadership in our region, nurturing generations of students to become exemplary citizens and leaders.
                            <br /><br />
                            At Rowmari C. G. Zaman High School, our experience is defined by a commitment to providing a nurturing and empowering environment where every student is encouraged to flourish academically, socially, and emotionally. Our experienced faculty members, dedicated staff, and supportive community work tirelessly to create a culture of excellence, innovation, and inclusivity.
                            <br /><br />
                            In the classroom, our experience is characterized by dynamic and engaging learning opportunities that foster critical thinking, creativity, and collaboration. Through a rigorous and comprehensive curriculum, supplemented by hands-on projects, extracurricular activities, and experiential learning, students are equipped with the skills, knowledge, and confidence to succeed in their academic pursuits and beyond.
                            <br /><br />
                            Beyond academics, our experience extends to a wide range of extracurricular activities, including sports, arts, and community service, providing students with opportunities to explore their passions, develop leadership skills, and cultivate a sense of social responsibility. Whether participating in sports competitions, artistic performances, or community outreach initiatives, students at Rowmari C. G. Zaman High School are encouraged to pursue their interests and make meaningful contributions to society.
                            <br /><br />
                            Our experience is further enriched by a strong sense of community and belonging, where students, teachers, parents, and alumni come together to celebrate achievements, support one another, and create lasting memories. Through various events, gatherings, and celebrations, we foster a sense of camaraderie, pride, and unity that defines the Rowmari C. G. Zaman High School experience.
                            <br /><br />
                            In essence, our experience at Rowmari C. G. Zaman High School is characterized by academic excellence, personal growth, and community engagement. It is a journey of discovery, learning, and empowerment that prepares students to navigate the challenges of the future with confidence, compassion, and integrity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
