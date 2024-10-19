
import NavBar from '../../Navber/NavBar';
import './drown.css';

const DrownView = () => {


    return (
        <div>
            <div className='relative z-20'>
                <NavBar />
            </div>
            <div className="drown-container">


                <div className='content'>
                    <div className='title-section'>
                        <h1>Short Documentary</h1>
                    </div>

                    <div className='video-section'>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/zVZltp5x4Ys?si=TWiBJrtRo02Uk4g0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>

                    <div className='description-section'>
                        <h1 className='subtitle'>A Glance at Rowmari C. G. Zaman High School: Nurturing Young Minds for a Bright Future</h1>
                        <p className='description'>
                            Rowmari C. G. Zaman High School, nestled in the heart of [insert location], shines as a beacon of educational excellence in our community. Boasting an expansive campus and a rich legacy of providing top-notch education, this government institution stands tall, symbolizing a commitment to nurturing the intellectual growth and overall development of its students.
                            <br /><br />
                            The school's sprawling campus, spread across acres of land, offers a picturesque setting for academic pursuits. From lush green lawns to well-maintained buildings, every corner exudes an atmosphere of serenity and inspiration, inviting students to embark on their educational journey with enthusiasm.
                            <br /><br />
                            At Rowmari C. G. Zaman High School, education goes beyond textbooks and classrooms. It embodies a holistic approach that fosters the intellectual, emotional, and social development of every student. With a student body numbering around 500 per class, the school embraces diversity and celebrates the unique talents and abilities of each individual.
                            <br /><br />
                            Central to the school's success is its dedicated faculty, comprising experienced educators who are passionate about imparting knowledge and shaping the future of their students. Their unwavering commitment to excellence ensures that every student receives personalized attention and support, enabling them to reach their full potential.
                            <br /><br />
                            Moreover, Rowmari C. G. Zaman High School is not just a place of learning but also a vibrant community where students engage in a myriad of extracurricular activities, from sports and cultural events to community service initiatives. These experiences enrich their educational journey, instilling values of teamwork, leadership, and civic responsibility.
                            <br /><br />
                            As an institution deeply rooted in its values and driven by a vision of academic excellence, Rowmari C. G. Zaman High School continues to uphold its reputation as a premier educational institution. It remains steadfast in its mission to empower students with knowledge, skills, and values that will equip them to navigate the challenges of the modern world and emerge as responsible global citizens.
                            <br /><br />
                            In essence, Rowmari C. G. Zaman High School stands as a testament to the transformative power of education, inspiring generations of students to dream big, strive for greatness, and contribute meaningfully to society.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrownView;
