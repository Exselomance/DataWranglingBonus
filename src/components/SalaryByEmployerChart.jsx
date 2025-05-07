import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Text } from 'recharts';
import jobData from '../data.json';

const employerSalaries = {};

jobData.forEach(job => {
  if (job.salary_from && job.employer) {
    employerSalaries[job.employer] = employerSalaries[job.employer] || { total: 0, count: 0 };
    employerSalaries[job.employer].total += job.salary_from;
    employerSalaries[job.employer].count += 1;
  }
});

const chartData = Object.entries(employerSalaries)
  .filter(([_, { count }]) => count >= 3)
  .map(([employer, { total, count }]) => ({
    employer: employer.length > 30 ? `${employer.substring(0, 30)}...` : employer,
    avgSalary: Math.round(total / count),
    count
  }))
  .sort((a, b) => b.avgSalary - a.avgSalary)
  .slice(0, 10);

const formatSalary = (value) => `${Math.round(value / 1000)}.000 ₽`;

export default function SalaryByEmployerChart() {
  if (chartData.length === 0) return <div>No data available for employers with 10+ vacancies</div>;

  return (

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, bottom: 100 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={formatSalary}
            label={{ value: 'Average Salary', position: 'bottom'}}
          />
          <YAxis
            type="category"
            dataKey="employer"
            tick={{ fontSize: 11 }}
            width={100}
            domain={[0, 'dataMax']}
            
          />
          <Bar
            dataKey="avgSalary"
            fill="#4a90e2"
            maxBarSize={45}
            label={{
                position: 'insideBase', // or 'insideBase'
                fill: '#ffffff',
                fontSize: 12,
              }}
            animationDuration={11000}
          />
        </BarChart>
      </ResponsiveContainer>
  );
}
