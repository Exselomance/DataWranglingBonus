import ExperienceSalaryChart from './components/ExperienceSalaryChart';
import KeySkillsChart from './components/KeySkillsChart';
import VacancyMap from './components/VacancyMap';
import SalaryHistogram from './components/SalaryHistogram';
import TopEmployersChart from './components/TopEmployersChart';
import SalaryByEmployerChart from './components/SalaryByEmployerChart';

function App() {
  return (
      <div className="App">
        <h1>IT Jobs Dashboard in Moscow</h1>

        <div className="chart-container">
          <h2>Salary vs Experience</h2>
          <ExperienceSalaryChart />
        </div>

        <div className="chart-container">
          <h2>Top Key Skills</h2>
          <KeySkillsChart />
        </div>

        <div className="chart-container">
          <h2>Salary Distribution</h2>
          <SalaryHistogram />
        </div>
        <div className="chart-container">
          <h2>Top Employers</h2>
          <TopEmployersChart />
        </div>

        <div className="chart-container-2">
          <h2>Average Salary by Employer</h2>
          <SalaryByEmployerChart />
        </div>

        <div className="map-container">
          <h2>Vacancies Map</h2>
          <VacancyMap />
        </div>
      </div>
  );
}

export default App;
