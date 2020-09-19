import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

import Filters from '../../components/Filters';

import { barOptions, pieOptions } from './chart-options';
import {
  buildBarSeries,
  getGenderChartData,
  getPlatformChartData,
} from './helpers';

import './styles.css';

type PieChartData = {
  labels: string[];
  series: number[];
};

type BarChartData = {
  x: string;
  y: number;
};

const initialPieData = {
  labels: [],
  series: [],
};

const baseurl = 'https://sds-application-david.herokuapp.com';

const Charts = () => {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [platformData, setPlatformData] = useState<PieChartData>(
    initialPieData
  );
  const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

  useEffect(() => {
    async function getData() {
      const recordsResponse = await axios.get(`${baseurl}/records`);
      const gamesResponse = await axios.get(`${baseurl}/games`);

      const gamesData = gamesResponse.data;
      const recordsData = recordsResponse.data.content;

      const barData = buildBarSeries(gamesData, recordsData);
      setBarChartData(barData);

      const platformChartData = getPlatformChartData(recordsData);
      setPlatformData(platformChartData);

      const genderChartData = getGenderChartData(recordsData);
      setGenderData(genderChartData);
    }
    getData();
  }, []);

  return (
    <div className="page-container">
      <Filters link="/records" linkText="VER TABELA" />
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">Jogos mais votados</h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="900"
              height="650"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title">Plataformas</h2>
            <Chart
              options={{ ...pieOptions, labels: platformData?.labels }}
              type="donut"
              width="350"
              series={platformData?.series}
            />
          </div>
          <div className="gender-chart">
            <h2 className="chart-title">Gêneros</h2>
            <Chart
              options={{ ...pieOptions, labels: genderData?.labels }}
              type="donut"
              series={genderData?.series}
              width="350"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
