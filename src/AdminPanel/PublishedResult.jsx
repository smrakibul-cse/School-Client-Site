import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../Hook/AxiosSecure";

const PublishedResult = () => {
    const axiosSecure = useAxiosSecure();
    const [publishedResults, setPublishedResults] = useState([]);

    useEffect(() => {
        const fetchPublishedResults = async () => {
            try {
                const response = await axiosSecure.get('/results/publish');
                setPublishedResults(response.data);
            } catch (error) {
                console.error('Error fetching published results:', error);
            }
        };

        fetchPublishedResults();
    }, [axiosSecure]);

    const handleUnPublishResults = () => {
        axiosSecure.post('/results/unpublish')
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setPublishedResults([]);
                    console.log('All published results have been deleted');
                }
            })
            .catch(error => {
                console.error('Error unpublishing results:', error);
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-center mt-2">Published Results</h2>
            <table className="table-auto mx-auto text-center">
                <thead>
                    <tr>
                        <th className="px-4 border py-2">ID</th>
                        <th className="px-4 border py-2">Student Name</th>
                        <th className="px-4 border py-2">Class</th>
                        <th className="px-4 border py-2">Roll</th>
                        <th className="px-4 border py-2">section</th>
                        <th className="px-4 border py-2">Total Marks</th>
                        <th className="px-4 border py-2">Grade</th>
                        <th className="px-4 border py-2">Average Grade Point</th>
                    </tr>
                </thead>
                <tbody>
                    {publishedResults.map((result, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{result.name}</td>
                            <td className="border px-4 py-2">{result.class}</td>
                            <td className="border px-4 py-2">{result.roll}</td>
                            <td className="border px-4 py-2">{result.section}</td>
                            <td className="border px-4 py-2">{result.totalMarks}</td>
                            <td className="border px-4 py-2">{result.totalGrade}</td>
                            <td className="border px-4 py-2">{result.averageGradePoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-6'>
                <button className='btn btn-primary' onClick={handleUnPublishResults} disabled={publishedResults.length === 0}>UnPublic</button>
            </div>
        </div>
    );
};

export default PublishedResult;
