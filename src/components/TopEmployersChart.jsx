import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import jobData from '../data.json';

const employerCounts = {};

jobData.forEach(job => {
  const name = job.employer || 'Unknown';
  employerCounts[name] = (employerCounts[name] || 0) + 1;
});

const chartData = Object.entries(employerCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([employer, count]) => ({ employer, count }));

export default function TopEmployersChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" ticks={[10, 20, 25, 60]}/>
        <YAxis type="category" dataKey="employer" tick={{ fontSize: 10 }} width={60} angle={-45}/>
        <Tooltip />
        <Bar dataKey="count" name="Number of vacancies" fill="#82ca9d" animationDuration={9000} />
      </BarChart>
    </ResponsiveContainer>
  );
}
