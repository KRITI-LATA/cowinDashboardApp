// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationGenderDetails} = props

  return (
    <div className="Vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          dataKey="count"
          startAngle={180}
          endAngle={0}
          data={vaccinationGenderDetails}
          cx="50%"
          cy="30%"
          innerRadius="30%"
          outerRadius="60%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill=" #5a8dee" />
          <Cell name="Others" fill=" #2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
