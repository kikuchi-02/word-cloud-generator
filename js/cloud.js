const d3 = require('d3'),
  cloud = require('./d3.layout.cloud');

/**
 *
 * @param words: {text: string, size: number}[]
 */
function drawCloud(words) {
  const svg = d3.select('#cloud').select('svg');
  if (!svg.empty()) {
    svg.remove();
  }
  var layout = cloud()
    .size([800, 800])
    .words(words)
    .padding(5)
    .rotate(function () {
      return ~~(Math.random() * 2) * 90;
    })
    .font('Impact')
    .fontSize(function (d) {
      return d.size;
    })
    .on('end', draw);

  layout.start();

  function draw(words) {
    d3.select('#cloud')
      .append('svg')
      .attr('width', layout.size()[0])
      .attr('height', layout.size()[1])
      .append('g')
      .attr(
        'transform',
        'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
      )
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', function (d) {
        return d.size + 'px';
      })
      .style('font-family', 'Impact')
      .attr('text-anchor', 'middle')
      .attr('transform', function (d) {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      })
      .text(function (d) {
        return d.text;
      });
  }
}
module.exports = drawCloud;
