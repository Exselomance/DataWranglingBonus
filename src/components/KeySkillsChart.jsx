import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import jobData from '../data.json';

// Step 1: Count skills and track related job URLs and titles
const skillMap = {};

jobData.forEach((job) => {
  job.key_skills.forEach((skill) => {
    if (!skillMap[skill]) {
      skillMap[skill] = { count: 0, urls: new Set(), titles: new Set() };
    }
    skillMap[skill].count += 1;
    if (job.listing_url) {
      skillMap[skill].urls.add(job.listing_url);
    }
    if (job.name) {
      skillMap[skill].titles.add(job.name);
    }
  });
});

// Step 2: Convert to array, sort, and get top 10
const chartData = Object.entries(skillMap)
  .map(([skill, { count, urls, titles }]) => ({
    skill,
    count,
    urls: Array.from(urls),
    titles: Array.from(titles),
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

// Step 3: Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { skill, urls, titles } = payload[0].payload;

    return (
      <div
        style={{
          background: 'white',
          border: '1px solid #ccc',
          padding: '10px',
          maxWidth: '250px',
        }}
      >
        <strong>{skill}</strong>
        <p>Found in {titles.length} job(s):</p>
        <ul style={{ margin: 0, paddingLeft: '1em' }}>
          {titles.slice(0, 3).map((title, index) => (
            <li key={index}>
              <a href={urls[index]} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </li>
          ))}
          {titles.length > 3 && <li>...and more</li>}
        </ul>
      </div>
    );
  }
  return null;
};

export default function KeySkillsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 80 }}>
        <XAxis
          dataKey="skill"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={80}
        />
        <YAxis />
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: 'auto' }} />
        <Bar dataKey="count" fill="#82ca9d" animationDuration={5000}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
