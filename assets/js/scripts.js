(function() {
  'use strict';

  /*
  NOTE:
  ------
  PLACE HERE YOUR OWN JAVASCRIPT CODE IF NEEDED
  WE WILL RELEASE FUTURE UPDATES SO IN ORDER TO NOT OVERWRITE YOUR JAVASCRIPT CODE PLEASE CONSIDER WRITING YOUR SCRIPT HERE.  */

  // feather icon
  $(window).on('load', function() {
      if (feather) {
        feather.replace({
          width: 14,
          height: 14
        });
      }
    })
  // end feather icon

  // datatable
  var table = $(document).ready(function() {
              $('.datatable').DataTable({
                buttons: [
                  'excelHtml5',
                  'pdfHtml5',
                ],
                "scrollX": true,
                "order": [[ 0, "asc" ]]
              });
              });
  // the datatable in incentive scheme (reports/incent-sch-report.html)
  var table2 = $(document).ready(function() {
              $('.datatableInSchSum').DataTable({
                buttons: [
                  'excelHtml5',
                  'pdfHtml5',
                ],
                "scrollX": true,
                "order": [[ 8, "desc" ]] // descending order according to points/referrals
              });
              });
  // end the datatable in incentive scheme (reports/incent-sch-report.html)
  // end datatable

  // chart (reports/ch-and-g-report.html)
  var flatPicker = $('.flat-picker'),
    isRtl = $('html').attr('data-textdirection') === 'rtl',
    chartColors = {
      column: {
        series1: '#0059b3',
        series2: '#0080ff', // blue&light blue for by school horizontal bar chart
        series3: '#cc00cc',
        series4: '#ff22ff', // pink&purple for by programme horizontal bar chart
        bg: '#f8d3ff'
      },
      success: {
        shade_100: '#7eefc7',
        shade_200: '#06774f'
      },
      donut: {
        // series1: '#3939ac',
        // series2: '#7979d2'
        series1: '#C5E0B4',
        series2: '#9DC3E6',
        series3: '#FF9999'
      },
      area: {
        series3: '#ff0066',
        series2: '#6600ff',
        series1: '#2bdac7'
      }
    };
  // Init flatpicker
  if (flatPicker.length) {
    var date = new Date();
    flatPicker.each(function() {
      $(this).flatpickr({
        mode: 'range',
        defaultDate: ['2019-05-01', '2019-05-10']
      });
    });
  }
  // complete & incomplete survey chart
  var surveyInfoChartEl = document.querySelector('#chartSurvey'),
    surveyInfoChartConfig = {
      chart: {
        height: 300,
        type: 'donut'
      },
      legend: {
        show: true,
        position: 'right',
        offsetY: 90,
        fontSize: '16px',
        // to make it appear 2 times, top is value, bottom is percentage
        // the 190 is from the total, *100 to make it percentage cuz brain dead, think kenot
        formatter: function(seriesName, opts) {
          return [" " + seriesName, " - ", opts.w.globals.series[opts.seriesIndex] + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + seriesName, " - ", parseFloat(opts.w.globals.series[opts.seriesIndex]/220*100).toFixed(1), "%"]
        }
      },
      dataLabels: {
        style: {
          fontSize: '1rem',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: '300'
        },
        formatter: function (val, opts) {
          return opts.w.globals.series[opts.seriesIndex];
        },
        background: {
          enabled: true,
          foreColor: '#000000',
          borderColor: '#000000',
        },
        dropShadow: {
          enabled: false
        }
      },
      tooltip: {
        y: {
          formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
            return `${parseFloat(value / 220 * 100).toFixed(1)}%`;
          },
          title: {
            formatter: function (seriesName) {
              return seriesName + " : ";
            }
          }
        }
      },
      labels: ['Answered', 'Answering', 'Not Answered'],
      series: [116, 74, 30],
      colors: [
        chartColors.donut.series1,
        chartColors.donut.series2,
        chartColors.donut.series3,
      ],
      plotOptions: {
        pie: {
          donut: {
            size: '55%',
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat'
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                label: 'Total Survey',
                formatter: function(w) {
                  return '220';
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 380
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 320
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      fontSize: '1.5rem'
                    },
                    value: {
                      fontSize: '1rem'
                    },
                    total: {
                      fontSize: '1.5rem'
                    }
                  }
                }
              }
            }
          }
        }
      ]
    };
  if (typeof surveyInfoChartEl !== undefined && surveyInfoChartEl !== null) {
    var compDonutChart = new ApexCharts(surveyInfoChartEl, surveyInfoChartConfig);
    compDonutChart.render();
  }
  // end complete & incomplete survey chart

  // per year chart - bar
  var perYearEl = document.querySelector('#chartperYear'),
		perYearConfig = {
			chart: {
				height: 320,
				type: 'bar',
				parentHeightOffset: 0,
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					horizontal: true,
					barHeight: '40%'
				},
			},
			grid: {
				xaxis: {
					lines: {
						show: false
					}
				},
				padding: {
					top: -15,
					bottom: -10
				}
			},
			colors: window.colors.solid.primary,
      dataLabels: {
				enabled: true,
        formatter: function(value, { seriesIndex, dataPointIndex, w }) {
          return `
            ${parseFloat(value) / 100.0 * 16700.0}
            (${w.globals.series[seriesIndex][dataPointIndex]}%)
          `;
        }
			},
			series: [{
        name: ['Respondents'],
				data: [84, 64, 58, 73, 79]
			}],
      tooltip: {
        enabled: false,
        y: {
          formatter: function(val, opt) {
  					return parseFloat(val) / 100.0 * 16700.0; //Assuming total students for every yr is 16700
  				}
        }
			},
			xaxis: {
				categories: ['2021', '2020', '2019', '2018', '2017']
			},
			yaxis: {
				opposite: isRtl
			}
		};
	if (typeof perYearEl !== undefined && perYearEl !== null) {
		var perYear = new ApexCharts(perYearEl, perYearConfig);
		perYear.render();
	}
  // end per year chart

  // by date chart - line&area
  // daily
  var dailyChartEl = document.querySelector('#chartdaily'),
		dailyChartConfig = {
			chart: {
				height: 320,
				type: 'area',
				parentHeightOffset: 0,
				toolbar: {
					show: true
				}
			},
			dataLabels: {
				enabled: true
			},
			stroke: {
				show: true,
				curve: 'smooth'
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'start'
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			colors: [chartColors.area.series1],
			series: [{
				name: 'Rate',
				data: [100, 120, 90, 170, 130, 160, 147]
			}],
			xaxis: {
				categories: ['7/12', '8/12', '9/12', '10/12', '11/12', '12/12', '13/12']
			},
			tooltip: {
				shared: false
			},
			yaxis: {
				opposite: isRtl
			}
		};
	if (typeof dailyChartEl !== undefined && dailyChartEl !== null) {
		var dailyChart = new ApexCharts(dailyChartEl, dailyChartConfig);
		dailyChart.render();
	}
  // end daily

  // Weekly
  var weeklyChartEl = document.querySelector('#chartweekly'),
		weeklyChartConfig = {
			chart: {
				height: 320,
				type: 'area',
				parentHeightOffset: 0,
				toolbar: {
					show: true
				}
			},
			dataLabels: {
				enabled: true
			},
			stroke: {
				show: true,
				curve: 'smooth'
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'start'
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			colors: [chartColors.area.series2],
			series: [{
				name: 'Rate',
				data: [103, 120, 90, 143, 75, 123, 116]
			}],
			xaxis: {
        label: 'Week',
				categories: ['1/9', '2/9', '3/9', '4/9', '5/9', '6/9', '7/9']
			},
			tooltip: {
				shared: false
			},
			yaxis: {
				opposite: isRtl
			}
		};
	if (typeof weeklyChartEl !== undefined && weeklyChartEl !== null) {
		var weeklyChart = new ApexCharts(weeklyChartEl, weeklyChartConfig);
		weeklyChart.render();
	}
  // end weekly

  // monthly
  var monthlyChartEl = document.querySelector('#chartmonthly'),
		monthlyChartConfig = {
			chart: {
				height: 320,
				type: 'area',
				parentHeightOffset: 0,
				toolbar: {
					show: true
				}
			},
			dataLabels: {
				enabled: true
			},
			stroke: {
				show: true,
				curve: 'smooth'
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'start'
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			colors: [chartColors.area.series3],
			series: [{
				name: 'Rate',
				data: [107, 130, 132, 145, 115, 89, 100]
			}],
			xaxis: {
				categories: ['May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov']
			},
			tooltip: {
				shared: false
			},
			yaxis: {
				opposite: isRtl
			}
		};
	if (typeof monthlyChartEl !== undefined && monthlyChartEl !== null) {
		var monthlyChart = new ApexCharts(monthlyChartEl, monthlyChartConfig);
		monthlyChart.render();
	}
  // end monthly
  // end by date chart

  // by school chart - stacked column
  var bySchoolChartEl = document.querySelector('#chartbySchool'),
    bySchoolChartConfig = {
      chart: {
				height: 600,
				type: 'bar',
				stacked: true,
        stackType: '100%',
				parentHeightOffset: 0,
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
          horizontal: true,
          barHeight: '55%'
          /* if want vertical balik
          enable this down here,
          erase whatever's up there
          ------- */
          // columnWidth: '30%',
					// colors: {
					// 	backgroundBarColors: [
					// 		chartColors.column.bg
					// 	],
					// 	backgroundBarRadius: 10
					// }
				}
			},
      tooltip: {
        enabled: false
      },
			dataLabels: {
				enabled: true,
        formatter: function(value, { seriesIndex, dataPointIndex, w }) {
          return `${w.globals.series[seriesIndex][dataPointIndex]} (${value.toFixed(0)}%)`
        },
        style: {
          colors: ['#000000']
        }
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'center',
			},
			colors: [
        chartColors.donut.series1,
        chartColors.donut.series2,
        chartColors.donut.series3,
      ],
			stroke: {
				show: true,
				colors: ['transparent']
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			series: [
        {
          name: 'Answered',
          data: [627, 1122, 1245, 837, 1023, 1181, 581, 778, 1129, 1095, 866, 504, 1271, 1114]
        },
        {
          name: 'Answering',
          data: [1222, 307, 1755, 1552, 1545, 442, 1121, 676, 1346, 1220, 221, 733, 724, 755]
        },
        {
          name: 'Not Answered',
          data: [1171, 623, 1202, 677, 1153, 1211, 820, 1223, 1455, 1038, 1301, 1384, 1029, 1335]
        }
      ],
			xaxis: {
				categories: [
          'Architecture', 'Computer Science & Engineering', 'Design', 'Business', 'Law', 'Medicine', 'Pharmacy', 'Biosciences', 'Hospitality', 'Food Studies & Gastronomy', 'Media and Communication', 'Liberal Arts & Sciences', 'Education', 'Culinary Institute'
        ]
			},
			fill: {
				opacity: 1
			},
			yaxis: {
				opposite: isRtl
			}
    };
  if (typeof bySchoolChartEl !== undefined && bySchoolChartEl !== null) {
    var schoolChart = new ApexCharts(bySchoolChartEl, bySchoolChartConfig);
    schoolChart.render();
  }
  // end by school chart

  // by prog chart - stacked column
  var byProgChartEl = document.querySelector('#chartbyProg'),
    byProgChartConfig = {
      chart: {
				height: 350,
				type: 'bar',
				stacked: true,
        stackType: '100%',
				parentHeightOffset: 0,
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
          horizontal: true,
          barHeight: '40%'
				}
			},
      tooltip: {
        enabled: false
      },
			dataLabels: {
				enabled: true,
        formatter: function(value, { seriesIndex, dataPointIndex, w }) {
          return `${w.globals.series[seriesIndex][dataPointIndex]} (${value.toFixed(0)}%)`
          // return `${w.globals.labels[dataPointIndex]} : ${w.globals.series[seriesIndex][dataPointIndex]} (${value.toFixed(0)}%)`;
        },
        style: {
          colors: ['#000000']
        }
			},
			legend: {
				show: true,
				position: 'bottom',
				horizontalAlign: 'center'
			},
			colors: [
        chartColors.donut.series1,
        chartColors.donut.series2,
        chartColors.donut.series3
      ],
			stroke: {
				show: true,
				colors: ['transparent']
			},
			grid: {
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			series: [
        {
          name: 'Answered',
          data: [1181, 581, 1223, 1129, 1095]
        },
        {
          name: 'Answering',
          data: [1211, 820, 778, 1455, 1038]
        },
        {
          name: 'Not Answered',
          data: [2311, 1820, 578, 495, 1138]
        }
      ],
			xaxis: {
				categories: [
          'Bachelor of Science in Architecture', 'Bachelor of IT (HONS)', 'Master of Design', 'Master in Management', 'Diploma in Business'
        ]
			},
			fill: {
				opacity: 1
			},
			yaxis: {
				opposite: isRtl
			}
    };
  if (typeof byProgChartEl !== undefined && byProgChartEl !== null) {
    var progChart = new ApexCharts(byProgChartEl, byProgChartConfig);
    progChart.render();
  }
  // end by prog chart
  // end chart

  // toastr / alert for survey (student/survey.html)
  var isRtl = $('html').attr('data-textdirection') === 'rtl',
    alertDidIt = $('#alert-didit'),
    alertHalfway = $('#alert-halfway'),
    alertReachEnd = $('#alert-reachingend'),
    clearToastObj;

    alertDidIt.on('click', function() {
      toastr['info']("You're almost halfway there...", 'A few more parts to go!', {
        positionClass: 'toast-bottom-right',
        rtl: isRtl
      });
    });

  alertHalfway.on('click', function() {
    toastr['info']('More than 50% finished...', 'Halfway there!', {
      positionClass: 'toast-bottom-right',
      rtl: isRtl
    });
  });

  alertReachEnd.on('click', function() {
    toastr['info']("You're reaching the last part now...", "Reaching the end!", {
      positionClass: 'toast-bottom-right',
      rtl: isRtl
    });
  });
  // end toastr / alert for survey (student/survey.html)

  // scripts for survey.html
  var surveyForm =
    $(document).ready(function(){
    var current = 1,current_step,next_step,steps;
    steps = $("fieldset").length;

    $(".btn-next").click(function(){
      current_step = $(this).parent();
      next_step = $(this).parent().next();
      next_step.show();
      current_step.hide();
      setProgressBar(++current);
    });

    $(".btn-prev").click(function(){
      current_step = $(this).parent();
      next_step = $(this).parent().prev();
      next_step.show();
      current_step.hide();
      setProgressBar(--current);
    });

    setProgressBar(current);
    // Change progress bar action
    function setProgressBar(curStep){
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();

      if (percent >= 85) {
        var changeBarColor1 = $(".progress").addClass("progress-bar-success").removeClass("progress-bar-info");
        var progressBars = $(".progress-bar").css("width",percent+"%").html(percent+"%");
      }
      else if (percent >= 60 && percent < 85) {
        var changeBarColor2 = $(".progress").addClass("progress-bar-info").removeClass("progress-bar-warning");
        var progressBars = $(".progress-bar").css("width",percent+"%").html(percent+"%");
      }
      else if (percent >= 30 && percent < 60) {
        var changeBarColor3 = $(".progress").addClass("progress-bar-warning").removeClass("progress-bar-danger");
        var progressBars = $(".progress-bar").css("width",percent+"%").html(percent+"%");
      }
      else {
        var changeBarColor4 = $(".progress").addClass("progress-bar-danger");
        var progressBars = $(".progress-bar").css("width",percent+"%").html(percent+"%");
      }
    }
  });
  // end scripts for student/survey.html

  // sweet alerts for submitted form (student/survey.html)
  var submittedForm = $("#submitted");
  if (submittedForm.length) {
    submittedForm.on('click', function () {
      Swal.fire({
        title: '<b>Survey submitted successfully!<b>',
        icon: 'success',
        showConfirmButton: false,
        html:
        '<p class="mb-0">If you are participating in incentive scheme, you may update your email and phone number.<p><br>' + '<a href="profile.html" type="button" class="btn btn-danger">Go to Profile</a>'
      });
    });
  }
  // end sweet alerts for submitted form (student/survey.html)

  // form-wizard edit (admin/survey-mngmnt/edit-survey.html)
  var bsStepper1 = document.querySelectorAll('.bs-stepper'),
    surveyFormWizardE = document.querySelector('.survey-formWizEdit');

  // Adds crossed class
  if (typeof bsStepper1 !== undefined && bsStepper1 !== null) {
    for (var el = 0; el < bsStepper1.length; ++el) {
      bsStepper1[el].addEventListener('show.bs-stepper', function(event) {
        var index = event.detail.indexStep;
        var numberOfSteps = $(event.target).find('.step').length - 1;
        var line = $(event.target).find('.step');

        // The first for loop is for increasing the steps,
        // the second is for turning them off when going back
        // and the third with the if statement because the last line
        // can't seem to turn off when I press the first item. ¯\_(ツ)_/¯
        for (var i = 0; i < index; i++) {
          line[i].classList.add('crossed');
          for (var j = index; j < numberOfSteps; j++) {
            line[j].classList.remove('crossed');
          }
        }
        if (event.detail.to == 0) {
          for (var k = index; k < numberOfSteps; k++) {
            line[k].classList.remove('crossed');
          }
          line[0].classList.remove('crossed');
        }
        var percent = parseFloat(100 / numberOfSteps) * curStep;
      });
    }
  }

  if (typeof surveyFormWizardE !== undefined && surveyFormWizardE !== null) {
  var surveyFromStepper1 = new Stepper(surveyFormWizardE, {
    linear: false
  });
    $(surveyFormWizardE)
      .find('.btn-next')
      .on('click', function() {
        surveyFromStepper1.next();
      });
    $(surveyFormWizardE)
      .find('.btn-prev')
      .on('click', function() {
        surveyFromStepper1.previous();
      });
  }
  // end form wizard edit (admin/survey-mngmnt/edit-survey.html)
  // form wizard survey (student/survey.html)
  var bsStepper2 = document.querySelectorAll('.bs-stepper'),
    surveyFormWizardS = document.querySelector('.survey-formWiz');

  // Adds crossed class
  if (typeof bsStepper2 !== undefined && bsStepper2 !== null) {
    for (var el = 0; el < bsStepper2.length; ++el) {
      bsStepper2[el].addEventListener('show.bs-stepper', function(event) {
        var index = event.detail.indexStep;
        var numberOfSteps = $(event.target).find('.step').length - 1;
        var line = $(event.target).find('.step');

        // The first for loop is for increasing the steps,
        // the second is for turning them off when going back
        // and the third with the if statement because the last line
        // can't seem to turn off when I press the first item. ¯\_(ツ)_/¯
        for (var i = 0; i < index; i++) {
          line[i].classList.add('crossed');
          for (var j = index; j < numberOfSteps; j++) {
            line[j].classList.remove('crossed');
          }
        }
        if (event.detail.to == 0) {
          for (var k = index; k < numberOfSteps; k++) {
            line[k].classList.remove('crossed');
          }
          line[0].classList.remove('crossed');
        }
      });
    }
  }

  if (typeof surveyFormWizardS !== undefined && surveyFormWizardS !== null) {
  var surveyFromStepper2 = new Stepper(surveyFormWizardS, {
    linear: false
  });
    $(surveyFormWizardS)
      .find('.btn-next')
      .on('click', function() {
        surveyFromStepper2.next();
      });
    $(surveyFormWizardS)
      .find('.btn-prev')
      .on('click', function() {
        surveyFromStepper2.previous();
      });
  }
  // end form wizard survey (student/survey.html)
  // form wizard preview (admin/survey-mngmnt/preview-survey.html)
  var bsStepper3 = document.querySelectorAll('.bs-stepper'),
    surveyFormWizardP = document.querySelector('.survey-formWizPreview');

  // Adds crossed class
  if (typeof bsStepper3 !== undefined && bsStepper3 !== null) {
    for (var el = 0; el < bsStepper3.length; ++el) {
      bsStepper3[el].addEventListener('show.bs-stepper', function(event) {
        var index = event.detail.indexStep;
        var numberOfSteps = $(event.target).find('.step').length - 1;
        var line = $(event.target).find('.step');

        // The first for loop is for increasing the steps,
        // the second is for turning them off when going back
        // and the third with the if statement because the last line
        // can't seem to turn off when I press the first item. ¯\_(ツ)_/¯
        for (var i = 0; i < index; i++) {
          line[i].classList.add('crossed');
          for (var j = index; j < numberOfSteps; j++) {
            line[j].classList.remove('crossed');
          }
        }
        if (event.detail.to == 0) {
          for (var k = index; k < numberOfSteps; k++) {
            line[k].classList.remove('crossed');
          }
          line[0].classList.remove('crossed');
        }
      });
    }
  }

  if (typeof surveyFormWizardP !== undefined && surveyFormWizardP !== null) {
  var surveyFromStepper3 = new Stepper(surveyFormWizardP, {
    linear: false
  });
    $(surveyFormWizardP)
      .find('.btn-next')
      .on('click', function() {
        surveyFromStepper3.next();
      });
    $(surveyFormWizardP)
      .find('.btn-prev')
      .on('click', function() {
        surveyFromStepper3.previous();
      });
  }
  // end form wizard preview (admin/survey-mngmnt/preview-survey.html)
})(window);
