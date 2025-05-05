import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChars = ({ courses }) => {
    const [currentChart, setCurrentChart] = useState('Students');

    const generateRandomColors = (count) => {
        return Array.from({ length: count }, () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        });
    };

    // Chart data configuration
    const chartConfig = {
        students: {
            labels: courses.map((course) => course.courseName),
            datasets: [
                {
                    label: "Students ",
                    data: courses.map((course) => course.totalStudentsEnrolled),
                    backgroundColor: generateRandomColors(courses.length),
                    borderColor: '#1f2937',
                    borderWidth: 2,
                },
            ],
        },
        revenue: {
            labels: courses.map((course) => course.courseName),
            datasets: [
                {
                    label: "₹ ",
                    data: courses.map((course) => `${course.totalAmountGenerated}`),
                    backgroundColor: generateRandomColors(courses.length),
                    borderColor: '#1f2937',
                    borderWidth: 2,
                },
            ],
        },
    };

    // Chart options
    const chartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#fff',
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-[#1f2937] p-6 shadow-lg w-full">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">Course Analytics</h2>

                    <div className="flex space-x-2">
                        <p
                            onClick={() => setCurrentChart('revenue')}
                            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${currentChart === 'revenue'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-700 hover:bg-gray-600'
                                } text-white`}
                        >
                            Revenue
                        </p>
                        <p
                            onClick={() => setCurrentChart('students')}
                            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${currentChart === 'students'
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-700 hover:bg-gray-600'
                                } text-white`}
                        >
                            Students
                        </p>
                    </div>
                </div>

                <div className="h-80">
                    <Doughnut
                        data={currentChart === 'students' ? chartConfig.students : chartConfig.revenue}
                        options={chartOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export default InstructorChars;