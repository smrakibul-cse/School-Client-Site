import useAxiosSecure from "../Hook/AxiosSecure";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PassingRate = () => {
    const [studentData, setStudentData] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('results/publish');
                console.log('Fetched Data:', response.data); // Log the fetched data
                setStudentData(response.data); // Assuming response.data is an array of student objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const calculateClassWisePassPercentage = (data) => {
        const classWiseData = {};

        data.forEach(student => {
            const className = student.class;
            if (!classWiseData[className]) {
                classWiseData[className] = { total: 0, passing: 0 };
            }
            classWiseData[className].total += 1;
            if (student.totalGrade !== 'F') {
                classWiseData[className].passing += 1;
            }
        });

        const passPercentageData = Object.keys(classWiseData).map(className => {
            const { total, passing } = classWiseData[className];
            return {
                name: `Class ${className}`,
                passPercentage: parseFloat(((passing / total) * 100).toFixed(2))
            };
        });

        return passPercentageData;
    };

    const calculateOverallPassPercentage = (data) => {
        const totalStudents = data.length;
        const passingStudents = data.filter(student => student.totalGrade !== 'F').length;
        return parseFloat(((passingStudents / totalStudents) * 100).toFixed(2));
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4', '#FF6347'];

    const classWisePassData = calculateClassWisePassPercentage(studentData);
    const overallPassPercentage = calculateOverallPassPercentage(studentData);

    console.log('Class Wise Pass Data:', classWisePassData); // Log the class wise pass data
    console.log('Overall Pass Percentage:', overallPassPercentage); // Log the overall pass percentage

    return (
        <div className="p-8 bg-gradient-to-r from-green-100 to-blue-100 min-h-screen">
            <div className="text-center py-6 text-3xl font-bold text-blue-900">
                School Passing Rates
            </div>
            <div className="lg:flex gap-8 mb-8 justify-center">
                <div className="flex-1">
                    <div className="border rounded-lg bg-white shadow-lg">
                        <div className="border mx-4 my-4 rounded-lg bg-gray-50 shadow-md p-4">
                            <h3 className="text-2xl text-center py-3 border mx-auto mt-2 rounded-lg bg-blue-800 text-white">Overall School Result Pass/Fail Rate</h3>
                            <PieChart className="flex mx-auto" width={400} height={300}>
                                <Pie
                                    data={[
                                        { name: 'Passing', value: overallPassPercentage },
                                        { name: 'Failing', value: 100 - overallPassPercentage }
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {[
                                        { name: 'Passing', value: overallPassPercentage },
                                        { name: 'Failing', value: 100 - overallPassPercentage }
                                    ].map((entry, idx) => (
                                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border mx-auto rounded-lg mb-8 bg-white shadow-lg">
                <div className="border mx-4 my-4 rounded-lg bg-gray-50 shadow-md p-4">
                    <h1 className="text-2xl text-center py-3 border mx-auto mt-2 rounded-lg bg-blue-800 text-white">Class Wise Passing Rate</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-center justify-center mx-auto p-4">
                        {classWisePassData.map((classData, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="text-center mb-4 text-blue-800 font-semibold">{classData.name}</h3>
                                <PieChart width={250} height={260}>
                                    <Pie
                                        data={[
                                            { name: 'Passing', value: classData.passPercentage },
                                            { name: 'Failing', value: 100 - classData.passPercentage }
                                        ]}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {[
                                            { name: 'Passing', value: classData.passPercentage },
                                            { name: 'Failing', value: 100 - classData.passPercentage }
                                        ].map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassingRate;
