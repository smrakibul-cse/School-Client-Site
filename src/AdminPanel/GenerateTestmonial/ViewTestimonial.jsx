import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import Swal from "sweetalert2";
import logo from '../../assets/slider/cgzaman logo (1).png';
import './testimonial.css'; // Import custom CSS for styling
import { FaDownload } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const ViewTestimonial = () => {
    const axiosSecure = useAxiosSecure();
    const [testimonials, setTestimonials] = useState([]);
    const [searchSSCRoll, setSearchSSCRoll] = useState('');
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axiosSecure.get('/testimonial');
                setTestimonials(response.data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };

        fetchTestimonials();
    }, [axiosSecure]);

    const handleSearch = () => {
        const foundTestimonial = testimonials.find(testimonial => testimonial.sscRoll === searchSSCRoll);
        if (foundTestimonial) {
            setSelectedTestimonial(foundTestimonial);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Testimonial Not Found',
                text: 'No testimonial found for the provided SSC roll.',
            });
        }
    };

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/testimonial/${selectedTestimonial._id}`);
                    Swal.fire(
                        'Deleted!',
                        'Your testimonial has been deleted.',
                        'success'
                    );
                    // Refresh testimonial list
                    const response = await axiosSecure.get('/testimonial');
                    setTestimonials(response.data);
                    setSelectedTestimonial(null);
                } catch (error) {
                    console.error("Error deleting testimonial:", error);
                }
            }
        });
    };


    return (
        <div>
            <div className="container mx-auto p-6 mt-4 ">
                <div className="flex items-center justify-between mb-4 gap-4 mx-auto">
                    <div>
                        <label className="label">
                            <span className="label-text">Search Testimonial</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Search SSC Roll"
                            value={searchSSCRoll}
                            onChange={(e) => setSearchSSCRoll(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn btn-outline mt-9" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            {selectedTestimonial && (
                <div>
                    <div ref={componentRef}>
                        <div className="testimonial-container roboto bg-white py-10">
                            <div className="testimonial-card">
                                <div className='text-center'>
                                    <img src={logo} className="school-logo flex justify-center mx-auto" alt="School Logo" />
                                    <h1 className='text-xl text-[#35749e] font-bold'>Rowmari C.G Zaman Govt. High School</h1>
                                    <h1 className='md:text-[17px]'>Rowmari, Kurigram, Rangpur</h1>
                                    <h1 className='md:text-[17px]'>Since: 1949, School Code: 122542</h1>
                                    <h1 className='md:text-[17px]'>Email: rcgzghs132043@gmail.com, Website: https://rcgzghs.edu.bd</h1>
                                </div>

                                <div className="flex justify-between mt-6 md:text-[16px]">
                                    <div className="">
                                        <h1>Serial No. <span className="font-bold">{selectedTestimonial?.serial}</span></h1>

                                        <h1>Date. <span className="font-bold">{selectedTestimonial?.date}</span></h1>

                                    </div>
                                    <div>
                                        <h1>Registration No. <span className="font-bold">{selectedTestimonial?.registration}</span></h1>
                                        <h1>Session <span className="font-bold">{selectedTestimonial?.session}</span></h1>
                                    </div>
                                </div>

                                <h2 className="testimonial-heading text-center bg-[#2d49b1] w-40 mx-auto rounded-lg text-white mb-4">Testimonial</h2>
                                <p className="testimonial-text">This is to certify that <strong>{selectedTestimonial.name}</strong> Son/Daughter of <strong>{selectedTestimonial.fname}</strong> and <strong>{selectedTestimonial.mname}</strong> Rowmari C.G Zaman High School, Rowmari bearing roll no <strong>{selectedTestimonial.sscRoll}</strong> duly passed the Secondary Certificate Examination, {selectedTestimonial.year} under the Board of Intermediate and Secondary Education, Dinajpur in <strong>{selectedTestimonial.group}</strong> Group and obtained GPA <strong>{selectedTestimonial.gpa}</strong>.So far my knowledge goes he/she did not take part in any activity subversive of state or of discipline.</p>
                                <p className="testimonial-wish">I wish him/her every success in life.</p>

                                <div className="mt-14 flex justify-end text-center text-[16px]">
                                    <div className="">
                                        <p>Head Teacher</p>
                                        <p className="font-bold">Rowmari C.G Zaman High School</p>
                                        <p className="font-bold">Rowmari,Kurigram</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 my-4">
                        <button onClick={handlePrint} className="btn btn-outline">
                            <FaDownload></FaDownload>
                            Download</button>
                        <button onClick={handleDelete} className="btn btn-outline">
                            <FaDeleteLeft /> Delete
                        </button>
                    </div>
                </div>
            )}


            <Link
                to={'/dashboard/testimonial'}>
                <button className="text-red-400 link-hover flex justify-center mx-auto py-6">Go Back To Testimonial Page</button>
            </Link>
        </div>
    );
};

export default ViewTestimonial;
