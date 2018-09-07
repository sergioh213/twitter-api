(function() {
  console.log('sanity ');
  var headLines = $("#headLines");
  var left = headLines.offset().left;
  var links = $("a");
  var stop;

  $.ajax({
    url: "/data.json",
    method: "GET",
    success: function(resp) {
      console.log('success!!');
      console.log(resp);
      var html = "";
      for (var i = 0; i < resp.length; i++) {
        html += "<a href='" + resp[i].href + "'>" + resp[i].headline + "</a>";
        // console.log(html);
      }
      $("#headLines").append(html);
      links = $("a");
    }
  });

  headLines
    .eq(0)
    .on("mouseover", function() {
      cancelAnimationFrame(stop);
    })
    .on("mouseout", function() {
      tick();
    });

  function swap() {
    console.log('swap function');
    left += links.eq(0).outerWidth();
    links.eq(0).appendTo(headLines);
    links = $("a");
  }

  function tick() {
    // console.log('tick');
    left--;
    if (left < -links.eq(0).outerWidth()) {
      console.log('ticking');
      swap();
    }
    headLines.css({
      left: left + "px"
    });
    stop = requestAnimationFrame(tick);
  }
  tick();

})();
