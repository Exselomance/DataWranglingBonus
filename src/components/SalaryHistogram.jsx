import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import jobData from '../data.json';

const salaryRanges = [
  { range: '10.000-40.000', min: 10000, max: 40000 },
  { range: '40.000-60.000', min: 40000, max: 60000 },
  { range: '60.000-80.000', min: 60000, max: 80000 },
  { range: '80.000-100.000', min: 80000, max: 100000 },
  { range: '100.000+', min: 100000, max: Infinity },
];

const data = salaryRanges.map(({ range, min, max }) => ({
  range,
  count: jobData.filter(job => job.salary_from >= min && job.salary_from < max).length,
}));

export default function SalaryHistogram() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" name="Number of vacancies" fill="#8884d8" animationDuration={7000}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
