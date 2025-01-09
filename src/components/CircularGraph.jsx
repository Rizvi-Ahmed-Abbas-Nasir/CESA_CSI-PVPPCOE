'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileWithCharts = ({ studentData, handleEditClick }) => {
    const hackathonData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                label: 'Hackathons',
                data: [5, 2],  
                backgroundColor: ['#007BFF', '#e0e0e0'],  
                borderWidth: 2,
            },
        ],
    };

    const internshipData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                label: 'Internships',
                data: [3, 1],  
                backgroundColor: ['#1976d2', '#e0e0e0'], 
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="w-full flex lg:flex-row flex-col :justify-end xl:items-end justify-start item-start gap-10 py-8">
            <div className="xl:w-[100%] w-[100%] h-[50%] xl:h-[100%] flex flex-col items-center justify-center">
                <h4 className="text-gray-800 font-semibold text-center text-2xl mb-4">Hackathons</h4>
                <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                    <Doughnut 
                        data={hackathonData}
                        options={{
                            cutout: '50%',
                            plugins: { legend: { display: false } },
                        }}
                    />
                   
                </div>
                <p className="text-center text-gray-700 font-medium mt-2">5 Completed, 2 Remaining</p>
            </div>

            <div className="xl:w-[100%] xl:h-[100%]  flex flex-col items-center justify-center">
                <h4 className="text-gray-800 font-semibold text-center text-2xl mb-4">Internships</h4>
                <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                    <Doughnut 
                        data={internshipData}
                        options={{
                            cutout: '50%',
                            plugins: { legend: { display: false } },
                        }}
                    />
                   
                </div>
                <p className="text-center text-gray-700 font-medium mt-2">3 Completed, 1 Remaining</p>
            </div>
        </div>
    );
};

export default ProfileWithCharts;
