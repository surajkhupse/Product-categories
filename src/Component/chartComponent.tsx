import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

HighchartsExporting(Highcharts);

export interface ChartDataPorps {
  categories: string[];
  seriesData: number[];
  reportRun: boolean; 
}

const ChartComponent = (props: ChartDataPorps) => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Monthly Data Overview",
    },
    xAxis: {
      categories: props.categories,
    },
    yAxis: {
      title: {
        text: "Price",
      },
      tickPositions: [0, 200, 400, 600, 800, 1000, 1200],
      min: 0,
      max: 1200,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true, // Enable data labels
          format: '{point.y:.1f}$', 
        },
      },
    },
    series: [
      {
        name: "Smratphones",
        data: props.seriesData,
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
  };

  // pie chart option 

  const pieOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Category Distribution",
    },
    series: [
      {
        name: "Categories",
        data: props.seriesData.map((value, index) => ({
          name: props.categories[index], 
          y: value,
        })),
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
  };


  return (
    <div style={{ width: "100%", height: "400px" }}>
      <div style={{ width: "100%", height: "400px" }}>
      {props.reportRun ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
      )}
    </div>
      
    </div>
  );
};

export default ChartComponent;
