// Matthews Commercial — concept site JS
// No storage APIs (localStorage/sessionStorage/cookies) per build requirements.

(function () {
  'use strict';

  /* ------- Year ------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ------- Header scrolled state ------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------- Mobile nav toggle ------- */
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (open) { mobileNav.hidden = true; }
      else      { mobileNav.hidden = false; }
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  /* ------- Properties: sample data + render + filter ------- */
  var properties = [
    {
      title: '37 Chase Avenue',
      city: 'Waterbury',
      type: 'retail',
      typeLabel: 'Retail / Auto',
      status: 'For Sale / Lease',
      statusKey: 'sale',
      size: 'Car dealership · 2-bay garage',
      price: '$1,500,000',
      tone: 'retail',
      coords: [41.575, -73.034]
    },
    {
      title: '15 Nutmeg Valley Road',
      city: 'Wolcott',
      type: 'industrial',
      typeLabel: 'Industrial / Flex',
      status: 'For Lease',
      statusKey: 'lease',
      size: '7,400 SF',
      price: '$9.50 / SF + utilities',
      tone: 'industrial',
      coords: [41.606, -72.983]
    },
    {
      title: '659 Middlebury Road',
      city: 'Middlebury',
      type: 'land',
      typeLabel: 'Land / Ground Lease',
      status: 'For Sale / Ground Lease',
      statusKey: 'sale',
      size: '2.64 Acres',
      price: '$449,900 sale · $50K/yr lease',
      tone: 'land',
      coords: [41.529, -73.111]
    },
    {
      title: '955 Wolcott Road',
      city: 'Wolcott',
      type: 'industrial',
      typeLabel: 'Commercial / Industrial',
      status: 'For Sale',
      statusKey: 'sale',
      size: '16,199 SF · 2.64 acres',
      price: '$1,125,000',
      tone: 'industrial',
      coords: [41.595, -72.984]
    },
    {
      title: '509 Wolcott Road',
      city: 'Wolcott',
      type: 'medical',
      typeLabel: 'Medical / Professional Office',
      status: 'For Sale',
      statusKey: 'sale',
      size: '3,260 SF',
      price: '$595,000',
      tone: 'medical',
      coords: [41.585, -72.985]
    },
    {
      title: '650 Wolcott Street',
      city: 'Waterbury',
      type: 'retail',
      typeLabel: 'Retail',
      status: 'For Lease',
      statusKey: 'lease',
      size: '9,417 SF',
      price: '$9.95 / SF + nets',
      tone: 'retail',
      coords: [41.565, -73.018]
    },
    {
      title: '714 Chase Parkway',
      city: 'Waterbury',
      type: 'medical',
      typeLabel: 'Medical Office',
      status: 'For Lease',
      statusKey: 'lease',
      size: '4,403 SF',
      price: '$21.25 / SF gross',
      tone: 'medical',
      coords: [41.536, -73.074]
    },
    {
      title: '572 Watertown Avenue',
      city: 'Waterbury',
      type: 'investment',
      typeLabel: 'Restaurant / Investment',
      status: 'For Sale',
      statusKey: 'sale',
      size: 'Restaurant + income property',
      price: '$1,700,000',
      tone: 'restaurant',
      coords: [41.571, -73.058]
    },
    {
      title: '2590 Berlin Turnpike',
      city: 'Berlin',
      type: 'retail',
      typeLabel: 'Flex Retail / Warehouse',
      status: 'For Lease',
      statusKey: 'lease',
      size: 'Unit 2',
      price: '$3,487.50 / mo + utilities',
      tone: 'industrial',
      coords: [41.618, -72.749]
    }
  ];

  // SVG hero illustrations per tone — abstract parcel/building motif. Avoids stock photos.
  function svgFor(tone) {
    var bg = '#0f2942';
    var fg = '#f5f1ea';
    var gold = '#b08a3e';
    if (tone === 'industrial') {
      return [
        '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">',
        '<rect width="400" height="300" fill="', bg, '"/>',
        // sawtooth roof building
        '<g fill="', fg, '" opacity=".9">',
        '<path d="M40 220h320v40H40z"/>',
        '<path d="M40 220l30-40 30 40zM100 220l30-40 30 40zM160 220l30-40 30 40zM220 220l30-40 30 40zM280 220l30-40 30 40z"/>',
        '</g>',
        '<rect x="40" y="255" width="320" height="3" fill="', gold, '"/>',
        '<g fill="', bg, '">',
        '<rect x="60" y="234" width="14" height="10"/><rect x="120" y="234" width="14" height="10"/>',
        '<rect x="180" y="234" width="14" height="10"/><rect x="240" y="234" width="14" height="10"/>',
        '<rect x="300" y="234" width="14" height="10"/>',
        '</g>',
        '</svg>'
      ].join('');
    }
    if (tone === 'medical' || tone === 'office') {
      return [
        '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">',
        '<rect width="400" height="300" fill="', bg, '"/>',
        '<g fill="', fg, '">',
        '<rect x="80" y="80" width="240" height="180"/>',
        '</g>',
        '<g fill="', bg, '">',
        // window grid
        '<rect x="100" y="100" width="20" height="28"/><rect x="140" y="100" width="20" height="28"/><rect x="180" y="100" width="20" height="28"/><rect x="220" y="100" width="20" height="28"/><rect x="260" y="100" width="20" height="28"/><rect x="300" y="100" width="20" height="28"/>',
        '<rect x="100" y="148" width="20" height="28"/><rect x="140" y="148" width="20" height="28"/><rect x="180" y="148" width="20" height="28"/><rect x="220" y="148" width="20" height="28"/><rect x="260" y="148" width="20" height="28"/><rect x="300" y="148" width="20" height="28"/>',
        '<rect x="100" y="196" width="20" height="28"/><rect x="140" y="196" width="20" height="28"/><rect x="180" y="196" width="20" height="28"/><rect x="220" y="196" width="20" height="28"/><rect x="260" y="196" width="20" height="28"/><rect x="300" y="196" width="20" height="28"/>',
        '</g>',
        '<rect x="80" y="260" width="240" height="3" fill="', gold, '"/>',
        tone === 'medical' ? '<g fill="' + gold + '"><rect x="186" y="232" width="28" height="8"/><rect x="196" y="222" width="8" height="28"/></g>' : '',
        '</svg>'
      ].join('');
    }
    if (tone === 'retail' || tone === 'restaurant') {
      return [
        '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">',
        '<rect width="400" height="300" fill="', bg, '"/>',
        '<g fill="', fg, '">',
        // storefront row
        '<rect x="40" y="140" width="320" height="110"/>',
        '<path d="M40 140l40-30h240l40 30z"/>',
        '</g>',
        '<g fill="', bg, '">',
        '<rect x="60" y="170" width="60" height="60"/>',
        '<rect x="140" y="170" width="120" height="60"/>',
        '<rect x="280" y="170" width="60" height="60"/>',
        '</g>',
        '<rect x="40" y="248" width="320" height="3" fill="', gold, '"/>',
        '</svg>'
      ].join('');
    }
    if (tone === 'land') {
      return [
        '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">',
        '<rect width="400" height="300" fill="', bg, '"/>',
        '<g fill="none" stroke="', fg, '" stroke-opacity=".55" stroke-width="1">',
        // parcel lines
        '<path d="M0 80l400 40"/><path d="M0 140l400 30"/><path d="M0 210l400 -10"/>',
        '<path d="M80 0l30 300"/><path d="M180 0l-10 300"/><path d="M280 0l40 300"/>',
        '</g>',
        '<g fill="', fg, '"><circle cx="200" cy="150" r="6"/></g>',
        '<g stroke="', gold, '" stroke-width="2" fill="none"><path d="M120 60 L 280 60 L 290 230 L 110 220 Z"/></g>',
        '</svg>'
      ].join('');
    }
    return '<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="' + bg + '"/></svg>';
  }

  function cardHTML(p) {
    return [
      '<article class="property-card" data-type="', p.type, '">',
      '  <div class="property-img">',
      '    <span class="property-status ', p.statusKey === 'lease' ? 'for-lease' : '', '">', p.status, '</span>',
         svgFor(p.tone),
      '  </div>',
      '  <div class="property-body">',
      '    <div class="property-meta-top"><span>', p.typeLabel, '</span><span>', p.city, ', CT</span></div>',
      '    <h3>', p.title, '</h3>',
      '    <p class="property-loc">', p.city, ', Connecticut</p>',
      '    <div class="property-stats">',
      '      <div><span>Size</span><span>', p.size, '</span></div>',
      '      <div><span>Pricing</span><span>', p.price, '</span></div>',
      '    </div>',
      '  </div>',
      '</article>'
    ].join('');
  }

  var grid = document.getElementById('propertyGrid');
  if (grid) {
    grid.innerHTML = properties.map(cardHTML).join('');
  }

  /* ------- Real maps: active listings + market footprint ------- */
  var propertyMarkerRecords = [];

  function tileLayer() {
    return L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    });
  }

  function markerIcon(className) {
    return L.divIcon({
      className: '',
      html: '<span class="map-pin ' + (className || '') + '"></span>',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      popupAnchor: [0, -8]
    });
  }

  function initPropertyMap() {
    var el = document.getElementById('propertyMap');
    if (!el || !window.L) return;

    var map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true
    });
    window.propertyMapInstance = map;
    tileLayer().addTo(map);

    propertyMarkerRecords = properties.map(function (p) {
      var marker = L.marker(p.coords, { icon: markerIcon('') })
        .bindPopup('<strong>' + p.title + '</strong>' + p.city + ', CT<br />' + p.typeLabel + '<br />' + p.price)
        .addTo(map);
      return { type: p.type, marker: marker };
    });

    map.fitBounds(L.featureGroup(propertyMarkerRecords.map(function (r) { return r.marker; })).getBounds(), {
      padding: [26, 26]
    });
  }

  function initMarketMap() {
    var el = document.getElementById('marketMap');
    if (!el || !window.L) return;

    var markets = [
      ['Waterbury', 41.558, -73.051],
      ['Wolcott', 41.602, -72.986],
      ['Middlebury', 41.527, -73.126],
      ['Southbury', 41.481, -73.213],
      ['Prospect', 41.502, -72.978],
      ['Cheshire', 41.498, -72.901],
      ['Berlin', 41.621, -72.746],
      ['Wallingford', 41.457, -72.823],
      ['Bridgeport', 41.179, -73.189],
      ['Clinton', 41.278, -72.527]
    ];

    var map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true
    });
    tileLayer().addTo(map);

    var markers = markets.map(function (m) {
      return L.marker([m[1], m[2]], { icon: markerIcon('market-pin') })
        .bindPopup('<strong>' + m[0] + '</strong>Connecticut market')
        .addTo(map);
    });

    map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [30, 30] });
  }

  if (window.L) {
    initPropertyMap();
    initMarketMap();
  }

  /* ------- Filter chips ------- */
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        c.classList.toggle('is-active', c === chip);
        c.setAttribute('aria-selected', c === chip ? 'true' : 'false');
      });
      if (!grid) return;
      var cards = grid.querySelectorAll('.property-card');
      cards.forEach(function (card) {
        var t = card.getAttribute('data-type');
        var show = filter === 'all' || t === filter;
        card.classList.toggle('is-hidden', !show);
      });
      propertyMarkerRecords.forEach(function (record) {
        if (!window.propertyMapInstance) return;
        var show = filter === 'all' || record.type === filter;
        if (show && !record.marker._map) {
          record.marker.addTo(window.propertyMapInstance);
        }
        if (!show && record.marker._map) {
          window.propertyMapInstance.removeLayer(record.marker);
        }
      });
    });
  });

  /* ------- Smooth anchor scroll with header offset ------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
