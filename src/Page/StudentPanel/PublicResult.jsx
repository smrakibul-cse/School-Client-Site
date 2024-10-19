import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hook/AxiosSecure";
import NavBar from "../../Navber/NavBar";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";

const PublicResult = () => {
    const axiosSecure = useAxiosSecure();
    const [publishedResults, setPublishedResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchedClass, setSearchedClass] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        const fetchPublishedResults = async () => {
            try {
                const response = await axiosSecure.get('/results/publish');
                setPublishedResults(response.data);
                setLoading(false);
                if (response.data.length === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Results Not Published',
                        text: 'The results are not published yet!',
                    });
                }
            } catch (error) {
                console.error('Error fetching published results:', error);
                setLoading(false);
            }
        };

        fetchPublishedResults();
    }, [axiosSecure]);

    useEffect(() => {
        if (searchedClass) {
            const filtered = publishedResults.filter(result => result.class === searchedClass);
            setFilteredResults(filtered);
        } else {
            setFilteredResults(publishedResults);
        }
    }, [searchedClass, publishedResults]);

    const handleInputChange = (event) => {
        setSearchedClass(event.target.value);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const totalResults = filteredResults.length;
    const passStudents = filteredResults.filter(result => result.totalGrade !== 'F').length;
    const failStudents = filteredResults.filter(result => result.totalGrade === 'F').length;
    const totalGPA5 = filteredResults.filter(result => result.averageGradePoint === 5).length;
    const passingRate = totalResults ? ((passStudents / totalResults) * 100).toFixed(2) : 0;

    return (
        <div>
            <NavBar />
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen pb-4">
                <div className=" mx-auto py-8 px-4">
                    <div className=" ">
                        <div className="flex items-center gap-3 mx-auto justify-center pb-4">
                            <input
                                type="number"
                                placeholder="Search Class"
                                className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                value={searchedClass}
                                onChange={handleInputChange}
                            />
                            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none">
                                <FaDownload />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <span className="loading loading-ring text-6xl text-white"></span>
                        </div>
                    ) : (
                        <div ref={componentRef} className="bg-white p-8 rounded-lg">
                            {filteredResults.length === 0 ? (
                                <div className="text-center">
                                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">No result published yet</h2>
                                    <img src="https://i.ibb.co/WzZTFbb/noresult.jpg" alt="No Result" className="mx-auto" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <div className="text-center mb-6">
                                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Class {searchedClass || 'All'} Results</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                            <div className="bg-indigo-100 p-4 rounded-lg shadow">
                                                <h3 className="text-xl font-bold text-indigo-600">Total Results</h3>
                                                <p className="text-2xl">{totalResults}</p>
                                            </div>
                                            <div className="bg-green-100 p-4 rounded-lg shadow">
                                                <h3 className="text-xl font-bold text-green-600">Pass Students</h3>
                                                <p className="text-2xl">{passStudents}</p>
                                            </div>
                                            <div className="bg-red-100 p-4 rounded-lg shadow">
                                                <h3 className="text-xl font-bold text-red-600">Fail Students</h3>
                                                <p className="text-2xl">{failStudents}</p>
                                            </div>
                                            <div className="bg-yellow-100 p-4 rounded-lg shadow">
                                                <h3 className="text-xl font-bold text-yellow-600">Total GPA-5</h3>
                                                <p className="text-2xl">{totalGPA5}</p>
                                            </div>
                                            <div className="bg-purple-100 p-4 rounded-lg shadow">
                                                <h3 className="text-xl font-bold text-purple-600">Passing Rate</h3>
                                                <p className="text-2xl">{passingRate}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table-auto w-full text-center border-collapse">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border">ID</th>
                                                <th className="border">Student Name</th>
                                                <th className="border">Class</th>
                                                <th className="border ">Roll</th>
                                                <th className="border ">Section</th>
                                                <th className="border ">Grade</th>
                                                <th className="border">Average Grade Point</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredResults
                                                .sort((a, b) => a.class.localeCompare(b.class))
                                                .map((result, index) => (
                                                    <tr key={index} className="odd:bg-white even:bg-gray-100">
                                                        <td className="border">{index + 1}</td>
                                                        <td className="border ">{result.name}</td>
                                                        <td className="border ">{result.class}</td>
                                                        <td className="border ">{result.roll}</td>
                                                        <td className="border ">{result.section}</td>
                                                        <td className="border ">{result.totalGrade}</td>
                                                        <td className="border ">{result.averageGradePoint}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicResult;
