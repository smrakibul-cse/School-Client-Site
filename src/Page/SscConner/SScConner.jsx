import React from "react";
import NavBar from "../../Navber/NavBar";
import useAxiosPublic from "../../Hook/UseAxiosPublic";

const SScConner = () => {
    const axiosPublic = useAxiosPublic();
    const [sscData, setSscData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/sscResult");
                const sortedData = response.data.sort((a, b) => b.year - a.year);
                setSscData(sortedData);
            } catch (error) {
                console.error("Error fetching SSC result:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    return (
        <div>
            <NavBar />
            <div className="py-8 bg-purple-900">
                <h1 className="uppercase text-center my-4 text-3xl text-white font-bold">SSC Result</h1>
                <div className="mx-auto max-w-screen-lg overflow-x-auto">
                    <table className="w-full table-auto border-collapse text-white">
                        <thead>
                            <tr className="bg-purple-800 text-black">
                                <th className="px-4 py-2">Sl</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Added Date</th>
                                <th className="px-4 py-2">Year</th>
                                <th className="px-4 py-2">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sscData.map((result, index) => (
                                <tr key={index} className="bg-purple-700 hover:bg-purple-600">
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{result.description}</td>
                                    <td className="border px-4 py-2">{result.added_date}</td>
                                    <td className="border px-4 py-2">{result.year}</td>
                                    <td className="border px-4 py-2">
                                        <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-200">
                                            View PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SScConner;
