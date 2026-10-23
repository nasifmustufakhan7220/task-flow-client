import DashboardCard from '@/components/DashboardCard';
import React, { Suspense } from 'react';



const DashboardPage = async() => {
    return (
        <div>
            <Suspense fallback={<p>Loading.....</p>}>
                <DashboardCard/>
            </Suspense>
        </div>
    );
};

export default DashboardPage;