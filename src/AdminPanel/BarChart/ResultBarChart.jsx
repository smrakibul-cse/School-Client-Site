import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAxiosSecure from '../../Hook/AxiosSecure';

const ResultPieChart = () => {
    const [studentData, setStudentData] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [notices, setNotices] = useState([]);


    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axiosSecure.get('/news');
                setNotices(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotices();
    }, [axiosSecure]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('results/publish');
                setStudentData(response.data); // Assuming response.data is an array of student objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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


    const latestNotices = notices
        .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
        .slice(0, 4);

    return (
        <div>
            <div className='lg:flex gap-4 mb-4'>

                <div className='lg:w-[70%] '>
                    <div className='border rounded-lg bg-[#375d7a22]'>
                        <div className='border mx-3 my-3 rounded-lg bg-[#2f708022]'>
                            <div className="">
                                <h3 className='text-xl text-center py-2 w-[370px] border mx-auto mt-2 rounded-lg bg-[#1a566b] text-white'>Overall School Result Pass/Fail Rate</h3>
                                <PieChart className='flex mx-auto' width={400} height={300}>
                                    <Pie
                                        data={[{ name: 'Passing', value: overallPassPercentage }, { name: 'Failing', value: 100 - overallPassPercentage }]}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {[{ name: 'Passing', value: overallPassPercentage }, { name: 'Failing', value: 100 - overallPassPercentage }].map((entry, idx) => (
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
                <div className='lg:w-[30%] '>
                    <div className='border rounded-lg bg-[#375d7a22] h-[378px]'>
                        <div className='border mx-3 my-3 rounded-lg bg-[#2f708022]'>
                            <h3 className='text-xl text-center py-2 w-[210px] border mx-auto mt-2 rounded-lg bg-[#1a566b] text-white'>Important Notice</h3>
                            <ul className='px-1'>
                                {latestNotices.map(notice => (
                                    <li key={notice._id} className='mb-2 border px-2 rounded-lg py-1'>
                                        <h4 className=''>{notice.head}</h4>
                                        <p className='text-sm text-gray-600'>{new Date(notice.dateTime).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border mx-auto rounded-lg mb-4 bg-[#375d7a22]'>
                <div className='border mx-3 my-3 rounded-lg bg-[#2f708022]'>
                    <h1 className='text-xl text-center py-2 w-[270px] border mx-auto mt-2 rounded-lg bg-[#1a566b] text-white'>Class Wise Passing Rate</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 item-center justify-center mx-auto px-20 md:px-0'>
                        {classWisePassData.map((classData, index) => (
                            <div key={index} className="mb-2 mt-2">
                                <h3 className="text-center mb-2 text-sky-500">{classData.name}</h3>
                                <PieChart className='py-8 px-3' width={250} height={260}>
                                    <Pie
                                        data={[{ name: 'Passing', value: classData.passPercentage }, { name: 'Failing', value: 100 - classData.passPercentage }]}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label
                                    >
                                        {[{ name: 'Passing', value: classData.passPercentage }, { name: 'Failing', value: 100 - classData.passPercentage }].map((entry, idx) => (
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

export default ResultPieChart;
