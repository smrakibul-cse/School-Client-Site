import { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/AxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const subjectMap = {
    "bangla": "বাংলা",
    "english": "English",
    "math": "গণিত",
    "history": "ইতিহাস ও সামাজিক বিজ্ঞান",
    "health": "স্বাস্থ্য সুরক্ষা",
    "life": "জীবন ও জীবিকা",
    "art": "শিল্প ও সংস্কৃতি",
    "science": "বিজ্ঞান",
    "digital": "ডিজিটাল প্রযুক্তি",
    "ইসলাম": "ইসলাম শিক্ষা"
};

const ShowResult = () => {
    const axiosSecure = useAxiosSecure();
    const [results, setResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axiosSecure.get("/results");
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, [axiosSecure]);

    if (results.length === 0) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const handleDeleteResult = (resultId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/results/${resultId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setResults(results.filter(result => result._id !== resultId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The result item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting result item:", error);
                    });
            }
        });
    };

    const handleViewResultDetails = (result) => {
        setSelectedResult(result);
    };

    const handleCloseModal = () => {
        setSelectedResult(null);
    };

    const getSubjectName = (subjectKey) => {
        return subjectMap[subjectKey] || subjectKey;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Student Results: {results.length}</h1>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600  text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Father's Name</th>
                            <th className="py-3 px-6 text-left">Mother's Name</th>
                            <th className="py-3 px-6 text-left">Class</th>
                            <th className="py-3 px-6 text-left">Roll</th>
                            <th className="py-3 px-6 text-left">Section</th>
                            <th className="py-3 px-6 text-left">Total Number</th>
                            <th className="py-3 px-6 text-left">Grade</th>
                            <th className="py-3 px-6 text-left">G_Point</th>
                            <th className="py-3 px-6 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {results.map((result, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{result.name}</td>
                                <td className="py-3 px-6 text-left">{result.fName}</td>
                                <td className="py-3 px-6 text-left">{result.mName}</td>
                                <td className="py-3 px-6 text-left">{result.class}</td>
                                <td className="py-3 px-6 text-left">{result.roll}</td>
                                <td className="py-3 px-6 text-left">{result.section}</td>
                                <td className="py-3 px-6 text-left">{result.totalMarks}</td>
                                <td className="py-3 px-6 text-left">{result.totalGrade}</td>
                                <td className="py-3 px-6 text-left">{result.averageGradePoint}</td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <button
                                            className="text-blue-600 hover:text-blue-900 mr-2"
                                            onClick={() => handleViewResultDetails(result)}
                                        >
                                            <FaEye size={20} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => handleDeleteResult(result._id)}
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedResult && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-3/4 max-w-4xl">
                        <h2 className="lg:text-2xl font-semibold text-center mb-4">{selectedResult.name}'s Details</h2>
                        <div className="flex  mb-4 gap-14 justify-center">
                            <p><strong>Class:</strong> {selectedResult.class}</p>
                            <p><strong>Section:</strong> {selectedResult.section}</p>
                            <p><strong>Roll:</strong> {selectedResult.roll}</p>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Subject Marks and Grade Points</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">Subject</th>
                                        <th className="px-4 py-2 border">Marks</th>
                                        <th className="px-4 py-2 border">Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(selectedResult.subjectGradePoints).slice(0, 5).map(([subject, gradePoint]) => (
                                        <tr className="text-center" key={subject}>
                                            <td className="border px-4 py-2">{getSubjectName(subject)}</td>
                                            <td className="border px-4 py-2">{selectedResult[subject]}</td>
                                            <td className="border px-4 py-2">{gradePoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">Subject</th>
                                        <th className="px-4 py-2 border">Marks</th>
                                        <th className="px-4 py-2 border">Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(selectedResult.subjectGradePoints).slice(5, 10).map(([subject, gradePoint], index) => (
                                        <tr className="text-center" key={index}>
                                            <td className="border px-4 py-2">{getSubjectName(subject)}</td>
                                            <td className="border px-4 py-2">{selectedResult[subject]}</td>
                                            <td className="border px-4 py-2">{gradePoint}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold text-center">Letter Grade</td>
                                        <td className="border px-4 py-2 font-semibold text-center" colSpan="2">{selectedResult.totalGrade}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold text-center">Total GPA</td>
                                        <td className="border px-4 py-2 font-semibold text-center" colSpan="2">{selectedResult.averageGradePoint}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowResult;
