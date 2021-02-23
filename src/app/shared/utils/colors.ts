const fontSize = '16px';
const smallFontSize = '14px';
const xsFontsize = '11px';

export const appColors = Object.freeze({
  xPurple: '#b799df',
  xGreen: '#41d9a5',
  xBlue: '#6ed6cd',
  xYellow: '#f0e773',
  almostBlack: '#050C10',
  alphaGrey: 'rgba(230, 230, 230, 0.12)',
  blue: '#00BFFF',
  blueHeader: '#0054A0',
  bluishGrey: '#91A6BA',
  darkGrey: '#060D13',
  green: '#00AA55',
  grey: '#696969',
  lightGreen: '#00d46a',
  lightGrey: '#33373B',
  orange: '#f89406',
  pastelBlue: '#3870a0',
  pastelGreen: '#06D6A0',
  pastelPink: '#EF476F',
  pink: '#EC5BB9',
  purple: '#BF6EE0',
  red: '#FF6347',
  white: '#FEFEFE',
  yellow: '#FFD700',
});

export const colors = Object.freeze({
  red: 'rgb(255,69,58)',
  orange: 'rgb(255,159,10)',
  yellow: 'rgb(255,214,10)',
  green: 'rgb(48,209,88)',
  teal: 'rgb(100,210,255)',
  blue: 'rgb(10,132,255)',
  bluishGrey: '#91A6BA',
  indigo: 'rgb(94,92,230)',
  purple: 'rgb(191,90,242)',
  pink: 'rgb(255,55,95)',
  grey1: 'rgb(152, 152, 157)',
  grey2: 'rgb(99, 99, 102)',
  grey3: 'rgb(72, 72, 74)',
  grey4: 'rgb(58, 58, 60)',
  grey5: 'rgb(44, 44, 46)',
  grey6: 'rgb(28, 28, 30)',
  white: '#FEFEFE'
});

export const globalChartColors = Object.freeze({
  darkTheme: {
    exporting: {
      enabled: false
    },
    xAxis: {
      labels: {
        style: {
          color: appColors.white,
          fontSize: smallFontSize
        }
      },
      gridLineColor: appColors.grey,
      lineColor: appColors.grey,
      title: {
        style: {
          color: appColors.white,
          fontSize,
          fontWeight: 500
        }
      }
    },
    yAxis: {
      labels: {
        style: {
          color: appColors.white,
          fontSize: smallFontSize
        }
      },
      title: {
        style: {
          color: appColors.white,
          fontSize
        }
      },
      gridLineColor: appColors.grey,
      stackLabels: {
        style: {
          color: appColors.white,
          fontSize: xsFontsize,
          textOutline: 'none'
        }
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          style: {
            color: appColors.white,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      bar: {
        dataLabels: {
          style: {
            color: appColors.white,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      series: {
        dataLabels: {
          style: {
            color: appColors.white,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      pie: {
        dataLabels: {
          style: {
            color: appColors.white,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      }
    },
    legend: {
      itemStyle: {
        color: appColors.white,
        fontSize: smallFontSize,
        fontWeight: 300
      }
    }
  },
  lightTheme: {
    exporting: {
      enabled: false
    },
    xAxis: {
      labels: {
        style: {
          color: appColors.almostBlack,
          fontSize: smallFontSize
        }
      },
      gridLineColor: appColors.grey,
      lineColor: appColors.grey,
      title: {
        style: {
          color: appColors.almostBlack,
          fontSize,
          fontWeight: 500
        }
      }
    },
    yAxis: {
      labels: {
        style: {
          color: appColors.almostBlack,
          fontSize: smallFontSize
        }
      },
      title: {
        style: {
          color: appColors.almostBlack,
          fontSize
        }
      },
      gridLineColor: appColors.grey,
      stackLabels: {
        style: {
          color: appColors.almostBlack,
          fontSize: xsFontsize,
          textOutline: 'none'
        }
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          style: {
            color: appColors.almostBlack,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      bar: {
        dataLabels: {
          style: {
            color: appColors.almostBlack,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      series: {
        dataLabels: {
          style: {
            color: appColors.almostBlack,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      },
      pie: {
        dataLabels: {
          style: {
            color: appColors.almostBlack,
            fontSize: smallFontSize,
            textOutline: '1px black'
          }
        }
      }
    },
    legend: {
      itemStyle: {
        color: appColors.almostBlack,
        fontSize: smallFontSize,
        fontWeight: 300
      }
    }
  }
});
