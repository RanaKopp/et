$(document).ready(function () {
  var TSlider = `
  {{#range}}
  <div class="swiper-slide">
<div class="text-center">
  <h1>{{range}}</h1>
</div>
<div class="row" id={{range}}>
</div>
  {{/range}}
`
  var TMonster = `
  {{#et}}
  <div class="col">
    <div class="card p-2">
    <div class="text-center large"><b><li>Floor {{floor}}</li></b> </div>
      {{#monsters}}
      <a href="http://db.irowiki.org/classic/monster-info/{{id}}/" target="_blank">
      <div class="monster card p-1 {{element}}">
      <div class="text-center">
      <img class="img img-fluid {{#mvp}}mvp{{/mvp}} swiper-lazy" data-src="img/{{id}}.png">
      </div>
        <ul class="details-mini">
          <li class="quantity">
            {{quantity}}x
          </li>
          <li class="name">
            <a href="http://db.irowiki.org/classic/monster-info/{{id}}/" target="_blank">{{name}}</a>
          </li>
          <li class="float-right a-{{antielement}} ">
            <strong class="text-uppercase">{{antielement}} </strong>
          </li>
        </ul>
        <ul class="details-normal">
            <li class="hp">
              <strong>{{hp}} HP</strong>
            </li>
          <div class="float-right">
            <li class="size {{size}}">
              {{size}}
            </li>
            <li class="type">
              {{type}}
            </li>
            <li class="element {{element}}">
              {{element}}
            </li>
          </div>
        </ul>
        <ul class="details-full">
          <div class="float-left">
            <li class="lvl">
              <strong>Lv.{{lvl}} </strong>
            </li>
            <li class="atk d-block">
              <strong>Atk: </strong>{{atk}} 
            </li>
            <li class="matk d-block">
               <strong>MAtk: </strong>{{matk}}
            </li>
          </div>
          <div class="float-right">
            <li class="def d-block">
              <strong>Def: </strong>{{def}}
            </li>
            <li class="mdef d-block">
              <strong>MDef: </strong>{{mdef}}
            </li>
          </div>
        </ul>
      </div>
      </a>
      {{/monsters}}
    </div>
  {{/et}}
  `;
  for (i = 0, lower = 1, upper = 5; upper < 101; lower += 5, upper += 5) {
    $('#et').append(Mustache.render(TSlider, { range: lower + "-" + upper }));
    for (floor = lower; floor <= upper; floor++) {
      $('#' + lower + '-' + upper).append(Mustache.render(TMonster, { et: et[floor - 1] }));
    }
  }
  $('.swiper-pagination').append('<div id="goto-' + i + '" class="et-page" > ' +
    (lower) + ' - ' +
    (upper) +
    '</div > ');
  $('#et').append(Mustache.render(TSlider, { range: "101" }));
  $('#101').append(Mustache.render(TMonster, { et: et[100] }));

  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    keyboard: true,
    autoHeight: true,
    preloadImages: false,
    lazy: true,
    mousewheel: {
      sensitivity: 2
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      renderBullet: function (index, className) {
        if (index < 20) {
          return '<div id="goto-' + index + '" class="' + className + '" > ' +
            ((index * 5) + 1) + ' - ' +
            ((index * 5) + 5) +
            '</div > ';
        } else {
          return '<div id="goto-' + index + '" class="' + className + '" > ' + '101' + '</div > ';
        }
      },
      bulletClass: 'et-page',
      bulletActiveClass: 'et-page-active'
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  $('.et-page').on('click', function (e) {
    var i = Number(this.id.substr(5));
    mySwiper.slideTo(i + 1);
  });
  // Sprite buttons
  $('#img_off').on('click', function (e) {
    $('img').hide();
    $('.img_off').attr('checked', 'checked');
  });
  $('#img_mvp').on('click', function (e) {
    $('img').hide();
    $('img.mvp').show();
    $('.img_mvp').attr('checked', 'checked');
  });
  $('#img_all').on('click', function (e) {
    $('img').show();
    $('.img_all').attr('checked', 'checked');
  });
  // Info buttons
  $('#info_mini').on('click', function (e) {
    $('.details-mini').show();
    $('.details-normal, .details-full').hide();
    $('.info_mini').attr('checked', 'checked');
  });
  $('#info_normal').on('click', function (e) {
    $('.details-mini, .details-normal').show();
    $('.details-full').hide();
    $('.info_normal').attr('checked', 'checked');
  });
  $('#info_full').on('click', function (e) {
    $('.details-normal, .details-full, .details-mini').show();
    $('.info_full').attr('checked', 'checked');
  });
  // Full info on hover
  $('.monster').on('mouseover', function (e) {
    $(this).find('details-normal, .details-full, .details-mini').show();
    $(this).find('img').show();
  });
  $('.monster').on('mouseout', function (e) {
    if ($('.info_mini').is(':checked')) {
      $(this).find('.details-mini').show();
      $(this).find('.details-normal, .details-full').hide();
    }
    if ($('.info_normal').is(':checked')) {
      $(this).find('.details-mini, .details-normal').show();
      $(this).find('.details-full').hide();
    }
    if ($('.info_full').is(':checked')) {
      $(this).find('.details-normal, .details-full, .details-mini').show();
    }
    if ($('.img_off').is(':checked')) {
      $(this).find('img').hide();
    } else if ($('.img_all').is(':checked')) {
      $(this).find('img').show();
    } else if ($('.img_mvp').is(':checked') && $(this).find('img').hasClass('mvp')) {
      $(this).find('img').show();
    } else {
      $(this).find('img').hide();
    }
  });
  $('#info_normal').trigger('click');
  $('#img_mvp').trigger('click');
});