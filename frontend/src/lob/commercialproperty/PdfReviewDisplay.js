import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LossRunPdfViewer = ({ data }) => {
  // State to store processed chart data
  const [chartData, setChartData] = useState([]);
  
  // Extract data from the props - making sure we handle potential undefined values
  const claimsSummary = data?.lossrun_details?.[0]?.["Claims Summary"] || [];
  const totals = data?.lossrun_details?.[0]?.Totals || {};
  
  useEffect(() => {
    // Process each claim looking for specific payouts
    const processedData = [];
    
    claimsSummary.forEach(claim => {
      // Extract year range
      const yearMatch = claim.match(/(\d{4}(?:-\d{4})?)/);
      const year = yearMatch ? yearMatch[1] : 'Unknown';
      
      // Extract dollar amount if present
      const amountMatch = claim.match(/\$([\d,]+\.\d+)/);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;
      
      // Extract claim type
      const typeMatch = claim.match(/\(([^)]+)\)$/);
      const type = typeMatch ? typeMatch[1].trim().toLowerCase() : 'Unknown';
      
      // Only add claims with payouts
      if (amount > 0) {
        // Normalize claim types for consistency
        let normalizedType = type;
        if (type.includes('harras') || type.includes('harass')) {
          normalizedType = 'sexual harassment';
        }
        
        // Find existing year entry or create new one
        const existingYearEntry = processedData.find(entry => entry.year === year);
        
        if (existingYearEntry) {
          // Add this claim type to existing year entry
          existingYearEntry[normalizedType] = amount;
        } else {
          // Create new year entry with this claim type
          const newEntry = { year };
          newEntry[normalizedType] = amount;
          processedData.push(newEntry);
        }
      }
    });
    
    setChartData(processedData);
    
    console.log("Formatted chart data:", processedData);
  }, [claimsSummary]);

  return (
    <div className="bg-white p-8 min-h-full flex flex-col font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Customer Loss Runs Detail Report</h1>
        <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        <p className="text-gray-600">Submission ID: {data?.submission_id || "N/A"}</p>
      </div>

      {/* Claims Summary Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Claims Summary:</h2>
        <ul className="list-disc pl-8">
          {claimsSummary.map((claim, index) => (
            <li key={index} className="mb-1">{claim}</li>
          ))}
        </ul>
      </div>

      {/* Totals Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Totals:</h2>
        <div className="pl-8">
          <p>Total Number of Claims: {totals["Total Number of Claims"]}</p>
          <p>Total Loss Paid: {totals["Total Loss Paid"]}</p>
          <p>Total Expense Paid: {totals["Total Expense Paid"]}</p>
          <p>Salvage/Subrogation Recovered: {totals["Salvage/Subrogation Recovered"]}</p>
          <p>Loss Reserves: {totals["Loss Reserves"]}</p>
          <p>Expense Reserves: {totals["Expense Reserves"]}</p>
          <p>Total Incurred: {totals["Total Incurred"]}</p>
        </div>
      </div>

      {/* Chart Representation - Using Recharts */}
      <div className="mb-8">
        {/* <h2 className="text-xl font-bold mb-4">Claim Payouts by Year and Loss Type</h2> */}
        {chartData.length > 0 ? (
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  label={{ value: 'Payout Amount ($)', angle: -90, position: 'insideLeft' }}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip 
                  formatter={(value) => ['$' + value.toLocaleString(), 'Payout Amount']}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} title="Loss Type" />
                <Bar dataKey="retaliation" fill="#3B82F6" name="Retaliation" />
                <Bar dataKey="sexual harassment" fill="#F97316" name="Sexual Harassment" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center border border-gray-300">
            <p className="text-gray-500">No payout data available to display</p>
          </div>
        )}
      </div>

     
    </div>
  );
};

export default LossRunPdfViewer;