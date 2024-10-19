// SeenResult.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hook/AxiosSecure";
import NavBar from "../Navber/NavBar";
import logo from '../../src/assets/slider/cgzaman logo (1).png';
import Swal from 'sweetalert2';


const SeenResult = () => {
    const axiosSecure = useAxiosSecure();
    const [results, setResults] = useState([]);
    const [searchClass, setSearchClass] = useState("");
    const [searchRoll, setSearchRoll] = useState("");
    const [searchSection, setSearchSection] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);
    const [resultsFetched, setResultsFetched] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await axiosSecure.get("/results/publish");
                if (response.data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Results Not Published',
                        text: 'The results are not published yet!',
                    });
                } else {
                    setResults(response.data);
                }
                setResultsFetched(true);
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [axiosSecure]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);

        if (searchClass && searchSection && searchRoll) {
            const filteredResults = results.filter(result =>
                result.class === searchClass &&
                result.roll === searchRoll &&
                result.section === searchSection
            );
            if (filteredResults.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Student Not Found',
                    text: 'No student found with the given criteria!',
                });
            } else {
                navigate('/show', { state: { selectedResults: filteredResults } }); // Navigate to PageResult
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Search Criteria',
                text: 'Please fill in all search criteria!',
            });
        }
    };

    return (
        <div>
            <NavBar />
            <div className="pb-4">
                <div className="mx-1">
                    <div className="border md:w-[700px]  mx-auto rounded-lg mt-10">
                        <div className="border mt-3 md:w-[680px] mx-auto rounded-lg flex bg-[#388fc9]">
                            <div>
                                <img className="w-28 bg-[#EEEEEE]" src={logo} alt="" />
                            </div>
                            <div className="flex justify-center mx-auto">
                                <div>
                                    <p className="text-white md:text-2xl font-bold text-center  mt-5">Rowmari C.G. Zaman High School,Rowmari</p>
                                    <p className="md:text-2xl font-bold text-white text-center">Result Board</p>
                                </div>
                            </div>
                        </div>

                        <div className="border h-[260px] md:w-[450px] mx-auto mt-8 rounded-lg">
                            <form onSubmit={handleSearch}>
                                <div className="mt-3 flex mx-auto justify-center items-center">
                                    <label>
                                        <span className="label-text font-bold">Select Class <span className="ml-1 mr-2">:</span></span>
                                    </label>
                                    <select name="class" value={searchClass} onChange={(e) => setSearchClass(e.target.value)} className="select select-bordered md:w-[300px] w-[160px]">
                                        <option value="">Select Class</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <div className="mt-3 flex mx-auto justify-center items-center">
                                    <label>
                                        <span className="label-text font-bold">Class Roll <span className="ml-4 mr-3">:</span></span>
                                    </label>
                                    <input type="number" name="roll" value={searchRoll} onChange={(e) => setSearchRoll(e.target.value)} placeholder="Enter Class Roll" className="input input-bordered  md:w-[300px] w-[160px]" />
                                </div>

                                <div className="mt-3 flex mx-auto justify-center items-center">
                                    <label>
                                        <span className="label-text font-bold">Section <span className="ml-8 mr-3">:</span></span>
                                    </label>
                                    <select name="section" value={searchSection} onChange={(e) => setSearchSection(e.target.value)} className="select select-bordered  md:w-[300px] w-[160px]">
                                        <option value="">Select Section</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                </div>

                                <div className="flex gap-2 mt-3 justify-end px-8">
                                    <button type="reset" className="border px-4 py-3 rounded-lg uppercase bg-red-500 font-bold text-white hover:bg-black cursor-pointer">Reset</button>
                                    <button type="submit" className="border px-4 rounded-lg uppercase bg-sky-400 font-bold text-white hover:bg-black cursor-pointer">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className="border mt-10 h-20 md:w-[680px] mx-auto bg-[#EEEEEE] rounded-lg">
                            <p className="border md:w-[680px] h-3 rounded-lg bg-[#38a8d0]">
                                <span className="flex justify-center mt-7">©2011-2024 RCGZHS, All rights reserved.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default SeenResult;
