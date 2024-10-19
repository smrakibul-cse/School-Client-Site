import { useState, useEffect } from 'react';
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import NavBar from "../../Navber/NavBar";

const ClassRoutine = () => {
    const axiosPublic = useAxiosPublic();
    const [routines, setRoutines] = useState([]);
    const [pdfLink, setPdfLink] = useState('');

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await axiosPublic.get('/routine'); // Update the endpoint as needed
                setRoutines(response.data);
            } catch (error) {
                console.error("Error fetching the routines:", error);
            }
        };

        fetchRoutines();
    }, [axiosPublic]);

    const handleViewPdf = (link, filepath) => {
        if (link) {
            const embeddedPdfLink = link.replace('/view', '/preview');
            setPdfLink(embeddedPdfLink);
        } else if (filepath) {
            const serverPdfLink = `https://rowmari-c-g-zaman-server.vercel.app/${filepath.replace(/\\/g, '/')}`;
            setPdfLink(serverPdfLink);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="h-auto flex flex-col items-center p-6 bg-gray-50">
                <h1 className="text-3xl font-bold text-center my-6">Class Routine</h1>
                {routines.length > 0 ? (
                    <>
                        <div className="overflow-x-auto w-full">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Class</th>
                                        <th className="py-3 px-6 text-left">Year</th>
                                        <th className="py-3 px-6 text-left">View PDF</th>
                                        <th className="py-3 px-6 text-left">Download PDF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routines.map((routine, index) => (
                                        <tr key={routine._id} className="border-b border-gray-200">
                                            <td className="py-4 px-6">{index + 1}</td>
                                            <td className="py-4 px-6">{routine.class || 'N/A'}</td>
                                            <td className="py-4 px-6">{routine.year || 'N/A'}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                                    onClick={() => handleViewPdf(routine.link, routine.filepath)}
                                                >
                                                    View PDF
                                                </button>
                                            </td>
                                            <td className="py-4 px-6">
                                                {routine.link || routine.filepath ? (
                                                    <a
                                                        href={routine.link ? routine.link.replace('/view', '/preview') : `https://rowmari-c-g-zaman-server.vercel.app/${routine.filepath.replace(/\\/g, '/')}`}
                                                        target='_blank'
                                                        download="Class_Routine.pdf"
                                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
                                                    >
                                                        Download PDF
                                                    </a>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {pdfLink && (
                            <div className="w-4/5 mt-6">
                                <iframe
                                    src={pdfLink}
                                    width="100%"
                                    height="600"
                                    className="border border-gray-300 rounded-lg shadow-md"
                                    allow="autoplay"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ClassRoutine;
