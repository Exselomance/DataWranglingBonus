import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import jobData from '../data.json';

// Helper function to parse experience and categorize into ranges
const parseExperience = (exp) => {
  if (exp.includes('до 1 года') || exp.includes('Нет опыта')) return '0-1 year';
  if (exp.includes('От 1 года до 3 лет')) return '1-3 years';
  if (exp.includes('От 3 до 6 лет')) return '3-6 years';
  if (exp.includes('Более 6 лет')) return '6+ years';
  return 'Unknown';
};

// Calculate the average salary for each experience level
const experienceSalaryMap = {};

jobData.forEach((job) => {
  const experienceLevel = parseExperience(job.experience);
  if (job.salary_from) {
    if (!experienceSalaryMap[experienceLevel]) {
      experienceSalaryMap[experienceLevel] = { totalSalary: 0, count: 0 };
    }
    experienceSalaryMap[experienceLevel].totalSalary += job.salary_from;
    experienceSalaryMap[experienceLevel].count += 1;
  }
});

// Calculate average salary for each experience level
const chartData = Object.entries(experienceSalaryMap).map(([experience, { totalSalary, count }]) => ({
  experience,
  avgSalary: totalSalary / count,
}));

// Calculate the overall mean salary
const totalSalary = jobData
  .filter(job => job.salary_from)
  .reduce((sum, job) => sum + job.salary_from, 0);
const meanSalary = totalSalary / jobData.filter(job => job.salary_from).length;

// Format salary for display (e.g., 60,000)
const formatSalary = (salary) => {
  return salary.toLocaleString(); // Adds comma as thousands separator
};

export default function ExperienceSalaryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="experience" name="Experience Level" />
        <YAxis
          tickFormatter={formatSalary}
          label={{ value: 'Salary (Rubles)', angle: -90, position: 'outsideLeft' }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { experience, avgSalary } = payload[0].payload;
              return (
                <div style={{ background: 'white', border: '1px solid #ccc', padding: '10px' }}>
                  <strong>Experience Level: {experience}</strong>
                  <p>Average Salary: {formatSalary(avgSalary)} RUB</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="avgSalary" fill="#82ca9d" animationDuration={2000} />
        
        {/* Reference Line for Mean Salary */}
        <ReferenceLine
          y={meanSalary}
          label={`Avg Salary: ${formatSalary(meanSalary)} RUB`}
          stroke="red"
          strokeDasharray="3 3"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
