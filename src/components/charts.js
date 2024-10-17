'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentProgressChart = () => {
    // Dummy data for events and progresses
    const events = [
        { eventId: '1', eventName: 'Math Skills' },
        { eventId: '2', eventName: 'Science Skills' },
        { eventId: '3', eventName: 'English Skills' },
        { eventId: '4', eventName: 'History Skills' },
        { eventId: '5', eventName: 'Art Skills' },
    ];

    const progresses = {
        '1': 80,  // 80% for Math Skills
        '2': 60,  // 60% for Science Skills
        '3': 90,  // 90% for English Skills
        '4': 70,  // 70% for History Skills
        '5': 50,  // 50% for Art Skills
    };

    // Prepare data for the chart
    const labels = events.map(event => event.eventName);
    const progressData = events.map(event => Math.round(progresses[event.eventId] || 0));

    const data = {
        labels,
        datasets: [
            {
                label: 'Skill Progress (%)',
                data: progressData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Light blue for bars
                borderColor: 'rgba(54, 162, 235, 1)',         // Darker blue for borders
                borderWidth: 1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',  // Place legend at the top
            },
            title: {
                display: true,
                text: 'Student Progress by Skill',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,  // Since it's percentage based, max value is 100
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center rounded-xl w-[80%] h-auto">
            <div className="mb-4">Overall Progress</div>
            <div className="w-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default StudentProgressChart;
