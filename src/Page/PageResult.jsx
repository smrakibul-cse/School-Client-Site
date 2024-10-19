import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../Navber/NavBar";
import logo from '../../src/assets/slider/cgzaman logo (1).png';
import { useReactToPrint } from "react-to-print";
import './result.css';

// Function to map English subject names to Bengali names and include subject numbers
const mapSubjectToBengali = (subject, subjectNumber) => {
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
    const subjectName = subjectMap[subject] || subject;
    const subjectNum = subjectNumber[subject] || '';
    return { name: subjectName, number: subjectNum };
};

const PageResult = () => {
    const location = useLocation();
    const selectedResults = location.state.selectedResults;
    const componentRef = useRef();

    if (!selectedResults || selectedResults.length === 0) {
        return <div>No results found</div>;
    }

    const studentData = selectedResults[0];

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div>
            <NavBar />
            <div className="result-container">
                <div ref={componentRef} id="resultSheet" className="result-sheet">
                    <div className="header2">
                        <img className="logo" src={logo} alt="School Logo" />
                        <div className="school-info">
                            <p className="school-name">Rowmari C.G. Zaman High School, Rowmari,Kurigram</p>
                            <p className="result-title">Result Sheet</p>
                        </div>
                    </div>
                    <h1 className="section-title">Student Information</h1>
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <th>Roll</th>
                                <td>{studentData.roll}</td>
                                <th>Name</th>
                                <td>{studentData.name}</td>
                            </tr>
                            <tr>
                                <th>Class</th>
                                <td>{studentData.class}</td>
                                <th>Father's Name</th>
                                <td>{studentData.fName}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td>{studentData.dateOfBirth}</td>
                                <th>Mother's Name</th>
                                <td>{studentData.mName}</td>
                            </tr>
                            <tr>
                                <th>Total Grade</th>
                                <td className="font-bold">{studentData.totalGrade}</td>
                                <th>GPA</th>
                                <td className="font-bold">{studentData.averageGradePoint}</td>
                            </tr>
                            <tr>
                                <th>Total Number</th>
                                <td className="font-bold">{studentData.totalMarks}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2 className="section-title">Grade Sheet</h2>
                    <table className="grade-sheet">
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Subject</th>
                                <th>Subject Number</th>
                                <th>Grade Letter</th>
                                <th>Grade Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.subjectGradeLetters && Object.keys(studentData.subjectGradeLetters).map((subject, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{mapSubjectToBengali(subject, studentData).name}</td>
                                    <td>{mapSubjectToBengali(subject, studentData).number}</td>
                                    <td>{studentData.subjectGradeLetters[subject]}</td>
                                    <td>{studentData.subjectGradePoints[subject]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="signatures">
                        <div className="signature">
                            <p>Parent's Signature</p>
                        </div>
                        <div className="signature">
                            <p>Head Teacher's Signature</p>
                        </div>
                    </div>

                    <footer className="footer2">
                        <p>©2011-2024 RCGZHS, All rights reserved.</p>
                    </footer>
                </div>

                <div className="actions2">
                    <Link to='/result'>
                        <button className="search-again-btn">Search Again</button>
                    </Link>
                    <button onClick={handlePrint} className="print-btn">Download Result</button>
                </div>
            </div>


        </div>
    );
};

export default PageResult;
