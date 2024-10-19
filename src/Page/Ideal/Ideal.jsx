import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import '../Ideal/Ideal.css';

const Ideal = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 });
    }, []);

    return (
        <div className="px-2 mb-6 mt-6">
            <div className="border rounded-lg bg-[#f7f3f3]">
                <div className="mx-2 my-2 rounded-lg px-2 bg-[#eae8e8] pb-2">
                    <h1 className="text-xl text-center border rounded-lg mt-1 bg-[#382b56] text-white mb-3 p-1 uppercase" data-aos="fade-down">Why are we ideal?</h1>
                    <div>
                        <div className="grid lg:grid-cols-4 gap-2">
                            <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 gap-4 space-y-2" data-aos="fade-right">
                                <h1 className="text-2xl font-bold">Our Experience</h1>
                                <p>Rowmari C. G. Zaman High School encompasses...</p>
                                <Link to={'/experience'}>
                                    <button className="border px-2 py-1 mt-1 rounded-lg border-black hover:bg-slate-400">Load More..</button>
                                </Link>
                            </div>
                            <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2" data-aos="fade-up">
                                <h1 className="text-2xl font-bold">Experience Teacher</h1>
                                <h1>The experience of teachers at Rowmari C. G. Zaman High School....</h1>
                                <Link to={'/allTeacher'}>
                                    <button className="border px-2 py-1 mt-1 rounded-lg border-black hover:bg-slate-400">Load More..</button>
                                </Link>
                            </div>
                            <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2" data-aos="fade-left">
                                <h1 className="text-2xl font-bold">Smart Classroom</h1>
                                <h1>Upcoming</h1>
                                <Link to={'/smartClassroom'}>Learn More..</Link>
                            </div>
                            <div className="border rounded-lg bg-[#F1F3F5] px-2 py-3 space-y-2" data-aos="fade-left">
                                <h1 className="text-2xl font-bold">AWARD</h1>
                                <h1>Upcoming</h1>
                                <Link to={'/award'}>Click More..</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ideal;
