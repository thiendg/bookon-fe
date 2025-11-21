import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  useEffect(() => {
    // Check if ApexCharts is available globally after script loading
    if (window.ApexCharts) {
      // Chart for Total Users (Visitors) - adapted from index.html's "chart-visitors"
      new window.ApexCharts(document.getElementById('chart-visitors'), {
        chart: {
          type: 'line',
          fontFamily: 'inherit',
          height: 96,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        stroke: {
          width: [2, 1],
          dashArray: [0, 3],
          lineCap: 'round',
          curve: 'smooth',
        },
        series: [
          {
            name: 'Visitors',
            data: [
              7687, 7543, 7545, 7543, 7635, 8140, 7810, 8315, 8379, 8441, 8485, 8227, 8906, 8561, 8333, 8551, 9305, 9647, 9359, 9840, 9805, 8612, 8970,
              8097, 8070, 9829, 10545, 10754, 10270, 9282,
            ],
          },
          {
            name: 'Visitors last month',
            data: [
              8630, 9389, 8427, 9669, 8736, 8261, 8037, 8922, 9758, 8592, 8976, 9459, 8125, 8528, 8027, 8256, 8670, 9384, 9813, 8425, 8162, 8024, 8897,
              9284, 8972, 8776, 8121, 9476, 8281, 9065,
            ],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
        ],
        colors: ['var(--tblr-primary)', 'var(--tblr-gray-400)'], // Adjusted for CSS variables
        legend: {
          show: false,
        },
      }).render();

      // Chart for Active Users - adapted from index.html's "chart-active-users-3"
      new window.ApexCharts(document.getElementById('chart-active-users-3'), {
        chart: {
          type: 'radialBar',
          fontFamily: 'inherit',
          height: 192,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -120,
            endAngle: 120,
            hollow: {
              margin: 16,
              size: '50%',
            },
            dataLabels: {
              show: true,
              value: {
                offsetY: -8,
                fontSize: '24px',
              },
            },
          },
        },
        series: [78],
        labels: [''],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        colors: ['var(--tblr-primary)'], // Adjusted for CSS variables
        legend: {
          show: false,
        },
      }).render();

      // Chart for Revenue Background - adapted from index.html's "chart-revenue-bg"
      new window.ApexCharts(document.getElementById('chart-revenue-bg'), {
        chart: {
          type: 'area',
          fontFamily: 'inherit',
          height: 40,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          colors: ['var(--tblr-primary-rgb, 6,111,209, 0.16)'], // Using rgba for transparency
          type: 'solid',
        },
        stroke: {
          width: 2,
          lineCap: 'round',
          curve: 'smooth',
        },
        series: [
          {
            name: 'Profits',
            data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
        ],
        colors: ['var(--tblr-primary)'],
        legend: {
          show: false,
        },
      }).render();

      // Chart for New Clients - adapted from index.html's "chart-new-clients"
      new window.ApexCharts(document.getElementById('chart-new-clients'), {
        chart: {
          type: 'line',
          fontFamily: 'inherit',
          height: 40,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        stroke: {
          width: [2, 1],
          dashArray: [0, 3],
          lineCap: 'round',
          curve: 'smooth',
        },
        series: [
          {
            name: 'May',
            data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 4, 46, 39, 62, 51, 35, 41, 67],
          },
          {
            name: 'April',
            data: [93, 54, 51, 24, 35, 35, 31, 67, 19, 43, 28, 36, 62, 61, 27, 39, 35, 41, 27, 35, 51, 46, 62, 37, 44, 53, 41, 65, 39, 37],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
        ],
        colors: ['var(--tblr-primary)', 'var(--tblr-gray-600)'], // Adjusted for CSS variables
        legend: {
          show: false,
        },
      }).render();

      // Chart for Active Subscriptions (Active Users) - adapted from index.html's "chart-active-users"
      new window.ApexCharts(document.getElementById('chart-active-users'), {
        chart: {
          type: 'bar',
          fontFamily: 'inherit',
          height: 40,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: 'Profits',
            data: [37, 35, 44, 28, 36, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 39, 62, 51, 35, 41, 67],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
        ],
        colors: ['var(--tblr-primary)'], // Adjusted for CSS variables
        legend: {
          show: false,
        },
      }).render();

      // Chart for Mentions (Traffic Summary) - adapted from index.html's "chart-mentions"
      new window.ApexCharts(document.getElementById('chart-mentions'), {
        chart: {
          type: 'bar',
          fontFamily: 'inherit',
          height: 240,
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
          stacked: true,
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        series: [
          {
            name: 'Web',
            data: [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8, 24, 29, 51, 40, 47, 23, 26, 50, 26, 41, 22, 46, 47, 81, 46, 6],
          },
          {
            name: 'Social',
            data: [2, 5, 4, 3, 3, 1, 4, 7, 5, 1, 2, 5, 3, 2, 6, 7, 7, 1, 5, 5, 2, 12, 4, 6, 18, 3, 5, 2, 13, 15, 20, 47, 18, 15, 11, 10, 0],
          },
          {
            name: 'Other',
            data: [2, 9, 1, 7, 8, 3, 6, 5, 5, 4, 6, 4, 1, 9, 3, 6, 7, 5, 2, 8, 4, 9, 1, 2, 6, 7, 5, 1, 8, 3, 2, 3, 4, 9, 7, 1, 6],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          padding: {
            top: -20,
            right: 0,
            left: -4,
            bottom: -4,
          },
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
          '2020-07-20',
          '2020-07-21',
          '2020-07-22',
          '2020-07-23',
          '2020-07-24',
          '2020-07-25',
          '2020-07-26',
        ],
        colors: [
          'var(--tblr-primary)',
          'var(--tblr-primary-rgb, 6,111,209, 0.8)',
          'var(--tblr-green-rgb, 40,167,69, 0.8)',
        ], // Adjusted for CSS variables
        legend: {
          show: false,
        },
      }).render();

      // Sparkline for Activity - adapted from index.html's "sparkline-activity"
      new window.ApexCharts(document.getElementById('sparkline-activity'), {
        chart: {
          type: 'radialBar',
          fontFamily: 'inherit',
          height: 40,
          width: 40,
          animations: {
            enabled: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '75%',
            },
            track: {
              margin: 0,
            },
            dataLabels: {
              show: false,
            },
          },
        },
        colors: ['var(--tblr-primary)'],
        series: [35],
      }).render();

      // Chart for Development Activity - adapted from index.html's "chart-development-activity"
      new window.ApexCharts(document.getElementById('chart-development-activity'), {
        chart: {
          type: 'area',
          fontFamily: 'inherit',
          height: 192,
          sparkline: {
            enabled: true,
          },
          animations: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          colors: ['var(--tblr-primary-rgb, 6,111,209, 0.16)'],
          type: 'solid',
        },
        stroke: {
          width: 2,
          lineCap: 'round',
          curve: 'smooth',
        },
        series: [
          {
            name: 'Purchases',
            data: [3, 5, 4, 6, 7, 5, 6, 8, 24, 7, 12, 5, 6, 3, 8, 4, 14, 30, 17, 19, 15, 14, 25, 32, 40, 55, 60, 48, 52, 70],
          },
        ],
        tooltip: {
          theme: 'dark',
        },
        grid: {
          strokeDashArray: 4,
        },
        xaxis: {
          labels: {
            padding: 0,
          },
          tooltip: {
            enabled: false,
          },
          axisBorder: {
            show: false,
          },
          type: 'datetime',
        },
        yaxis: {
          labels: {
            padding: 4,
          },
        },
        labels: [
          '2020-06-20',
          '2020-06-21',
          '2020-06-22',
          '2020-06-23',
          '2020-06-24',
          '2020-06-25',
          '2020-06-26',
          '2020-06-27',
          '2020-06-28',
          '2020-06-29',
          '2020-06-30',
          '2020-07-01',
          '2020-07-02',
          '2020-07-03',
          '2020-07-04',
          '2020-07-05',
          '2020-07-06',
          '2020-07-07',
          '2020-07-08',
          '2020-07-09',
          '2020-07-10',
          '2020-07-11',
          '2020-07-12',
          '2020-07-13',
          '2020-07-14',
          '2020-07-15',
          '2020-07-16',
          '2020-07-17',
          '2020-07-18',
          '2020-07-19',
        ],
        colors: ['var(--tblr-primary)'],
        legend: {
          show: false,
        },
        point: {
          show: false,
        },
      }).render();

      // Sparklines for Bounce Rate in Most Visited Pages Table
      const sparklineBounceRateIds = ['sparkline-bounce-rate-1', 'sparkline-bounce-rate-2', 'sparkline-bounce-rate-3', 'sparkline-bounce-rate-4', 'sparkline-bounce-rate-5', 'sparkline-bounce-rate-6'];
      const sparklineData = [
        [17, 24, 20, 10, 5, 1, 4, 18, 13],
        [13, 11, 19, 22, 12, 7, 14, 3, 21],
        [10, 13, 10, 4, 17, 3, 23, 22, 19],
        [6, 15, 13, 13, 5, 7, 17, 20, 19],
        [2, 11, 15, 14, 21, 20, 8, 23, 18, 14],
        [22, 12, 7, 14, 3, 21, 8, 23, 18, 14],
      ];

      sparklineBounceRateIds.forEach((id, index) => {
        if (document.getElementById(id)) {
          new window.ApexCharts(document.getElementById(id), {
            chart: {
              type: 'line',
              fontFamily: 'inherit',
              height: 24,
              animations: {
                enabled: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            tooltip: {
              enabled: false,
            },
            stroke: {
              width: 2,
              lineCap: 'round',
            },
            series: [{
              color: 'var(--tblr-primary)',
              data: sparklineData[index],
            }],
          }).render();
        }
      });

    } else {
      console.error('ApexCharts not loaded.');
    }

    // Initialize jsVectorMap
    if (window.jsVectorMap) {
      new window.jsVectorMap({
        selector: '#map-world',
        map: 'world',
        backgroundColor: 'transparent',
        regionStyle: {
          initial: {
            fill: 'var(--tblr-bg-surface-secondary)',
            stroke: 'var(--tblr-border-color)',
            strokeWidth: 2,
          },
        },
        zoomOnScroll: false,
        zoomButtons: false,
        series: {
          regions: [
            {
              attribute: 'fill',
              scale: {
                scale1: 'color-mix(in srgb, transparent, var(--tblr-primary) 10%)',
                scale2: 'color-mix(in srgb, transparent, var(--tblr-primary) 20%)',
                scale3: 'color-mix(in srgb, transparent, var(--tblr-primary) 30%)',
                scale4: 'color-mix(in srgb, transparent, var(--tblr-primary) 40%)',
                scale5: 'color-mix(in srgb, transparent, var(--tblr-primary) 50%)',
                scale6: 'color-mix(in srgb, transparent, var(--tblr-primary) 60%)',
                scale7: 'color-mix(in srgb, transparent, var(--tblr-primary) 70%)',
                scale8: 'color-mix(in srgb, transparent, var(--tblr-primary) 80%)',
                scale9: 'color-mix(in srgb, transparent, var(--tblr-primary) 90%)',
                scale10: 'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
              },
              values: {
                AF: 'scale2',
                AL: 'scale2',
                DZ: 'scale4',
                AO: 'scale3',
                AG: 'scale1',
                AR: 'scale5',
                AM: 'scale1',
                AU: 'scale7',
                AT: 'scale5',
                AZ: 'scale3',
                BS: 'scale1',
                BH: 'scale2',
                BD: 'scale4',
                BB: 'scale1',
                BY: 'scale3',
                BE: 'scale5',
                BZ: 'scale1',
                BJ: 'scale1',
                BT: 'scale1',
                BO: 'scale2',
                BA: 'scale2',
                BW: 'scale2',
                BR: 'scale8',
                BN: 'scale2',
                BG: 'scale2',
                BF: 'scale1',
                BI: 'scale1',
                KH: 'scale2',
                CM: 'scale2',
                CA: 'scale7',
                CV: 'scale1',
                CF: 'scale1',
                TD: 'scale1',
                CL: 'scale4',
                CN: 'scale9',
                CO: 'scale5',
                KM: 'scale1',
                CD: 'scale2',
                CG: 'scale2',
                CR: 'scale2',
                CI: 'scale2',
                HR: 'scale3',
                CY: 'scale2',
                CZ: 'scale4',
                DK: 'scale5',
                DJ: 'scale1',
                DM: 'scale1',
                DO: 'scale3',
                EC: 'scale3',
                EG: 'scale5',
                SV: 'scale2',
                GQ: 'scale2',
                ER: 'scale1',
                EE: 'scale2',
                ET: 'scale2',
                FJ: 'scale1',
                FI: 'scale5',
                FR: 'scale8',
                GA: 'scale2',
                GM: 'scale1',
                GE: 'scale2',
                DE: 'scale8',
                GH: 'scale2',
                GR: 'scale5',
                GD: 'scale1',
                GT: 'scale2',
                GN: 'scale1',
                GW: 'scale1',
                GY: 'scale1',
                HT: 'scale1',
                HN: 'scale2',
                HK: 'scale5',
                HU: 'scale4',
                IS: 'scale2',
                IN: 'scale7',
                ID: 'scale6',
                IR: 'scale5',
                IQ: 'scale3',
                IE: 'scale5',
                IL: 'scale5',
                IT: 'scale8',
                JM: 'scale2',
                JP: 'scale9',
                JO: 'scale2',
                KZ: 'scale4',
                KE: 'scale2',
                KI: 'scale1',
                KR: 'scale6',
                KW: 'scale4',
                KG: 'scale1',
                LA: 'scale1',
                LV: 'scale2',
                LB: 'scale2',
                LS: 'scale1',
                LR: 'scale1',
                LY: 'scale3',
                LT: 'scale2',
                LU: 'scale3',
                MK: 'scale1',
                MG: 'scale1',
                MW: 'scale1',
                MY: 'scale5',
                MV: 'scale1',
                ML: 'scale1',
                MT: 'scale1',
                MR: 'scale1',
                MU: 'scale1',
                MX: 'scale7',
                MD: 'scale1',
                MN: 'scale1',
                ME: 'scale1',
                MA: 'scale3',
                MZ: 'scale2',
                MM: 'scale2',
                NA: 'scale2',
                NP: 'scale2',
                NL: 'scale6',
                NZ: 'scale4',
                NI: 'scale1',
                NE: 'scale1',
                NG: 'scale5',
                NO: 'scale5',
                OM: 'scale3',
                PK: 'scale4',
                PA: 'scale2',
                PG: 'scale1',
                PY: 'scale2',
                PE: 'scale4',
                PH: 'scale4',
                PL: 'scale10',
                PT: 'scale5',
                QA: 'scale4',
                RO: 'scale4',
                RU: 'scale7',
                RW: 'scale1',
                WS: 'scale1',
                ST: 'scale1',
                SA: 'scale5',
                SN: 'scale2',
                RS: 'scale2',
                SC: 'scale1',
                SL: 'scale1',
                SG: 'scale5',
                SK: 'scale3',
                SI: 'scale2',
                SB: 'scale1',
                ZA: 'scale5',
                ES: 'scale7',
                LK: 'scale2',
                KN: 'scale1',
                LC: 'scale1',
                VC: 'scale1',
                SD: 'scale3',
                SR: 'scale1',
                SZ: 'scale1',
                SE: 'scale5',
                CH: 'scale6',
                SY: 'scale3',
                TW: 'scale5',
                TJ: 'scale1',
                TZ: 'scale2',
                TH: 'scale5',
                TL: 'scale1',
                TG: 'scale1',
                TO: 'scale1',
                TT: 'scale2',
                TN: 'scale2',
                TR: 'scale6',
                TM: 'scale1',
                UG: 'scale2',
                UA: 'scale4',
                AE: 'scale5',
                GB: 'scale8',
                US: 'scale10',
                UY: 'scale2',
                UZ: 'scale2',
                VU: 'scale1',
                VE: 'scale5',
                VN: 'scale4',
                YE: 'scale2',
                ZM: 'scale2',
                ZW: 'scale1',
              },
            },
          ],
        },
      });

      // Handle map resize
      window.addEventListener('resize', () => {
        if (window.jsVectorMap) {
          // Assuming the map instance is accessible or can be re-initialized safely.
          // For now, this is a basic placeholder. A more robust solution might store the map instance in ref.
          document.getElementById('map-world') &&
            new window.jsVectorMap({
              selector: '#map-world',
              map: 'world',
              backgroundColor: 'transparent',
              regionStyle: {
                initial: {
                  fill: 'var(--tblr-bg-surface-secondary)',
                  stroke: 'var(--tblr-border-color)',
                  strokeWidth: 2,
                },
              },
              zoomOnScroll: false,
              zoomButtons: false,
              series: {
                regions: [
                  {
                    attribute: 'fill',
                    scale: {
                      scale1: 'color-mix(in srgb, transparent, var(--tblr-primary) 10%)',
                      scale2: 'color-mix(in srgb, transparent, var(--tblr-primary) 20%)',
                      scale3: 'color-mix(in srgb, transparent, var(--tblr-primary) 30%)',
                      scale4: 'color-mix(in srgb, transparent, var(--tblr-primary) 40%)',
                      scale5: 'color-mix(in srgb, transparent, var(--tblr-primary) 50%)',
                      scale6: 'color-mix(in srgb, transparent, var(--tblr-primary) 60%)',
                      scale7: 'color-mix(in srgb, transparent, var(--tblr-primary) 70%)',
                      scale8: 'color-mix(in srgb, transparent, var(--tblr-primary) 80%)',
                      scale9: 'color-mix(in srgb, transparent, var(--tblr-primary) 90%)',
                      scale10: 'color-mix(in srgb, transparent, var(--tblr-primary) 100%)',
                    },
                    values: {
                      AF: 'scale2',
                      AL: 'scale2',
                      DZ: 'scale4',
                      AO: 'scale3',
                      AG: 'scale1',
                      AR: 'scale5',
                      AM: 'scale1',
                      AU: 'scale7',
                      AT: 'scale5',
                      AZ: 'scale3',
                      BS: 'scale1',
                      BH: 'scale2',
                      BD: 'scale4',
                      BB: 'scale1',
                      BY: 'scale3',
                      BE: 'scale5',
                      BZ: 'scale1',
                      BJ: 'scale1',
                      BT: 'scale1',
                      BO: 'scale2',
                      BA: 'scale2',
                      BW: 'scale2',
                      BR: 'scale8',
                      BN: 'scale2',
                      BG: 'scale2',
                      BF: 'scale1',
                      BI: 'scale1',
                      KH: 'scale2',
                      CM: 'scale2',
                      CA: 'scale7',
                      CV: 'scale1',
                      CF: 'scale1',
                      TD: 'scale1',
                      CL: 'scale4',
                      CN: 'scale9',
                      CO: 'scale5',
                      KM: 'scale1',
                      CD: 'scale2',
                      CG: 'scale2',
                      CR: 'scale2',
                      CI: 'scale2',
                      HR: 'scale3',
                      CY: 'scale2',
                      CZ: 'scale4',
                      DK: 'scale5',
                      DJ: 'scale1',
                      DM: 'scale1',
                      DO: 'scale3',
                      EC: 'scale3',
                      EG: 'scale5',
                      SV: 'scale2',
                      GQ: 'scale2',
                      ER: 'scale1',
                      EE: 'scale2',
                      ET: 'scale2',
                      FJ: 'scale1',
                      FI: 'scale5',
                      FR: 'scale8',
                      GA: 'scale2',
                      GM: 'scale1',
                      GE: 'scale2',
                      DE: 'scale8',
                      GH: 'scale2',
                      GR: 'scale5',
                      GD: 'scale1',
                      GT: 'scale2',
                      GN: 'scale1',
                      GW: 'scale1',
                      GY: 'scale1',
                      HT: 'scale1',
                      HN: 'scale2',
                      HK: 'scale5',
                      HU: 'scale4',
                      IS: 'scale2',
                      IN: 'scale7',
                      ID: 'scale6',
                      IR: 'scale5',
                      IQ: 'scale3',
                      IE: 'scale5',
                      IL: 'scale5',
                      IT: 'scale8',
                      JM: 'scale2',
                      JP: 'scale9',
                      JO: 'scale2',
                      KZ: 'scale4',
                      KE: 'scale2',
                      KI: 'scale1',
                      KR: 'scale6',
                      KW: 'scale4',
                      KG: 'scale1',
                      LA: 'scale1',
                      LV: 'scale2',
                      LB: 'scale2',
                      LS: 'scale1',
                      LR: 'scale1',
                      LY: 'scale3',
                      LT: 'scale2',
                      LU: 'scale3',
                      MK: 'scale1',
                      MG: 'scale1',
                      MW: 'scale1',
                      MY: 'scale5',
                      MV: 'scale1',
                      ML: 'scale1',
                      MT: 'scale1',
                      MR: 'scale1',
                      MU: 'scale1',
                      MX: 'scale7',
                      MD: 'scale1',
                      MN: 'scale1',
                      ME: 'scale1',
                      MA: 'scale3',
                      MZ: 'scale2',
                      MM: 'scale2',
                      NA: 'scale2',
                      NP: 'scale2',
                      NL: 'scale6',
                      NZ: 'scale4',
                      NI: 'scale1',
                      NE: 'scale1',
                      NG: 'scale5',
                      NO: 'scale5',
                      OM: 'scale3',
                      PK: 'scale4',
                      PA: 'scale2',
                      PG: 'scale1',
                      PY: 'scale2',
                      PE: 'scale4',
                      PH: 'scale4',
                      PL: 'scale10',
                      PT: 'scale5',
                      QA: 'scale4',
                      RO: 'scale4',
                      RU: 'scale7',
                      RW: 'scale1',
                      WS: 'scale1',
                      ST: 'scale1',
                      SA: 'scale5',
                      SN: 'scale2',
                      RS: 'scale2',
                      SC: 'scale1',
                      SL: 'scale1',
                      SG: 'scale5',
                      SK: 'scale3',
                      SI: 'scale2',
                      SB: 'scale1',
                      ZA: 'scale5',
                      ES: 'scale7',
                      LK: 'scale2',
                      KN: 'scale1',
                      LC: 'scale1',
                      VC: 'scale1',
                      SD: 'scale3',
                      SR: 'scale1',
                      SZ: 'scale1',
                      SE: 'scale5',
                      CH: 'scale6',
                      SY: 'scale3',
                      TW: 'scale5',
                      TJ: 'scale1',
                      TZ: 'scale2',
                      TH: 'scale5',
                      TL: 'scale1',
                      TG: 'scale1',
                      TO: 'scale1',
                      TT: 'scale2',
                      TN: 'scale2',
                      TR: 'scale6',
                      TM: 'scale1',
                      UG: 'scale2',
                      UA: 'scale4',
                      AE: 'scale5',
                      GB: 'scale8',
                      US: 'scale10',
                      UY: 'scale2',
                      UZ: 'scale2',
                      VU: 'scale1',
                      VE: 'scale5',
                      VN: 'scale4',
                      YE: 'scale2',
                      ZM: 'scale2',
                      ZW: 'scale1',
                    },
                  },
                ],
              },
            });
        }
      });
    } else {
      console.error('jsVectorMap not loaded.');
    }
  }, []);

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">Overview</div>
              <h2 className="page-title">Dashboard</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="btn-list">
                <span className="d-none d-sm-inline">
                  <Link to="#" className="btn">
                    New view
                  </Link>
                </span>
                <Link to="#" className="btn btn-primary d-none d-sm-inline-block" data-bs-toggle="modal" data-bs-target="#modal-report">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon"
                  >
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  Create new report
                </Link>
                <Link to="#" className="btn btn-primary d-sm-none btn-icon" data-bs-toggle="modal" data-bs-target="#modal-report" aria-label="Create new report">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon"
                  >
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">
            <div className="col-sm-12 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-12 col-sm d-flex flex-column">
                      <h3 className="h2">Welcome back, Admin!</h3>
                      <p className="text-muted">You have 5 new messages and 2 new notifications.</p>
                      <div className="row g-5 mt-auto">
                        <div className="col-auto">
                          <div className="subheader">Today's Sales</div>
                          <div className="d-flex align-items-baseline">
                            <div className="h3 me-2">6,782</div>
                            <div className="me-auto">
                              <span className="text-green d-inline-flex align-items-center lh-1">
                                7%
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon ms-1"
                                >
                                  <path d="M3 17l6 -6l4 4l8 -8" />
                                  <path d="M14 7l7 0l0 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-success"
                              style={{ width: '75%' }}
                              role="progressbar"
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              aria-label="75% Complete"
                            >
                              <span className="visually-hidden">75% Complete</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="subheader">Growth Rate</div>
                          <div className="d-flex align-items-baseline">
                            <div className="h3 me-2">78,4%</div>
                            <div className="me-auto">
                              <span className="text-red d-inline-flex align-items-center lh-1">
                                -1%
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="icon ms-1"
                                >
                                  <path d="M3 7l6 6l4 -4l8 8" />
                                  <path d="M21 10l0 7l-7 0" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div className="progress progress-sm">
                            <div
                              className="progress-bar bg-danger"
                              style={{ width: '78%' }}
                              role="progressbar"
                              aria-valuenow="78"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              aria-label="78% Complete"
                            >
                              <span className="visually-hidden">78% Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-auto d-flex justify-content-center">
                      <Link to="#">
                        <img
                          src="/tabler-1.4.0/dashboard/static/illustrations/undraw_printing_invoices_5i4r.svg"
                          alt="Tabler Illustrations"
                          className="w-100 h-auto"
                          style={{height: '200px'}}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Total Users</div>
                  <div className="d-flex align-items-baseline">
                    <div className="h1 mb-0 me-2">75,782</div>
                    <div className="me-auto">
                      <span className="text-green d-inline-flex align-items-center lh-1">
                        2%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M3 17l6 -6l4 4l8 -8" />
                          <path d="M14 7l7 0l0 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="text-secondary mt-2">24,635 users increased from last month</div>
                </div>
                <div id="chart-visitors" className="position-relative"></div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Active Users</div>
                  <div className="d-flex align-items-baseline mb-2">
                    <div className="h1 mb-0 me-2">25,782</div>
                    <div className="me-auto">
                      <span className="text-red d-inline-flex align-items-center lh-1">
                        -1%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M3 7l6 6l4 -4l8 8" />
                          <path d="M21 10l0 7l-7 0" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div id="chart-active-users-3" className="position-relative"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Sales</div>
                    <div className="ms-auto lh-1">
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle text-secondary"
                          id="sales-dropdown"
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-label="Select time range for sales data"
                        >
                          Last 7 days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sales-dropdown">
                          <Link className="dropdown-item active" to="#" aria-current="true">Last 7 days</Link>
                          <Link className="dropdown-item" to="#">Last 30 days</Link>
                          <Link className="dropdown-item" to="#">Last 3 months</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h1 mb-3">75%</div>
                  <div className="d-flex mb-2">
                    <div>Conversion rate</div>
                    <div className="ms-auto">
                      <span className="text-green d-inline-flex align-items-center lh-1">
                        7%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M3 17l6 -6l4 4l8 -8" />
                          <path d="M14 7l7 0l0 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="progress progress-sm">
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: '75%' }}
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label="75% Complete"
                    >
                      <span className="visually-hidden">75% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Revenue</div>
                    <div className="ms-auto lh-1">
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle text-secondary"
                          id="revenue-dropdown"
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-label="Select time range for revenue"
                        >
                          Last 7 days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="revenue-dropdown">
                          <Link className="dropdown-item active" to="#" aria-current="true">Last 7 days</Link>
                          <Link className="dropdown-item" to="#">Last 30 days</Link>
                          <Link className="dropdown-item" to="#">Last 3 months</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="h1 mb-0 me-2">$4,300</div>
                    <div className="me-auto">
                      <span className="text-green d-inline-flex align-items-center lh-1">
                        8%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M3 17l6 -6l4 4l8 -8" />
                          <path d="M14 7l7 0l0 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div id="chart-revenue-bg" className="position-relative rounded-bottom chart-sm"></div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">New clients</div>
                    <div className="ms-auto lh-1">
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle text-secondary"
                          id="new-clients-dropdown"
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-label="Select time range for new clients"
                        >
                          Last 7 days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="new-clients-dropdown">
                          <Link className="dropdown-item active" to="#" aria-current="true">Last 7 days</Link>
                          <Link className="dropdown-item" to="#">Last 30 days</Link>
                          <Link className="dropdown-item" to="#">Last 3 months</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="h1 mb-3 me-2">6,782</div>
                    <div className="me-auto">
                      <span className="text-yellow d-inline-flex align-items-center lh-1">
                        0%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M5 12l14 0" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div id="chart-new-clients" className="position-relative chart-sm"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Active subscriptions</div>
                    <div className="ms-auto lh-1">
                      <div className="dropdown">
                        <Link
                          className="dropdown-toggle text-secondary"
                          id="active-users-dropdown"
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          aria-label="Select time range for active users"
                        >
                          Last 7 days
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="active-users-dropdown">
                          <Link className="dropdown-item active" to="#" aria-current="true">Last 7 days</Link>
                          <Link className="dropdown-item" to="#">Last 30 days</Link>
                          <Link className="dropdown-item" to="#">Last 3 months</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-baseline">
                    <div className="h1 mb-3 me-2">2,986</div>
                    <div className="me-auto">
                      <span className="text-green d-inline-flex align-items-center lh-1">
                        4%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon ms-1"
                        >
                          <path d="M3 17l6 -6l4 4l8 -8" />
                          <path d="M14 7l7 0l0 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div id="chart-active-users" className="position-relative chart-sm"></div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row row-cards">
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-primary text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" />
                              <path d="M12 3v3m0 12v3" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">132 Sales</div>
                          <div className="text-secondary">12 waiting payments</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-green text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M17 17h-11v-14h-2" />
                              <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">78 Orders</div>
                          <div className="text-secondary">32 shipped</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-x text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">623 Shares</div>
                          <div className="text-secondary">16 today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-facebook text-white avatar">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">132 Likes</div>
                          <div className="text-secondary">21 today</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Traffic summary</h3>
                  <div id="chart-mentions" className="position-relative chart-lg"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Locations</h3>
                  <div className="ratio ratio-21x9">
                    <div>
                      <div id="map-world" className="w-100 h-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row row-cards">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <p className="mb-3">
                        Using Storage <strong>6854.45 MB </strong>of 8 GB
                      </p>
                      <div className="progress progress-separated mb-3">
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '44%' }} aria-label="Regular"></div>
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '19%' }} aria-label="System"></div>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '9%' }} aria-label="Shared"></div>
                      </div>
                      <div className="row">
                        <div className="col-auto d-flex align-items-center pe-2">
                          <span className="legend me-2 bg-primary"></span>
                          <span>Regular</span>
                          <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">915MB</span>
                        </div>
                        <div className="col-auto d-flex align-items-center px-2">
                          <span className="legend me-2 bg-info"></span>
                          <span>System</span>
                          <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">415MB</span>
                        </div>
                        <div className="col-auto d-flex align-items-center px-2">
                          <span className="legend me-2 bg-success"></span>
                          <span>Shared</span>
                          <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">201MB</span>
                        </div>
                        <div className="col-auto d-flex align-items-center ps-2">
                          <span className="legend me-2"></span>
                          <span>Free</span>
                          <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-secondary">612MB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card" style={{ height: '28rem' }}>
                    <div className="card-body card-body-scrollable card-body-scrollable-shadow">
                      <div className="divide-y">
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/052f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Jeffie Lewzey</strong> commented on your <strong>"I'm not a witch."</strong> post.
                              </div>
                              <div className="text-secondary">24 hours ago</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/002m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">It's <strong>Mallory Hulme</strong>'s birthday. Wish him well!</div>
                              <div className="text-secondary">now</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/003m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Dunn Slane</strong> posted <strong>"Well, what do you want?"</strong>.
                              </div>
                              <div className="text-secondary">now</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/000f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Emmy Levet</strong> created a new project <strong>Morning alarm clock</strong>.
                              </div>
                              <div className="text-secondary">4 days ago</div>
                            </div>
                            <div className="col-auto align-self-center">
                              <div className="badge bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/001f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Maryjo Lebarree</strong> liked your photo.</div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/004m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Egan Poetz</strong> registered new client as <strong>Trilia</strong>.
                              </div>
                              <div className="text-secondary">24 hours ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/002f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Kellie Skingley</strong> closed a new deal on project <strong>Pen Pineapple Apple Pen</strong>.
                              </div>
                              <div className="text-secondary">2 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/003f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Christabel Charlwood</strong> created a new project for <strong>Wikibox</strong>.
                              </div>
                              <div className="text-secondary">4 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/063m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Haskel Shelper</strong> change status of <strong>Tabler Icons</strong> from <strong>open</strong> to{' '}
                                <strong>closed</strong>.
                              </div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/006m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Lorry Mion</strong> liked <strong>Tabler UI Kit</strong>.</div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/004f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Leesa Beaty</strong> posted new video.</div>
                              <div className="text-secondary">2 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/007m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Perren Keemar</strong> and 3 others followed you.
                              </div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1"> SA </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Sunny Airey</strong> upload 3 new photos to category <strong>Inspirations</strong>.
                              </div>
                              <div className="text-secondary">2 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/009m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Geoffry Flaunders</strong> made a <strong>$10</strong> donation.
                              </div>
                              <div className="text-secondary">2 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/010m.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate"><strong>Thatcher Keel</strong> created a profile.</div>
                              <div className="text-secondary">3 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/005f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Dyann Escala</strong> hosted the event <strong>Tabler UI Birthday</strong>.
                              </div>
                              <div className="text-secondary">4 days ago</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/006f.jpg)' }}></span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Avivah Mugleston</strong> mentioned you on <strong>Best of 2020</strong>.
                              </div>
                              <div className="text-secondary">now</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-auto">
                              <span className="avatar avatar-1"> AA </span>
                            </div>
                            <div className="col">
                              <div className="text-truncate">
                                <strong>Arlie Armstead</strong> sent a Review Request to <strong>Amanda Blake</strong>.
                              </div>
                              <div className="text-secondary">2 days ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="card-title">Development activity</div>
                </div>
                <div className="position-relative">
                  <div className="position-absolute top-0 left-0 px-3 mt-1 w-75">
                    <div className="row g-2">
                      <div className="col-auto">
                        <div className="chart-sparkline chart-sparkline-square" id="sparkline-activity"></div>
                      </div>
                      <div className="col">
                        <div>Today's Earning: $4,262.40</div>
                        <div className="text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-inline text-green"
                          >
                            <path d="M3 17l6 -6l4 4l8 -8" />
                            <path d="M14 7l7 0l0 7" />
                          </svg>
                          +5% more than yesterday
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="chart-development-activity" className="position-relative"></div>
                </div>
                <div className="card-table table-responsive">
                  <table className="table table-vcenter">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Commit</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-1">
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(../../tabler-1.4.0/dashboard/static/avatars/000m.jpg)' }}></span>
                        </td>
                        <td className="td-truncate">
                          <div className="text-truncate">Fix dart Sass compatibility (#29755)</div>
                        </td>
                        <td className="text-nowrap text-secondary">28 Nov 2019</td>
                      </tr>
                      <tr>
                        <td className="w-1">
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(../../tabler-1.4.0/dashboard/static/avatars/052f.jpg)' }}></span>
                        </td>
                        <td className="td-truncate">
                          <div className="text-truncate">
                            Change deprecated html tags to text decoration classes (#29604)
                          </div>
                        </td>
                        <td className="text-nowrap text-secondary">27 Nov 2019</td>
                      </tr>
                      <tr>
                        <td className="w-1">
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/002m.jpg)' }}></span>
                        </td>
                        <td className="td-truncate">
                          <div className="text-truncate">
                            justify-content:between ⇒ justify-content:space-between (#29734)
                          </div>
                        </td>
                        <td className="text-nowrap text-secondary">26 Nov 2019</td>
                      </tr>
                      <tr>
                        <td className="w-1">
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/003m.jpg)' }}></span>
                        </td>
                        <td className="td-truncate">
                          <div className="text-truncate">Update change-version.js (#29736)</div>
                        </td>
                        <td className="text-nowrap text-secondary">26 Nov 2019</td>
                      </tr>
                      <tr>
                        <td className="w-1">
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/000f.jpg)' }}></span>
                        </td>
                        <td className="td-truncate">
                          <div className="text-truncate">Regenerate package-lock.json (#29730)</div>
                        </td>
                        <td className="text-nowrap text-secondary">25 Nov 2019</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card card-md sticky-top">
                <div className="card-stamp card-stamp-lg">
                  <div className="card-stamp-icon bg-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon"
                    >
                      <path d="M5 11a7 7 0 0 1 14 0v7a1.78 1.78 0 0 1 -3.1 1.4a1.65 1.65 0 0 0 -2.6 0a1.65 1.65 0 0 1 -2.6 0a1.65 1.65 0 0 0 -2.6 0a1.78 1.78 0 0 1 -3.1 -1.4v-7" />
                      <path d="M10 10l.01 0" />
                      <path d="M14 10l.01 0" />
                      <path d="M10 14a3.5 3.5 0 0 0 4 0" />
                    </svg>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-10">
                      <h3 className="h1">Tabler Icons</h3>
                      <div className="markdown">
                        All icons come from the Tabler Icons set and are MIT-licensed. Visit{' '}
                        <Link to="https://tabler.io/icons" target="_blank" rel="noopener">
                          Tabler Icons Website
                        </Link>
                        , download any of the 5880 icons in SVG, PNG or&nbsp;React and use them in your favourite design
                        tools.
                      </div>
                      <div className="mt-3">
                        <Link to="https://tabler.io/icons" className="btn btn-primary" target="_blank" rel="noopener">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 11l5 5l5 -5" />
                            <path d="M12 4l0 12" />
                          </svg>
                          Download icons
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Most Visited Pages</h3>
                </div>
                <div className="card-table table-responsive">
                  <table className="table table-vcenter">
                    <thead>
                      <tr>
                        <th>Page name</th>
                        <th>Visitors</th>
                        <th>Unique</th>
                        <th colSpan="2">Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          /
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">4,896</td>
                        <td className="text-secondary">3,654</td>
                        <td className="text-secondary">82.54%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-1"></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          /form-elements.html
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">3,652</td>
                        <td className="text-secondary">3,215</td>
                        <td className="text-secondary">76.29%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-2"></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          /index.html
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">3,256</td>
                        <td className="text-secondary">2,865</td>
                        <td className="text-secondary">72.65%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-3"></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          /icons.html
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">986</td>
                        <td className="text-secondary">865</td>
                        <td className="text-secondary">44.89%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-4"></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          /docs/
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">912</td>
                        <td className="text-secondary">822</td>
                        <td className="text-secondary">41.12%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-5"></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          /accordion.html
                          <Link to="#" className="ms-1" aria-label="Open website">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        </td>
                        <td className="text-secondary">855</td>
                        <td className="text-secondary">798</td>
                        <td className="text-secondary">32.65%</td>
                        <td className="text-end w-1">
                          <div className="chart-sparkline chart-sparkline-sm" id="sparkline-bounce-rate-6"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <Link
                to="https://github.com/sponsors/codecalm"
                className="card border-primary"
                target="_blank"
                rel="noopener"
                aria-label="Sponsor Tabler!"
                style={{ background: 'color-mix(in srgb, var(--tblr-primary) 4%, var(--tblr-bg-surface))' }}
              >
                <div className="card-body d-flex flex-column justify-content-center p-5">
                  <div className="row">
                    <div className="col-7 offset-5 text-primary">
                      <div className="h1 text-uppercase">Help Tabler Grow and Thrive</div>
                      <p className="h3 fw-normal">Sponsor Tabler and help us make a difference!</p>
                      <div className="mt-4">
                        <button className="btn w-100 pe-none" type="button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="icon text-pink"
                          >
                            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                          </svg>
                          Become a Sponsor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Social Media Traffic</h3>
                </div>
                <table className="table card-table table-vcenter">
                  <thead>
                    <tr>
                      <th>Network</th>
                      <th colSpan="2">Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Instagram</td>
                      <td>3,550</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '71%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Twitter</td>
                      <td>1,798</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '35.96%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td>1,245</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '24.9%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>TikTok</td>
                      <td>986</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '19.72%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Pinterest</td>
                      <td>854</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '17.080000000000002%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>VK</td>
                      <td>650</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '13%' }}></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Pinterest</td>
                      <td>420</td>
                      <td className="w-50">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-primary" style={{ width: '8.4%' }}></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-12 col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tasks</h3>
                </div>
                <div className="table-responsive">
                  <table className="table table-selectable card-table table-vcenter">
                    <tbody>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Extend the data model.</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          December 08, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            2/7
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            3
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(../../tabler-1.4.0/dashboard/static/avatars/000m.jpg)' }}></span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Verify the event flow.</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            0
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(../../tabler-1.4.0/dashboard/static/avatars/052f.jpg)' }}></span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Database backup and maintenance</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            0
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/002m.jpg)' }}></span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Identify the implementation team.</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          September 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            6/10
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            12
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/003m.jpg)' }}></span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Define users and workflow</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          January 01, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            0/5
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            0
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/000f.jpg)' }}></span>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1 pe-0">
                          <input type="checkbox" className="form-check-input m-0 align-middle table-selectable-check" aria-label="Select task" defaultChecked />
                        </td>
                        <td className="w-100">
                          <Link to="#" className="text-reset">Check Pull Requests</Link>
                        </td>
                        <td className="text-nowrap text-secondary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon"
                          >
                            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                            <path d="M16 3v4" />
                            <path d="M8 3v4" />
                            <path d="M4 11h16" />
                            <path d="M11 15h1" />
                            <path d="M12 15v3" />
                          </svg>
                          July 17, 2024
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M5 12l5 5l10 -10" />
                            </svg>
                            2/9
                          </Link>
                        </td>
                        <td className="text-nowrap">
                          <Link to="#" className="text-secondary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M8 9h8" />
                              <path d="M8 13h6" />
                              <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                            </svg>
                            3
                          </Link>
                        </td>
                        <td>
                          <span className="avatar avatar-sm" style={{ backgroundImage: 'url(/tabler-1.4.0/dashboard/static/avatars/001f.jpg)' }}></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Invoices</h3>
                </div>
                <div className="card-body border-bottom py-3">
                  <div className="d-flex">
                    <div className="text-secondary">
                      Show
                      <div className="mx-2 d-inline-block">
                        <input type="text" className="form-control form-control-sm" defaultValue="8" size="3" aria-label="Invoices count" />
                      </div>
                      entries
                    </div>
                    <div className="ms-auto text-secondary">
                      Search:
                      <div className="ms-2 d-inline-block">
                        <input type="text" className="form-control form-control-sm" aria-label="Search invoice" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-selectable card-table table-vcenter text-nowrap datatable">
                    <thead>
                      <tr>
                        <th className="w-1">
                          <input className="form-check-input m-0 align-middle" type="checkbox" aria-label="Select all invoices" />
                        </th>
                        <th className="w-1">
                          No.
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-sm icon-thick"
                          >
                            <path d="M6 15l6 -6l6 6" />
                          </svg>
                        </th>
                        <th>Invoice Subject</th>
                        <th>Client</th>
                        <th>VAT No.</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001401</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Design Works</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-us me-2"></span>
                          Carlson Limited
                        </td>
                        <td>87956621</td>
                        <td>15 Dec 2017</td>
                        <td>
                          <span className="badge bg-success me-1"></span> Paid
                        </td>
                        <td>$887</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001402</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">UX Wireframes</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-gb me-2"></span>
                          Adobe
                        </td>
                        <td>87956421</td>
                        <td>12 Apr 2017</td>
                        <td>
                          <span className="badge bg-warning me-1"></span> Pending
                        </td>
                        <td>$1200</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001403</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">New Dashboard</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-de me-2"></span>
                          Bluewolf
                        </td>
                        <td>87952621</td>
                        <td>23 Oct 2017</td>
                        <td>
                          <span className="badge bg-warning me-1"></span> Pending
                        </td>
                        <td>$534</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001404</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Landing Page</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-br me-2"></span>
                          Salesforce
                        </td>
                        <td>87953421</td>
                        <td>2 Sep 2017</td>
                        <td>
                          <span className="badge bg-secondary me-1"></span> Due in 2 Weeks
                        </td>
                        <td>$1500</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001405</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Marketing Templates</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-pl me-2"></span>
                          Printic
                        </td>
                        <td>87956621</td>
                        <td>29 Jan 2018</td>
                        <td>
                          <span className="badge bg-danger me-1"></span> Paid Today
                        </td>
                        <td>$648</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001406</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Sales Presentation</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-br me-2"></span>
                          Tabdaq
                        </td>
                        <td>87956621</td>
                        <td>4 Feb 2018</td>
                        <td>
                          <span className="badge bg-secondary me-1"></span> Due in 3 Weeks
                        </td>
                        <td>$300</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001407</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Logo & Print</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-us me-2"></span>
                          Apple
                        </td>
                        <td>87956621</td>
                        <td>22 Mar 2018</td>
                        <td>
                          <span className="badge bg-success me-1"></span> Paid Today
                        </td>
                        <td>$2500</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input className="form-check-input m-0 align-middle table-selectable-check" type="checkbox" aria-label="Select invoice" />
                        </td>
                        <td>
                          <span className="text-secondary">001408</span>
                        </td>
                        <td>
                          <Link to="invoice.html" className="text-reset" tabIndex="-1">Icons</Link>
                        </td>
                        <td>
                          <span className="flag flag-xs flag-country-pl me-2"></span>
                          Tookapic
                        </td>
                        <td>87956621</td>
                        <td>13 May 2018</td>
                        <td>
                          <span className="badge bg-success me-1"></span> Paid Today
                        </td>
                        <td>$940</td>
                        <td className="text-end">
                          <span className="dropdown">
                            <button className="btn dropdown-toggle align-text-top" data-bs-boundary="viewport" data-bs-toggle="dropdown">
                              Actions
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link className="dropdown-item" to="#">Action</Link>
                              <Link className="dropdown-item" to="#">Another action</Link>
                            </div>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  <div className="row g-2 justify-content-center justify-content-sm-between">
                    <div className="col-auto d-flex align-items-center">
                      <p className="m-0 text-secondary">
                        Showing <strong>1 to 8</strong> of <strong>16 entries</strong>
                      </p>
                    </div>
                    <div className="col-auto">
                      <ul className="pagination m-0 ms-auto">
                        <li className="page-item disabled">
                          <Link className="page-link" to="#" tabIndex="-1" aria-disabled="true">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M15 6l-6 6l6 6" />
                            </svg>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">1</Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">2</Link>
                        </li>
                        <li className="page-item active">
                          <Link className="page-link" to="#">3</Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">4</Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">5</Link>
                        </li>
                        <li className="page-item">
                          <Link className="page-link" to="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon"
                            >
                              <path d="M9 6l6 6l-6 6" />
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;