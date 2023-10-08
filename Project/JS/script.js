




anychart.onDocumentReady(function () {
  // Установка данных для целевых стран.
  var data = [
 		//!  добавим свойство "curvature", которое позволит скорректировать кривизну отдельных линий.
		//  0 - Задает нулевую кривизну, строит прямые углы.
		//  1..98 - Задает все более округлые углы. Чем больше число, тем больше кривизна.
		//  99 - Задает максимальную кривизну и строит окружность или эллипс.
		//! ------  свойство label: { offsetY:} Смещение метки могут быть установлены для точечных объектов.
		{ points: [50.447731, 30.542721, 52.66, -0.95], to: "United Kingdom", total: 147800, curvature: 1, label: { offsetY: -25, offsetX: -10}  },
		{ points: [50.447731, 30.542721, 45.41, -75.69], to: "Canada", total: 140000, curvature: 0.6 },
		{ points: [50.447731, 30.542721, 55.74, 37.62], to: "Russian Federation", total: 2852395, curvature: 0.4 },
		{ points: [50.447731, 30.542721, 52.22, 21.01], to: "Poland", total: 6229355, curvature: 0.5, label: { offsetY: -25, offsetX: -10}   },
		{ points: [50.447731, 30.542721, 52.51, 13.40], to: "Germany", total: 1021667, curvature: 0.5, label: { offsetX: -30} },
		{ points: [50.447731, 30.542721, 50.07, 14.43], to: "Czech", total: 467862, curvature: 0.5 },
		{ points: [50.447731, 30.542721, 41.89, 12.48], to: "Italy", total: 173231, curvature: 0.5 },
		{ points: [50.447731, 30.542721, 40.41, -3.70], to: "Spain", total: 156753, curvature: 0.5 },
		{ points: [50.447731, 30.542721, 32.08, 34.78], to: "Israel", total: 30000, curvature: 0.5 },
		{ points: [50.447731, 30.542721, 48.85, 2.32], to: "France", total: 118994, curvature: 0.5, label: { offsetY: 5, offsetX: -10} },
		{ points: [50.447731, 30.542721, 44.43, 26.10], to: "Romania", total: 52395, curvature: 0.5 },
		{ points: [50.447731, 30.542721, 52.37, 4.89], to: "Holland", total: 79250, curvature: 0.7, label: { offsetX: 10, offsetY: -10}  },
		{ points: [50.447731, 30.542721, 50.84, 4.35], to: "Belgium", total: 52395, curvature: 0.6},
		{ points: [50.447731, 30.542721, 38.88, -77.03], to: "United States", total: 85000, curvature: 0.4 },
		{ points: [50.447731, 30.542721, 32.08, 34.78], to: "Israel", total: 50000, curvature: 0.5 }
  ]
  // Создание графика карты.
  var map = anychart.connector();
  // Создание датасета из данных.
  var dataSet = anychart.data.set(data).mapAs();
  // Добавление геоданных карты мира.
  map.geoData(anychart.maps.world);
  // Создание 4 наборов и фильтрация данных по количеству бе
  createSeries(dataSet.filter('total', filter_function(50000, 100000)), 'Less than 100,000', '#A149FA', [1, 0]);
  createSeries(dataSet.filter('total', filter_function(100000, 200000)), '100,000 - 200,000', '#ff9300', [2, 1]);
  createSeries(dataSet.filter('total', filter_function(200000, 1000000)), '200,000 - 1 000,000', '#00ff59', [4, 1]);
  createSeries(dataSet.filter('total', filter_function(1000000, 10000000)), 'More than 1 000,000', '#0062ff', [6, 1]);
  // Функция для создания и настройки наборов.
  function createSeries(data, name, color, size) {
    // Создание соединительных линий.
    var connectorSeries = map.connector(data)
      .name(name)
      .fill(color)
      .stroke(color)
      .color(color);
    connectorSeries
      .hovered()
      .stroke('#808080')
      .fill('#808080');
    connectorSeries
      .hovered()
      .markers()
      .stroke('#808080')
      .fill('#808080');
    // Установка меток для линий.
    connectorSeries
      .labels()
      .enabled(true)
		.useHtml(true)
      .position('100%')
      .fontColor('#2D2D2D')
      .format(function () {
        return(
			'<h5 style="font-size:16px; font-weight:400; color: #00a2ff"> ' + this.getData('to') + '</h5>' 
					  )
      });

/* 		var data_union =[
			{id: 'US', name: "United States"}
	  ];

	  var ch_series_union = map.choropleth(data_union);
	  ch_series_union.color("#0288d1");
	  */


    // Установка стрелочек в конце линий.
    connectorSeries
      .markers()
      .position('100%')
      .size(12);
    // Указание справочной информации для наборов.
    connectorSeries
      .tooltip()
      .useHtml(true)
      .format(function () {
        return (
          '<h5 style="font-size:12px; font-weight:400; margin: 0.25rem 0;">To:<b> ' + this.getData('to') + '</b></h5>' +
          '<h5 style="font-size:12px; font-weight:400; margin: 0.25rem 0;">Total Refuges: <b>' + this.getData('total').toLocaleString() + '</b></h5>'
          );
      });
    // Установка толщины соединительной линии, исходя из количества студентов.
    connectorSeries
      .startSize(size[0])
      .endSize(size[1]);
  }
  // Добавление возможности масштабирования.
  var zoomController = anychart.ui.zoom();
  zoomController.target(map);
  zoomController.render();
  // Отображение всех меток, даже в случае наложения.
  map.overlapMode("allow-overlap");
  // Установка названия карты.
  map.title()
    .enabled(true)
    .useHtml(true)
    .text(
      '<span style="font-size:15px;font-weight:600;">More 13 Million refugees left Ukraine caused by Russia invasion of Ukraine </span><br/>' +
      '<span style="font-size: 14px;">The Top destinations Сountries for refugee migration from Ukraine </span>'
    );
  // Добавление легенды.
  map.legend().enabled(true).position('bottom').padding([20, 0, 0, 0]).fontSize(10);
  map.legend().title().enabled(true).text('Number of Students').fontSize(13).padding([0, 0, 5, 0]);
  // Установка контейнера.
  map.container('container');
  // Отрисовка карты.
  map.draw();
});
// Функция фильтрации данных.
function filter_function(val1, val2) {
  if (val2)
    return function (fieldVal) {
      return val1 <= fieldVal && fieldVal < val2;
    };
  else
    return function (fieldVal) {
      return val1 <= fieldVal;
    };
}
