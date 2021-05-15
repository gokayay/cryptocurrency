import React from "react";
import { Line } from 'react-chartjs-2';




class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          item: {},
          data: {}
        }
    }
    
      componentDidMount() {
        fetch(`https://api.coincap.io/v2/assets/${this.props.selectedCoin}/history?interval=d1`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                item: result?.data?.filter((element, index, arr) => index > arr.length - 8 )
              });
              this.setState({
                data: {
                    labels: this.state?.item?.map(item => item.date),
                    datasets: [
                      {
                        label: '7 day change',
                        data: this.state?.item?.map(item => parseFloat(item.priceUsd)),
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                      },
                    ],
                }
              })
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }


    render() {
        return <div><h1> LineChart</h1>
            <Line data={this.state?.data} /></div>;
    }
  }

export default LineChart;
