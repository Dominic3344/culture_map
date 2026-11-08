/* =========================================================
   THE LIVING CULTURE MAP & DISCOVERY PLATFORM
   Plain JavaScript version (no build step, no frameworks).
   All static page markup now lives in index.html — edit it there.
   This file only fills in dynamic parts (map paths, district stops,
   event cards, directory cards, listing & moderator modals).
   ========================================================= */
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var IMG_FALLBACK = 'image/door-texture.jpg';
  var ERR_IMG = "this.onerror=null;this.src='" + IMG_FALLBACK + "'";

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function icon(name, cls) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide ' +
      (cls || '') + '">' + (window.ICON_PATHS[name] || '') + '</svg>'
    );
  }

  function $(id) { return document.getElementById(id); }
  function pad2(n) { return String(n).padStart(2, '0'); }

  /* ---------- constants ---------- */
  var STATE_DISTRICTS = {
    Kerala: ['Kannur', 'Thrissur', 'Alappuzha', 'Kozhikode', 'Palakkad', 'Wayanad', 'Pathanamthitta'],
    'Tamil Nadu': ['Chennai', 'Thanjavur', 'Madurai', 'Coimbatore', 'Kanchipuram'],
    Rajasthan: ['Jaipur', 'Bhilwara', 'Jodhpur', 'Udaipur', 'Jaisalmer'],
    'West Bengal': ['Kolkata', 'Birbhum', 'Bankura', 'Darjeeling', 'Murshidabad'],
    Assam: ['Majuli', 'Sivasagar', 'Kamrup Metropolitan', 'Jorhat', 'Dibrugarh'],
    Gujarat: ['Kachchh', 'Patan', 'Ahmedabad', 'Vadodara', 'Jamnagar'],
    Maharashtra: ['Mumbai City', 'Pune', 'Palghar', 'Nashik', 'Kolhapur'],
    Punjab: ['Amritsar', 'Patiala', 'Ludhiana', 'Jalandhar', 'Bathinda'],
    Odisha: ['Puri', 'Cuttack', 'Khordha', 'Ganjam', 'Mayurbhanj'],
    Uttarakhand: ['Almora', 'Pithoragarh', 'Chamoli', 'Dehradun', 'Tehri Garhwal'],
    'Himachal Pradesh': ['Kullu', 'Kangra', 'Chamba', 'Shimla', 'Mandi'],
    'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Agra', 'Prayagraj', 'Mathura']
  };

  var KERALA_DISTRICTS = ['Kannur', 'Thrissur', 'Alappuzha', 'Kozhikode', 'Palakkad', 'Wayanad', 'Pathanamthitta'];

  /* ---------- application state ---------- */
  var state = {
    allListings: [],
    selectedState: 'Kerala',
    selectedDistrict: 'all',
    filters: {
      state: 'Kerala', district: 'all', artForm: 'all', experienceType: 'all',
      status: 'all', seasonality: 'all', searchQuery: ''
    },
    activeModalListing: null,
    isContributeOpen: false,
    isModeratorOpen: false
  };

    /* =========================================================
     AUTHENTICATION
     ========================================================= */

  var authMode = 'login';
  var authRequiredRole = 'user';
  var pendingAuthAction = null;

  function currentUser() {
    return window.LCMAuth ? window.LCMAuth.getCurrentUser() : null;
  }

  function updateAuthNav() {
    var area = $('authNavArea');
    if (!area) return;

    var user = currentUser();

    if (!user) {
      area.innerHTML =
        '<button type="button" data-action="open-auth" ' +
        'class="px-4 py-2 rounded-full text-xs font-semibold border border-[#d2b77f] text-[#47271b] hover:bg-[#fbf4e8] transition-colors">' +
        'Log In</button>';
      return;
    }

    area.innerHTML =
      '<div class="flex items-center gap-2">' +
        '<span class="hidden sm:inline text-xs text-[#705e52]">Hello, ' +
          esc(user.name) + '</span>' +
        '<button type="button" data-action="logout" ' +
        'class="px-4 py-2 rounded-full text-xs font-semibold border border-[#d2b77f] text-[#47271b] hover:bg-[#fbf4e8] transition-colors">' +
        'Log Out</button>' +
      '</div>';
  }

  function openAuth(mode, requiredRole, nextAction) {
    authMode = mode || 'login';
    authRequiredRole = requiredRole || 'user';
    pendingAuthAction = nextAction || null;

    if (authRequiredRole === 'moderator') {
      authMode = 'login';
    }

    renderAuthModal();
  }

  function closeAuthModal() {
    var root = $('authModal');
    if (root) root.innerHTML = '';
  }

  function renderAuthModal() {
    var root = $('authModal');
    if (!root) return;

    var isModeratorLogin = authRequiredRole === 'moderator';
    var isRegister = authMode === 'register' && !isModeratorLogin;

    root.innerHTML =
      '<div class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" role="presentation">' +
        '<section class="lcm-auth-card relative bg-[#fffdfa] w-full max-w-md rounded-3xl border border-[#d6b16f] shadow-2xl p-7" role="dialog" aria-modal="true" aria-label="Account authentication">' +

          '<button type="button" data-action="close-auth" class="absolute top-4 right-4 text-[#806b59] hover:text-[#963d25] text-2xl" aria-label="Close">&times;</button>' +

          '<div class="mb-6">' +
            '<span class="text-[10px] font-bold tracking-[0.2em] text-[#963d25] uppercase">THE LIVING CULTURE MAP</span>' +
            '<h2 class="text-2xl font-serif font-bold text-[#47271b] mt-2">' +
              (isModeratorLogin ? 'Moderator Access' : isRegister ? 'Create Your Account' : 'Welcome Back') +
            '</h2>' +
            '<p class="text-sm text-[#806b59] mt-2">' +
              (isModeratorLogin
                ? 'Sign in using an authorized moderator or administrator email.'
                : isRegister
                  ? 'Create an account to contribute cultural experiences.'
                  : 'Sign in to contribute and manage your cultural submissions.') +
            '</p>' +
          '</div>' +

          '<div id="authError" class="hidden mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs"></div>' +

          '<form id="lcmAuthForm" class="space-y-4">' +

            (isRegister
              ? '<div>' +
                  '<label class="block text-xs font-semibold text-[#47271b] mb-1.5">Full Name</label>' +
                  '<input name="name" type="text" required minlength="2" autocomplete="name" placeholder="Enter your full name" class="w-full p-3 rounded-xl border border-[#e4d7c2] bg-white text-sm text-[#47271b] focus:outline-none focus:border-[#963d25]" />' +
                '</div>'
              : '') +

            '<div>' +
              '<label class="block text-xs font-semibold text-[#47271b] mb-1.5">Email Address</label>' +
              '<input name="email" type="email" required autocomplete="email" placeholder="you@example.com" class="w-full p-3 rounded-xl border border-[#e4d7c2] bg-white text-sm text-[#47271b] focus:outline-none focus:border-[#963d25]" />' +
            '</div>' +

            '<div>' +
              '<label class="block text-xs font-semibold text-[#47271b] mb-1.5">Password</label>' +
              '<input name="password" type="password" required minlength="' + (isRegister ? '8' : '1') + '" autocomplete="' + (isRegister ? 'new-password' : 'current-password') + '" placeholder="' + (isRegister ? 'At least 8 characters' : 'Enter your password') + '" class="w-full p-3 rounded-xl border border-[#e4d7c2] bg-white text-sm text-[#47271b] focus:outline-none focus:border-[#963d25]" />' +
            '</div>' +

            '<button type="submit" class="w-full py-3 rounded-xl bg-[#963d25] hover:bg-[#7d321e] text-white text-sm font-semibold transition-colors">' +
              (isRegister ? 'Create Account' : 'Sign In') +
            '</button>' +
          '</form>' +

          (!isModeratorLogin
            ? '<p class="text-center text-xs text-[#806b59] mt-5">' +
                (isRegister ? 'Already have an account?' : 'New to The Living Culture Map?') +
                ' <button type="button" data-action="switch-auth-mode" class="font-bold text-[#963d25] hover:underline">' +
                  (isRegister ? 'Log In' : 'Create Account') +
                '</button>' +
              '</p>'
            : '') +

        '</section>' +
      '</div>';

    var backdrop = root.firstElementChild;
    var card = root.querySelector('.lcm-auth-card');

    if (backdrop && card) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeAuthModal();
      });
    }

    var form = $('lcmAuthForm');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var submitButton = form.querySelector('button[type="submit"]');
      var errorBox = $('authError');
      var formValues = new FormData(form);

      var email = formValues.get('email');
      var password = formValues.get('password');
      var name = formValues.get('name');

      submitButton.disabled = true;
      submitButton.textContent = 'Please wait...';

      try {
        if (isRegister) {
          await window.LCMAuth.register(name, email, password);
        } else {
          await window.LCMAuth.login(
            email,
            password,
            authRequiredRole
          );
        }

        var user = currentUser();

        closeAuthModal();
        updateAuthNav();

        if (user && window.LCMAuth.isModerator(user)) {
          updateBadges();
        }

        var next = pendingAuthAction;
        pendingAuthAction = null;

        if (next === 'contribute') {
          state.isContributeOpen = true;
          renderContributionModal();
        } else if (next === 'moderator') {
          if (user && window.LCMAuth.isModerator(user)) {
            state.isModeratorOpen = true;
            renderAdminModal();
          }
        }

      } catch (err) {
        errorBox.textContent = err.message || 'Authentication failed.';
        errorBox.classList.remove('hidden');

        submitButton.disabled = false;
        submitButton.textContent = isRegister ? 'Create Account' : 'Sign In';
      }
    });
  }

  function pendingCount() {
    return state.allListings.filter(function (l) { return l.verificationStatus === 'pending'; }).length;
  }
  function filtered() { return window.filterListings(state.allListings, state.filters); }

  /* =========================================================
     NAVBAR / FOOTER BADGES
     ========================================================= */
  function updateBadges() {
    var n = pendingCount();
    $('navPending').outerHTML = '<span id="navPending">' + (n > 0
      ? '<span class="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#b78103] text-white">' + n + '</span>'
      : '') + '</span>';
    $('footerCurator').textContent = 'Curator Portal (' + n + ' Pending)';
  }

  /* =========================================================
     INDIA MAP
     ========================================================= */
  var hoveredState = null;

  function pathAttrs(item) {
    var sel = state.selectedState.toLowerCase() === item.title.toLowerCase();
    var colourConfig = window.tryjsconfig && window.tryjsconfig[item.id];
    var baseFill = colourConfig ? colourConfig.upColor : (item.fill || '#EBECED');
    return {
      fill: sel ? '#e7b75e' : baseFill,
      stroke: sel ? '#963d25' : '#FFFFFF',
      width: sel ? '1.5' : '1'
    };
  }

  function buildMap() {
    var html = window.INDIA_SVG_PATHS.map(function (item) {
      var a = pathAttrs(item);
      return '<path id="' + esc(item.id) + '" data-title="' + esc(item.title) + '" aria-label="' + esc(item.title) + '" ' +
        'vector-effect="non-scaling-stroke" d="' + item.d + '" fill="' + a.fill + '" stroke="' + a.stroke + '" stroke-width="' + a.width + '" ' +
        'style="cursor:pointer;transition:fill 0.3s ease, stroke 0.3s ease;"><title>' + esc(item.title) + '</title></path>';
    }).join('');
    $('indiaPaths').innerHTML = html;
  }

  function updateMapSelection() {
    window.INDIA_SVG_PATHS.forEach(function (item) {
      var el = $(item.id);
      if (!el) return;
      var a = pathAttrs(item);
      el.setAttribute('fill', a.fill);
      el.setAttribute('stroke', a.stroke);
      el.setAttribute('stroke-width', a.width);
    });
  }

  function setHovered(title, pos) {
    var mapSection = $('map-section');
    if (hoveredState !== title) {
      if (hoveredState) {
        var prev = $('indiaPaths').querySelector('path[data-title="' + hoveredState.replace(/"/g, '\\"') + '"]');
        if (prev) {
          prev.classList.remove('state-elevated');
          var prevId = prev.id;
          var prevConfig = window.tryjsconfig && window.tryjsconfig[prevId];
          if (prevConfig && state.selectedState.toLowerCase() !== hoveredState.toLowerCase()) {
            prev.setAttribute('fill', prevConfig.upColor);
          }
        }
      }
      if (title) {
        var next = $('indiaPaths').querySelector('path[data-title="' + title.replace(/"/g, '\\"') + '"]');
        if (next) {
          next.classList.add('state-elevated');
          var nextConfig = window.tryjsconfig && window.tryjsconfig[next.id];
          if (nextConfig && state.selectedState.toLowerCase() !== title.toLowerCase()) {
            next.setAttribute('fill', nextConfig.overColor);
          }
        }
      }
      hoveredState = title;
    }
    var tip = $('tryjstip');
    if (title && pos) {
      if (!tip) {
        tip = document.createElement('div');
        tip.id = 'tryjstip';
        tip.style.cssText = 'display:block;position:absolute;transform:translate(0, 0);z-index:1000;pointer-events:none;';
        mapSection.insertBefore(tip, $('mapwrapper'));
      }
      tip.innerHTML =
        '<div class="font-semibold text-xs text-[#963d25] uppercase tracking-wider">' + esc(title) + '</div>' +
        '<div class="text-[11px] text-[#47271b]">' + (title === 'Kerala' ? '18+ Verified Cultural Listings Available' : 'Click to open cultural gateway') + '</div>';
      tip.style.left = pos.x + 'px';
      tip.style.top = pos.y + 'px';
    } else if (tip) {
      tip.remove();
    }
  }

function bindMap() {
  var svg = $('indiaSvg');

  if (!svg) {
    console.error('India map SVG (#indiaSvg) was not found.');
    return;
  }

  // Find the actual state path under the mouse
  function getStatePath(target) {
    if (!target || !target.closest) return null;

    var path = target.closest('#indiaPaths path[data-title]');

    // Make sure the path belongs to this map
    if (!path || !svg.contains(path)) return null;

    return path;
  }

  // Mouse movement / hover detection
  svg.addEventListener('pointermove', function (e) {
    var path = getStatePath(e.target);

    if (path) {
      var title = path.getAttribute('data-title');

      setHovered(title, {
        x: e.pageX + 15,
        y: e.pageY + 10
      });
    } else {
      setHovered(null, null);
    }
  });

  // Clear hover when leaving the map
  svg.addEventListener('pointerleave', function () {
    setHovered(null, null);
  });

  // State selection on click
  svg.addEventListener('click', function (e) {
    var path = getStatePath(e.target);

    if (!path) return;

    e.preventDefault();

    var stateName = path.getAttribute('data-title');

    if (!stateName) return;

    handleSelectState(stateName);

    var journeyEl = $('district-journey');

    if (journeyEl) {
      journeyEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

  /* =========================================================
     DISTRICT TRAIL
     ========================================================= */
  var activeStopIndex = 0;

  function currentDistricts() { return STATE_DISTRICTS[state.selectedState] || STATE_DISTRICTS.Kerala; }

  function updateTrailText() {
    var s = state.selectedState;
    $('journeyTitle').textContent = s + ' — follow the cultural trail';
    $('journeyDescription').textContent =
  'Explore featured districts of ' + s +
  '. Scroll horizontally through the destinations and watch the journey pointer travel along the cultural trail. Click any destination to explore its cultural gateway.';
    $('journeyStateLabel').textContent = 'INDIA · ' + s.toUpperCase();
  }

  function updateTrailStops() {
    var districts = currentDistricts();
    $('journeyProgressLabel').textContent = pad2(activeStopIndex + 1) + ' / ' + pad2(districts.length);
    $('journeyStopList').innerHTML = districts.map(function (name, index) {
      var isActive = index === activeStopIndex || state.selectedDistrict.toLowerCase() === name.toLowerCase();
      return '<button type="button" class="journey-stop ' + (isActive ? 'is-active' : '') + '" data-action="stop-click" data-index="' + index + '" data-name="' + esc(name) + '" aria-current="' + (isActive ? 'step' : 'false') + '">' +
        '<span class="journey-stop-index">DESTINATION ' + pad2(index + 1) + '</span><span class="journey-stop-name">' + esc(name) + '</span></button>';
    }).join('');
  }

  


function trailScroll() {
  var track = $('districtJourneyTrack');
  var stage = $('districtJourneyStage');
  var path = $('journeyRoutePath');
  var pointer = $('journeyPointer');
  var scroller = $('journeyStopScroller');

  if (!track || !stage || !path || !pointer || !scroller) return;

  var districts = currentDistricts();

  // Calculate vertical scroll progress
  var travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
  var rect = track.getBoundingClientRect();

  var progress = Math.max(
    0,
    Math.min(1, -rect.top / travel)
  );

  // 1. Move the journey pointer along the dotted route
  var pathLength = path.getTotalLength();
  var point = path.getPointAtLength(pathLength * progress);

  pointer.setAttribute(
    'transform',
    'translate(' + point.x + ' ' + (point.y - 8) + ')'
  );

  // 2. Move destination cards horizontally using vertical scroll
  var maxScroll = scroller.scrollWidth - scroller.clientWidth;

  scroller.scrollLeft = maxScroll * progress;

  // 3. Synchronize the active destination
  if (districts.length > 1) {
    var nextIndex = Math.min(
      districts.length - 1,
      Math.round(progress * (districts.length - 1))
    );

    if (nextIndex !== activeStopIndex) {
      activeStopIndex = nextIndex;
      updateTrailStops();
    }
  }
}




  /* =========================================================
     CULTURAL GATEWAY
     ========================================================= */
  var doorProgress = 0;

  function activeDistrict() {
    return state.selectedDistrict && state.selectedDistrict !== 'all' ? state.selectedDistrict : 'Thrissur';
  }

  function updateGatewaySubheading() {
    var d = activeDistrict();
    $('gatewaySubheading').textContent = doorProgress < 0.2
      ? 'The sacred temple gateway to ' + d + ' is closed. Scroll down slowly to swing open the doors.'
      : 'The gateway is open! Step inside to explore upcoming cultural activities, exact event timings, and Google Maps directions for ' + d + '.';
  }
  function getEventDateDisplay(evt) {
    if (evt.date && /^\d{4}-\d{2}-\d{2}$/.test(evt.date)) {
        var date = new Date(evt.date + "T00:00:00");

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }

    return evt.schedule || "Date to be announced";
}

  function updateGateway() {
    var d = activeDistrict();
    var s = state.selectedState;
    var events = window.getEventsForDistrict(d);

    $('gatewayHeading').textContent = d + ', ' + s + ' — a doorway into living heritage';
    updateGatewaySubheading();
    $('gatewayKicker').textContent = 'INDIA · ' + s.toUpperCase() + ' · ' + d.toUpperCase();
    $('gatewayStateName').textContent = 'Upcoming Cultural Activities in ' + d;

    $('gatewayDistrictBar').innerHTML =
      '<span class="text-[10px] font-bold uppercase tracking-wider text-[#806b59] mr-1">District:</span>' +
      KERALA_DISTRICTS.map(function (dist) {
        var cur = dist.toLowerCase() === d.toLowerCase();
        return '<button type="button" data-action="gateway-district" data-name="' + esc(dist) + '" class="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ' +
          (cur ? 'bg-[#963d25] text-white shadow-sm ring-2 ring-[#e7b75e]' : 'bg-[#f4ebd9] text-[#5c3e2e] hover:bg-[#ebdcc7]') + '">' + esc(dist) + '</button>';
      }).join('');

    $('gatewayCounter').textContent = pad2(events.length) + ' UPCOMING ACTIVITIES';

    $('gatewayCards').innerHTML = events.map(function (evt) {
      return '' +
        '<article class="gateway-card">' +
          '<button type="button" data-action="open-gateway-event" data-evt="' + esc(evt.id) + '" class="gateway-card-image" aria-label="View details for ' + esc(evt.title) + '">' +
            '<img src="' + esc(evt.image) + '" alt="' + esc(evt.title) + '" class="gateway-card-img" loading="lazy" onerror="' + ERR_IMG + '" />' +
            '<span class="gateway-image-hint">View details</span>' +
          '</button>' +
        '</article>';
    }).join('');
    var cards = document.getElementById('gatewayCards');

if (cards) {
    cards.style.transform = 'translate3d(0, 0, 0)';
}
  }

  /* =========================================================
     MODAL: GATEWAY EVENT DETAILS
     ========================================================= */
  function closeGatewayEventModal() {
    var root = $('gatewayEventModal');
    if (root) root.remove();
  }

  
function renderGatewayEventModal(evt) {
    if (!evt) return;
    closeGatewayEventModal();

    var root = document.createElement('div');
    root.id = 'gatewayEventModal';
    root.className = 'gateway-event-modal';
    root.setAttribute('role', 'presentation');

    root.innerHTML =
      '<div class="gateway-event-backdrop" data-action="close-gateway-event">' +
        '<section class="gateway-event-dialog" role="dialog" aria-modal="true" aria-label="Cultural destination details">' +

          '<header class="gateway-event-header">' +
            '<div>' +
              '<span class="gateway-event-kicker">LIVING CULTURE · DESTINATION</span>' +
              '<h2 class="gateway-event-title">' + esc(evt.title) + '</h2>' +
            '</div>' +
            '<button type="button" class="gateway-event-close" data-action="close-gateway-event" aria-label="Close popup">&times;</button>' +
          '</header>' +

          '<div class="gateway-event-body">' +

            '<div class="gateway-event-photo-wrap">' +
              '<img class="gateway-event-photo" src="' + esc(evt.image) + '" alt="' + esc(evt.title) + '" onerror="' + ERR_IMG + '" />' +
            '</div>' +

            '<div class="gateway-event-info">' +

              '<div class="gateway-event-detail">' +
                '<span class="gateway-event-detail-label">DESTINATION</span>' +
                '<span class="gateway-event-detail-value">' +
                  esc(evt.venue || evt.district || activeDistrict()) +
                '</span>' +
              '</div>' +

              '<div class="gateway-event-detail">' +
                '<span class="gateway-event-detail-label">DATE / SCHEDULE</span>' +
                '<span class="gateway-event-detail-value">' +
                  esc(getEventDateDisplay(evt)) +
                '</span>' +
              '</div>' +

              '<div class="gateway-event-detail">' +
                '<span class="gateway-event-detail-label">TIME</span>' +
                '<span class="gateway-event-detail-value">' +
                  esc(evt.time || 'Please check event schedule') +
                '</span>' +
              '</div>' +

              '<button type="button" class="gateway-event-story" data-action="story" data-evt="' + esc(evt.id) + '">' +
                '<span>Explore Story</span><span aria-hidden="true">&rarr;</span>' +
              '</button>' +

            '</div>' +
          '</div>' +
        '</section>' +
      '</div>';

    document.body.appendChild(root);

    var backdrop = root.querySelector('.gateway-event-backdrop');
    var dialog = root.querySelector('.gateway-event-dialog');

    if (backdrop && dialog) {
      backdrop.addEventListener('click', function (event) {
        if (event.target === backdrop) closeGatewayEventModal();
      });
    }
}

  function updateGatewayCardsPosition(progress) {
    var cards = document.getElementById('gatewayCards');
    var viewport = document.getElementById('gatewayCardsScroll');

    if (!cards || !viewport) return;

    var maxTravel = Math.max(
        0,
        cards.scrollWidth - viewport.clientWidth
    );

    var position = maxTravel * progress;

    cards.style.transform =
        'translate3d(' + (-position) + 'px, 0, 0)';
}

  function bindGatewayScroll() {
    var ticking = false;

    function onScroll() {
        var track = $('gatewayScrollTrack');
        var stage = $('gatewayStage');

        if (!track || !stage) return;
        if (ticking) return;

        ticking = true;

        requestAnimationFrame(function () {
            var rect = track.getBoundingClientRect();

            var travel = Math.max(
                1,
                track.offsetHeight - stage.offsetHeight
            );

            var progress = Math.max(
                0,
                Math.min(1, -rect.top / travel)
            );

            // Move cards horizontally with vertical page scroll
            updateGatewayCardsPosition(progress);

            // Preserve existing temple door animation
            var wasClosed = doorProgress < 0.2;

            doorProgress = progress;

            if (wasClosed !== (progress < 0.2)) {
                updateGatewaySubheading();
            }

            stage.style.setProperty(
                '--door-progress',
                progress.toFixed(3)
            );

            stage.style.setProperty(
                '--left-shift',
                (-progress * 103) + '%'
            );

            stage.style.setProperty(
                '--right-shift',
                (progress * 103) + '%'
            );

            stage.style.setProperty(
                '--left-angle',
                (-progress * 12) + 'deg'
            );

            stage.style.setProperty(
                '--right-angle',
                (progress * 12) + 'deg'
            );

            if (progress > 0.42) {
                stage.classList.add('content-visible');
            } else {
                stage.classList.remove('content-visible');
            }

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, {
        passive: true
    });

    window.addEventListener('resize', onScroll);

    onScroll();
}

  /* =========================================================
     CULTURAL DIRECTORY
     ========================================================= */
  function hasActiveFilters() {
    var f = state.filters;
    return Boolean(f.searchQuery) ||
      (f.district && f.district !== 'all') ||
      (f.artForm && f.artForm !== 'all') ||
      (f.experienceType && f.experienceType !== 'all') ||
      (f.status && f.status !== 'all') ||
      (f.seasonality && f.seasonality !== 'all');
  }

  function updateDirectory() {
    var f = state.filters;
    var listings = filtered();

    // controls
    var search = $('dirSearch');
    if (search.value !== (f.searchQuery || '')) search.value = f.searchQuery || '';
    $('dirDistrict').value = f.district || 'all';
    $('dirArtForm').value = f.artForm || 'all';
    $('dirExperience').value = f.experienceType || 'all';
    $('dirStatus').value = f.status || 'all';

    $('dirResetSlot').innerHTML = hasActiveFilters()
      ? '<button data-action="reset-filters" class="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-[#963d25] bg-[#faeee5] hover:bg-[#f3dfd2] rounded-xl transition-all cursor-pointer">' + icon('RotateCcw', 'w-3.5 h-3.5') + '<span>Reset Filters</span></button>'
      : '';

    $('dirCounter').innerHTML = 'Showing <strong class="text-[#963d25] font-semibold">' + listings.length + '</strong> cultural ' + (listings.length === 1 ? 'experience' : 'experiences');

    $('dirPills').innerHTML = ['Kannur', 'Thrissur', 'Alappuzha', 'Kozhikode', 'Palakkad'].map(function (dist) {
      var sel = (f.district || '').toLowerCase() === dist.toLowerCase();
      return '<button data-action="pill-district" data-name="' + dist + '" class="px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ' +
        (sel ? 'bg-[#963d25] text-white font-medium' : 'bg-[#f5eedf] text-[#5c3e2e] hover:bg-[#ebdcc7]') + '">' + dist + '</button>';
    }).join('');

    // results
    if (listings.length === 0) {
      $('dirResults').innerHTML =
        '<div class="text-center py-16 bg-white/60 border border-[#e4d7c2] rounded-2xl p-8">' +
          '<div class="text-4xl mb-3">✺</div>' +
          '<h3 class="text-lg font-serif font-bold text-[#47271b]">No matching cultural experiences</h3>' +
          '<p class="text-sm text-[#806b59] max-w-md mx-auto mt-1 mb-4">Try adjusting your search keywords or resetting filters to browse all verified traditions.</p>' +
          '<button data-action="reset-filters" class="px-4 py-2 rounded-full text-xs font-semibold bg-[#963d25] text-white hover:bg-[#7d321e] cursor-pointer">Clear All Filters</button>' +
        '</div>';
      return;
    }

    $('dirResults').innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">' + listings.map(function (item) {
      var isVerified = item.verificationStatus === 'verified';
      return '' +
        '<article class="group flex flex-col bg-white border border-[#e6dbc8] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#c8a66f] transition-all duration-300">' +
         '<div class="relative h-64 w-full overflow-hidden bg-[#25140f]/10">' +
            '<img src="' + esc(item.imageUrl) + '" alt="' + esc(item.title) + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="' + ERR_IMG + '" />' +
            '<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>' +
            '<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-[#25140f]/70 text-[#fcedd0] backdrop-blur-sm border border-white/20">' + esc(item.artForm) + '</span>' +
            '<span class="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#e7b75e] text-[#3d2119] shadow-sm">' + esc(item.district) + '</span>' +
            '<div class="absolute bottom-2.5 left-3 right-3 text-white text-[11px] flex items-center gap-1.5 drop-shadow-md">' + icon('Calendar', 'w-3.5 h-3.5 text-[#e7b75e] shrink-0') + '<span class="truncate">' + esc(item.dateOrSeason) + '</span></div>' +
          '</div>' +
          '<div class="p-5 flex-1 flex flex-col justify-between">' +
            '<div>' +
              '<div class="mb-2">' + (isVerified
                ? '<div class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">' + icon('CheckCircle2', 'w-3 h-3 text-emerald-600 shrink-0') + '<span class="truncate">Verified · ' + esc((item.verifiedBy && item.verifiedBy.split(' ')[0]) || 'Council') + '</span></div>'
                : '<div class="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">' + icon('Clock', 'w-3 h-3 text-amber-600 shrink-0') + '<span>Community Submitted</span></div>') + '</div>' +
              '<h3 class="text-base font-serif font-bold text-[#332018] group-hover:text-[#963d25] transition-colors line-clamp-2 leading-snug">' + esc(item.title) + '</h3>' +
              '<div class="flex items-center gap-1 text-xs text-[#806b59] mt-1.5 mb-2.5">' + icon('MapPin', 'w-3.5 h-3.5 text-[#963d25] shrink-0') + '<span class="truncate">' + esc(item.locality) + '</span></div>' +
              '<p class="text-xs text-[#5e4f44] line-clamp-2 leading-relaxed">' + esc(item.description) + '</p>' +
            '</div>' +
            '<div class="mt-4 pt-3 border-t border-[#f2e9dc] flex items-center justify-between gap-2">' +
              '<button data-action="open-listing" data-id="' + esc(item.id) + '" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8d4328] hover:text-[#5e2716] hover:underline cursor-pointer">' + icon('BookOpen', 'w-3.5 h-3.5') + '<span>Explore Heritage Story</span></button>' +
              (item.sourceUrl ? '<a href="' + esc(item.sourceUrl) + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] text-[#806b59] hover:text-[#47271b] p-1.5 rounded-md hover:bg-[#f6eee3] transition-colors" title="Open external source or official organizer page"><span>Official Source</span>' + icon('ExternalLink', 'w-3 h-3') + '</a>' : '') +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('') + '</div>';
  }

  function bindDirectory() {
    $('dirSearch').addEventListener('input', function (e) { handleUpdateFilters({ searchQuery: e.target.value }); });
    $('dirDistrict').addEventListener('change', function (e) { handleUpdateFilters({ district: e.target.value }); });
    $('dirArtForm').addEventListener('change', function (e) { handleUpdateFilters({ artForm: e.target.value }); });
    $('dirExperience').addEventListener('change', function (e) { handleUpdateFilters({ experienceType: e.target.value }); });
    $('dirStatus').addEventListener('change', function (e) { handleUpdateFilters({ status: e.target.value }); });
  }

  /* =========================================================
     MODAL: LISTING DETAIL
     ========================================================= */
  function renderListingModal() {
    var root = $('modalListing');
    var listing = state.activeModalListing;
    if (!listing) { root.innerHTML = ''; return; }
    var isVerified = listing.verificationStatus === 'verified';

    root.innerHTML =
      '<div class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5" role="dialog" aria-modal="true">' +
        '<div class="relative bg-[#fffdf9] w-full max-w-3xl rounded-3xl border border-[#d6b16f] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">' +
          '<div class="flex items-center justify-between px-6 py-4 border-b border-[#ebdcc7] bg-[#fbf5eb]">' +
            '<div class="flex items-center gap-2">' +
              '<span class="text-sm font-semibold text-[#963d25] uppercase tracking-wider">' + esc(listing.artForm) + '</span>' +
              '<span class="text-[#a08f80]">·</span>' +
              '<span class="text-xs font-bold text-[#47271b] px-2 py-0.5 rounded bg-[#e7b75e]/40">' + esc(listing.district) + ', ' + esc(listing.state) + '</span>' +
            '</div>' +
            '<button data-action="close-listing" class="p-1.5 rounded-full text-[#5c3e2e] hover:bg-[#ede0ce] transition-colors cursor-pointer" aria-label="Close modal">' + icon('X', 'w-5 h-5') + '</button>' +
          '</div>' +
          '<div class="overflow-y-auto custom-scrollbar p-6 space-y-6">' +
            '<div class="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">' +
              '<img src="' + esc(listing.imageUrl) + '" alt="' + esc(listing.title) + '" class="w-full h-full object-cover" onerror="' + ERR_IMG + '" />' +
              '<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>' +
              '<div class="absolute bottom-4 left-4 right-4 text-white">' +
                '<h2 class="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-md">' + esc(listing.title) + '</h2>' +
                '<div class="flex flex-wrap items-center gap-3 text-xs text-[#fae6c3] mt-1.5">' +
                  '<span class="flex items-center gap-1">' + icon('MapPin', 'w-3.5 h-3.5') + esc(listing.locality) + '</span><span>·</span>' +
                  '<span class="flex items-center gap-1">' + icon('Calendar', 'w-3.5 h-3.5') + esc(listing.dateOrSeason) + ' (' + esc(listing.seasonalityType) + ')</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ' + (isVerified ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-amber-50/70 border-amber-200 text-amber-900') + '">' +
              '<div class="flex items-start gap-2.5">' +
                (isVerified ? icon('ShieldCheck', 'w-5 h-5 text-emerald-600 shrink-0 mt-0.5') : icon('Clock', 'w-5 h-5 text-amber-600 shrink-0 mt-0.5')) +
                '<div>' +
                  '<div class="font-semibold text-xs uppercase tracking-wider">' + (isVerified ? 'Verified Cultural Tradition' : 'Community Submitted Entry') + '</div>' +
                  '<div class="text-xs text-[#52443a] mt-0.5">' + (isVerified
                    ? 'Authenticated by <strong>' + esc(listing.verifiedBy) + '</strong> on ' + esc(listing.verificationDate || 'Recent Review')
                    : 'Contributed by local attendee. Pending editorial verification and field check.') + '</div>' +
                  (listing.moderatorNotes ? '<div class="text-[11px] text-[#47271b] bg-white/80 p-2 rounded mt-2 border border-black/5 italic">Curator Note: ' + esc(listing.moderatorNotes) + '</div>' : '') +
                '</div>' +
              '</div>' +
              (listing.contributorName ? '<div class="text-[11px] text-[#705e52] shrink-0 sm:text-right">Contributed by: <strong>' + esc(listing.contributorName) + '</strong></div>' : '') +
            '</div>' +
            '<div><h4 class="text-xs font-bold text-[#963d25] uppercase tracking-wider mb-2">Summary Overview</h4><p class="text-sm text-[#47271b] leading-relaxed">' + esc(listing.description) + '</p></div>' +
            '<div class="bg-[#fcf7ee] border border-[#e4d7c2] rounded-2xl p-5">' +
              '<h4 class="text-xs font-bold text-[#963d25] uppercase tracking-wider mb-2 flex items-center gap-1.5">' + icon('Info', 'w-4 h-4 text-[#963d25]') + '<span>Cultural Background & Lineage Story</span></h4>' +
              '<p class="text-sm text-[#3b2318] leading-relaxed whitespace-pre-line">' + esc(listing.backgroundStory) + '</p>' +
            '</div>' +
            '<div><h4 class="text-xs font-bold text-[#963d25] uppercase tracking-wider mb-2">Community & Social Significance</h4><p class="text-sm text-[#47271b] leading-relaxed">' + esc(listing.communitySignificance) + '</p></div>' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">' +
              '<div class="p-4 bg-white border border-[#e6dbc8] rounded-xl space-y-1.5">' +
                '<div class="text-[11px] font-bold text-[#806b59] uppercase tracking-wider flex items-center gap-1.5">' + icon('User', 'w-3.5 h-3.5 text-[#963d25]') + '<span>Custodian & Lead Artists</span></div>' +
                '<div class="text-sm font-semibold text-[#25140f]">' + esc(listing.artistOrOrganiser) + '</div>' +
                (listing.guruOrLineage ? '<div class="text-xs text-[#705e52]">Lineage: ' + esc(listing.guruOrLineage) + '</div>' : '') +
                (listing.contactEmailOrPhone ? '<div class="text-xs text-[#963d25] pt-1">Contact: ' + esc(listing.contactEmailOrPhone) + '</div>' : '') +
              '</div>' +
              '<div class="p-4 bg-white border border-[#e6dbc8] rounded-xl space-y-1.5">' +
                '<div class="text-[11px] font-bold text-[#806b59] uppercase tracking-wider flex items-center gap-1.5">' + icon('AlertCircle', 'w-3.5 h-3.5 text-[#963d25]') + '<span>Visiting Etiquette & Guidelines</span></div>' +
                '<p class="text-xs text-[#52443a] leading-relaxed">' + esc(listing.visitingEtiquette || 'Wear respectful attire. Always confirm with temple elders or workshop organizers before taking close flash photographs.') + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="pt-4 border-t border-[#ebdcc7] flex flex-wrap items-center justify-between gap-3">' +
              '<div class="flex flex-wrap items-center gap-3">' +
                (listing.sourceUrl ? '<a href="' + esc(listing.sourceUrl) + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#47271b] hover:bg-[#331c13] text-white transition-colors">' + icon('Globe', 'w-3.5 h-3.5') + '<span>Official Event / Institute Website</span>' + icon('ExternalLink', 'w-3 h-3 ml-1') + '</a>' : '') +
                (listing.socialMediaUrl ? '<a href="' + esc(listing.socialMediaUrl) + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#d2b77f] text-[#47271b] hover:bg-[#fbf4e8] transition-colors">' + icon('Instagram', 'w-3.5 h-3.5 text-[#963d25]') + '<span>Public Social Profile</span>' + icon('ExternalLink', 'w-3 h-3 ml-1') + '</a>' : '') +
              '</div>' +
              '<button data-action="close-listing" class="px-5 py-2 text-xs font-semibold text-[#806b59] hover:text-[#47271b] cursor-pointer">Close</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* =========================================================
     MODAL: CONTRIBUTION FORM
     ========================================================= */
  var formData = {
    title: '', artForm: 'Ritual Performance', state: 'Kerala', district: 'Kannur', locality: '',
    experienceType: 'Ritual Performance', dateOrSeason: '', seasonalityType: 'Seasonal',
    description: '', backgroundStory: '', communitySignificance: '', artistOrOrganiser: '',
    guruOrLineage: '', sourceUrl: '', socialMediaUrl: '', imageUrl: '', contributorName: '',
    contributorContact: '', visitingEtiquette: ''
  };
  var contribSuccess = false;

  // The form markup lives in index.html (#modalContribute). JS only shows/hides it
  // and keeps the typed values.
  function renderContributionModal() {
    var root = $('modalContribute');
    var form = $('contribForm');
    var success = $('contribSuccess');
    root.hidden = !state.isContributeOpen;
    if (!state.isContributeOpen) return;

    form.hidden = contribSuccess;
    success.hidden = !contribSuccess;

    // put the remembered values back into the fields
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && formData[el.name] !== undefined) el.value = formData[el.name];
    });
  }

  function bindContributionForm() {
    var form = $('contribForm');
    var onChange = function (e) {
      var t = e.target;
      if (!t.name) return;
      formData[t.name] = t.value;
      setContribError(null);
    };
    form.addEventListener('input', onChange);
    form.addEventListener('change', onChange);
    form.addEventListener('submit', handleContribSubmit);
  }

  function setContribError(msg) {
    var slot = $('contribError');
    if (!slot) return;
    slot.innerHTML = msg
      ? '<div class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">' + icon('AlertTriangle', 'w-4 h-4 shrink-0 text-red-600') + '<span>' + esc(msg) + '</span></div>'
      : '';
  }

  function handleContribSubmit(e) {
    e.preventDefault();
    if (!formData.title || formData.title.trim().length < 3) return setContribError('Please provide a title of at least 3 characters.');
    if (!formData.district) return setContribError('Please select a district.');
    if (!formData.description || formData.description.trim().length < 10) return setContribError('Please provide a brief description (at least 10 characters).');
    if (!formData.contributorName || formData.contributorName.trim().length === 0) return setContribError('Please enter your name as contributor.');

    try {
      handleCreateSubmission(formData);
      contribSuccess = true;
      renderContributionModal();
      setTimeout(function () {
        contribSuccess = false;
        state.isContributeOpen = false;
        renderContributionModal();
      }, 2200);
    } catch (err) {
      setContribError((err && err.message) || 'Failed to submit listing');
    }
  }

  /* =========================================================
     MODAL: MODERATION PORTAL
     ========================================================= */
  var admin = {
    activeTab: 'pending',
    selectedItem: null,
    verifierName: 'Kerala Sangeetha Nataka Akademi',
    curatorNotes: '',
    showApproveDialog: false
  };

  function renderAdminModal() {
    var root = $('modalAdmin');
    if (!state.isModeratorOpen) { root.innerHTML = ''; return; }

    var listings = state.allListings;
        var loggedInUser = currentUser();

    if (!loggedInUser || !window.LCMAuth.isModerator(loggedInUser)) {
      state.isModeratorOpen = false;
      root.innerHTML = '';
      return;
    }

    var adminTools = '';

    if (window.LCMAuth.isAdmin(loggedInUser)) {
      adminTools =
        '<div class="mb-6 p-4 rounded-2xl bg-[#fbf5eb] border border-[#e4d7c2]">' +
          '<h4 class="text-sm font-bold text-[#47271b] mb-1">Administrator Controls</h4>' +
          '<p class="text-xs text-[#806b59] mb-3">Authorize an email address to access the Moderator Hub.</p>' +
          '<button type="button" data-action="authorize-moderator" class="px-4 py-2 rounded-lg bg-[#47271b] text-white text-xs font-semibold hover:bg-[#331c13]">' +
            'Authorize Moderator Email' +
          '</button>' +
        '</div>';
    }
    var pending = listings.filter(function (l) { return l.verificationStatus === 'pending'; });
    var verified = listings.filter(function (l) { return l.verificationStatus === 'verified'; });
    var displayed = admin.activeTab === 'pending' ? pending : admin.activeTab === 'verified' ? verified : listings;

    var tabCls = function (t) {
      return 'px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ' +
        (admin.activeTab === t ? 'border-[#963d25] text-[#963d25]' : 'border-transparent text-[#705e52] hover:text-[#25140f]');
    };

    var approve = '';
    if (admin.showApproveDialog && admin.selectedItem) {
      approve =
        '<div class="mb-6 p-5 rounded-2xl bg-[#f0f9f3] border border-[#a3d9b5] space-y-3">' +
          '<div class="flex items-center justify-between">' +
            '<h4 class="text-sm font-bold text-emerald-900 flex items-center gap-1.5">' + icon('CheckCircle2', 'w-4 h-4 text-emerald-600') + '<span>Approve & Verify: ' + esc(admin.selectedItem.title) + '</span></h4>' +
            '<button data-action="cancel-approve" class="text-xs text-emerald-700 hover:underline">Cancel</button>' +
          '</div>' +
          '<div><label class="block text-[11px] font-bold text-emerald-900 mb-1">Certifying Authority / Verifying Body Name</label>' +
            '<input type="text" id="adminVerifier" value="' + esc(admin.verifierName) + '" class="w-full text-xs p-2.5 bg-white border border-emerald-300 rounded-lg text-emerald-950 focus:outline-none" /></div>' +
          '<div><label class="block text-[11px] font-bold text-emerald-900 mb-1">Curator Verification Notes</label>' +
            '<input type="text" id="adminNotes" value="' + esc(admin.curatorNotes) + '" class="w-full text-xs p-2.5 bg-white border border-emerald-300 rounded-lg text-emerald-950 focus:outline-none" /></div>' +
          '<div class="flex justify-end gap-2 pt-2">' +
            '<button data-action="cancel-approve" class="px-3 py-1.5 text-xs text-emerald-800">Cancel</button>' +
            '<button data-action="confirm-approve" class="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm cursor-pointer">Confirm & Publish as Verified</button>' +
          '</div>' +
        '</div>';
    }

    var list;
    if (displayed.length === 0) {
      list = '<div class="text-center py-12 text-[#806b59] text-sm"><div class="text-3xl mb-2">✦</div>No listings currently in this view.</div>';
    } else {
      list = '<div class="space-y-4">' + displayed.map(function (item) {
        var isPending = item.verificationStatus === 'pending';
        var isItemVerified = item.verificationStatus === 'verified';
        return '' +
          '<div class="p-4 bg-white border border-[#e4d7c2] rounded-2xl hover:border-[#c8a66f] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">' +
            '<div class="flex items-start gap-3.5 max-w-xl">' +
              '<img src="' + esc(item.imageUrl) + '" alt="' + esc(item.title) + '" class="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#d6b16f]/40" onerror="' + ERR_IMG + '" />' +
              '<div>' +
                '<div class="flex flex-wrap items-center gap-1.5 mb-1">' +
                  '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#963d25] text-white">' + esc(item.artForm) + '</span>' +
                  '<span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#faeee5] text-[#963d25]">' + esc(item.district) + '</span>' +
                  (isItemVerified
                    ? '<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">' + icon('CheckCircle2', 'w-2.5 h-2.5') + '<span>Verified</span></span>'
                    : '<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">' + icon('Clock', 'w-2.5 h-2.5') + '<span>Pending Review</span></span>') +
                '</div>' +
                '<h4 class="text-sm font-serif font-bold text-[#25140f] leading-snug">' + esc(item.title) + '</h4>' +
                '<div class="text-[11px] text-[#705e52] mt-0.5 flex flex-wrap items-center gap-2"><span>' + esc(item.locality) + '</span><span>·</span><span>' + esc(item.dateOrSeason) + '</span>' +
                  (item.contributorName ? '<span>·</span><span>By: ' + esc(item.contributorName) + '</span>' : '') + '</div>' +
                (item.moderatorNotes ? '<div class="text-[10px] text-[#5e2716] italic mt-1">Note: ' + esc(item.moderatorNotes) + '</div>' : '') +
              '</div>' +
            '</div>' +
            '<div class="flex items-center gap-2 self-end md:self-center shrink-0">' +
              '<button data-action="admin-preview" data-id="' + esc(item.id) + '" class="p-2 rounded-lg text-xs font-semibold text-[#806b59] hover:bg-[#f6eee3] hover:text-[#47271b] flex items-center gap-1 cursor-pointer" title="Preview Listing">' + icon('Eye', 'w-4 h-4') + '<span class="hidden sm:inline">Preview</span></button>' +
              (isPending
                ? '<button data-action="start-approve" data-id="' + esc(item.id) + '" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 cursor-pointer shadow-sm active:scale-95">' + icon('CheckCircle2', 'w-3.5 h-3.5') + '<span>Verify & Approve</span></button>' +
                  '<button data-action="reject" data-id="' + esc(item.id) + '" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 flex items-center gap-1 cursor-pointer">' + icon('XCircle', 'w-3.5 h-3.5') + '<span>Reject</span></button>'
                : '<button data-action="start-approve" data-id="' + esc(item.id) + '" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#d2b77f] text-[#47271b] hover:bg-[#fbf4e8] cursor-pointer">Edit Badge / Notes</button>') +
            '</div>' +
          '</div>';
      }).join('') + '</div>';
    }

    root.innerHTML =
      '<div class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5" role="dialog" aria-modal="true">' +
        '<div class="relative bg-[#fffdfa] w-full max-w-4xl rounded-3xl border border-[#d6b16f] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">' +
          '<div class="flex items-center justify-between px-6 py-4 border-b border-[#ebdcc7] bg-[#fbf5eb]">' +
            '<div class="flex items-center gap-2.5">' + icon('ShieldCheck', 'w-5 h-5 text-[#963d25]') +
              '<div><h3 class="text-xl font-serif font-bold text-[#47271b]">Curator & Moderation Workflow Portal</h3>' +
              '<p class="text-xs text-[#806b59]">Review community contributions, verify sources, and award official verification badges.</p></div></div>' +
            '<button data-action="close-moderator" class="p-1.5 rounded-full text-[#5c3e2e] hover:bg-[#ede0ce] transition-colors cursor-pointer">' + icon('X', 'w-5 h-5') + '</button>' +
          '</div>' +
          '<div class="flex items-center gap-2 px-6 pt-3 border-b border-[#e4d7c2] bg-white">' +
            '<button data-action="admin-tab" data-tab="pending" class="' + tabCls('pending') + ' flex items-center gap-1.5">' + icon('Clock', 'w-3.5 h-3.5') + '<span>Pending Review</span>' +
              '<span class="px-1.5 py-0.2 rounded-full text-[10px] font-bold ' + (pending.length > 0 ? 'bg-[#b78103] text-white' : 'bg-[#e4d7c2] text-[#47271b]') + '">' + pending.length + '</span></button>' +
            '<button data-action="admin-tab" data-tab="verified" class="' + tabCls('verified') + ' flex items-center gap-1.5">' + icon('CheckCircle2', 'w-3.5 h-3.5') + '<span>Verified Traditions (' + verified.length + ')</span></button>' +
            '<button data-action="admin-tab" data-tab="all" class="' + tabCls('all') + '">All Database Entries (' + listings.length + ')</button>' +
          '</div>' +
          '<div class="overflow-y-auto custom-scrollbar p-6">' + adminTools + approve + list + '</div>' +
          '<div class="px-6 py-3 border-t border-[#ebdcc7] bg-[#fbf5eb] flex items-center justify-between text-xs text-[#806b59]">' +
            '<span>Strict Verification Principle: No social scraping; only authenticated community and council records.</span>' +
            '<button data-action="close-moderator" class="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#47271b] text-white hover:bg-[#331c13]">Close</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* =========================================================
     APP HANDLERS (same logic as the original App component)
     ========================================================= */
  function findListing(id) {
    for (var i = 0; i < state.allListings.length; i++) if (state.allListings[i].id === id) return state.allListings[i];
    return null;
  }

  function refreshAfterFilterChange() {
    updateDirectory();
    updateTrailStops();
    updateGateway();
  }

  function handleSelectState(stateName) {
    state.selectedState = stateName;
    state.filters.district = 'all';
    state.filters.searchQuery = '';
    state.selectedDistrict = 'all';
    updateMapSelection();
    updateTrailText();
    updateTrailStops();
    trailScroll();
    updateGateway();
    updateDirectory();
  }

  function handleSelectDistrict(districtName) {
    state.selectedDistrict = districtName;
    state.filters.district = districtName;
    refreshAfterFilterChange();
  }

  function handleUpdateFilters(newFilters) {
    for (var k in newFilters) state.filters[k] = newFilters[k];
    if (newFilters.district) state.selectedDistrict = newFilters.district;
    refreshAfterFilterChange();
  }

  function handleResetFilters() {
    state.filters = {
      state: 'Kerala', district: 'all', artForm: 'all', experienceType: 'all',
      status: 'all', seasonality: 'all', searchQuery: ''
    };
    state.selectedDistrict = 'all';
    refreshAfterFilterChange();
  }

  function handleCreateSubmission(input) {
    var res = window.createCommunitySubmission(input, state.allListings);
    state.allListings = res.updatedListings;
    listingsChanged();
  }

  function handleModerate(id, status, notes, verifiedBy) {
    var updated = window.moderateListing(id, status, notes, verifiedBy, state.allListings);
    state.allListings = updated;
    if (state.activeModalListing && state.activeModalListing.id === id) {
      var refreshed = findListing(id);
      if (refreshed) state.activeModalListing = refreshed;
    }
    listingsChanged();
    renderListingModal();
  }

  function listingsChanged() {
    updateBadges();
    updateDirectory();
    if (state.isModeratorOpen) renderAdminModal();
  }

  /* ---------- delegated click handling ---------- */
  function onClick(e) {
    var el = e.target.closest ? e.target.closest('[data-action]') : null;
    if (!el) return;
    var action = el.getAttribute('data-action');
    var id = el.getAttribute('data-id');

    switch (action) {
            case 'open-contribute': {
        var contributor = currentUser();

        if (!contributor) {
          openAuth('login', 'user', 'contribute');
        } else {
          state.isContributeOpen = true;
          renderContributionModal();
        }
        break;
      }

      case 'close-contribute':
        state.isContributeOpen = false;
        renderContributionModal();
        break;

      case 'open-moderator': {
        var moderator = currentUser();

        if (!moderator || !window.LCMAuth.isModerator(moderator)) {
          openAuth('login', 'moderator', 'moderator');
        } else {
          state.isModeratorOpen = true;
          renderAdminModal();
        }
        break;
      }

      case 'close-moderator':
        state.isModeratorOpen = false;
        renderAdminModal();
        break;

            case 'open-auth':
        openAuth('login', 'user', null);
        break;

      case 'close-auth':
        closeAuthModal();
        break;

      case 'switch-auth-mode':
        authMode = authMode === 'login' ? 'register' : 'login';
        renderAuthModal();
        break;

      case 'logout':
        window.LCMAuth.logout();

        state.isContributeOpen = false;
        state.isModeratorOpen = false;

        renderContributionModal();
        renderAdminModal();
        updateAuthNav();

        break;

      case 'authorize-moderator': {
        var actor = currentUser();

        if (!actor || !window.LCMAuth.isAdmin(actor)) {
          alert('Only the administrator can authorize moderators.');
          break;
        }

        var moderatorEmail = window.prompt(
          'Enter the email address to authorize as a moderator:'
        );

        if (moderatorEmail === null) break;

        try {
          var authorizedEmail = window.LCMAuth.authorizeModerator(
            moderatorEmail,
            actor
          );

          alert(authorizedEmail + ' is now authorized as a moderator.');
          renderAdminModal();

        } catch (err) {
          alert(err.message || 'Could not authorize this moderator.');
        }

        break;
      }
      case 'close-listing':
        state.activeModalListing = null; renderListingModal(); break;
      case 'open-listing': {
        var l = findListing(id);
        if (l) { state.activeModalListing = l; renderListingModal(); }
        break;
      }
      case 'stop-click': {
        var idx = parseInt(el.getAttribute('data-index'), 10);
        activeStopIndex = idx;
        handleSelectDistrict(el.getAttribute('data-name'));
        var gw = $('culture-gateway');
        if (gw) gw.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'gateway-district':
        handleSelectDistrict(el.getAttribute('data-name')); break;
      case 'pill-district': {
        var name = el.getAttribute('data-name');
        var isSel = (state.filters.district || '').toLowerCase() === name.toLowerCase();
        handleUpdateFilters({ district: isSel ? 'all' : name });
        break;
      }
      case 'reset-filters':
        handleResetFilters(); break;
      case 'scroll-cards': {
        var sc = $('gatewayCardsScroll');
        if (sc) sc.scrollBy({ left: el.getAttribute('data-dir') === 'left' ? -380 : 380, behavior: 'smooth' });
        break;
      }
      case 'open-gateway-event': {
        var eventId = el.getAttribute('data-evt');
        var gatewayEvents = window.getEventsForDistrict(activeDistrict());
        var selectedEvent = gatewayEvents.filter(function (item) { return item.id === eventId; })[0];
        if (selectedEvent) renderGatewayEventModal(selectedEvent);
        break;
      }
      case 'close-gateway-event':
        closeGatewayEventModal(); break;
      case 'story': {
        closeGatewayEventModal();
        var evts = window.getEventsForDistrict(activeDistrict());
        var evt = evts.filter(function (x) { return x.id === el.getAttribute('data-evt'); })[0];
        var all = state.allListings;
        var match = null;
        if (evt) {
          var firstWord = evt.title.split(' ')[0].toLowerCase();
          for (var i = 0; i < all.length; i++) {
            var li = all[i];
            if ((evt.relatedListingId && li.id === evt.relatedListingId) ||
                li.title.toLowerCase().indexOf(firstWord) !== -1 ||
                li.district.toLowerCase() === evt.district.toLowerCase()) { match = li; break; }
          }
        }
        var target = match || all[0];

        if (target) {
          // Use the same image displayed on the gateway event card
          var storyListing = Object.assign({}, target);

          if (evt && evt.image) {
            storyListing.imageUrl = evt.image;
          }

          state.activeModalListing = storyListing;
          renderListingModal();
        }

        break;
      }
      case 'admin-tab':
        admin.activeTab = el.getAttribute('data-tab'); renderAdminModal(); break;
      case 'admin-preview': {
        var pl = findListing(id);
        state.isModeratorOpen = false; renderAdminModal();
        if (pl) { state.activeModalListing = pl; renderListingModal(); }
        break;
      }
      case 'start-approve': {
        var item = findListing(id);
        if (!item) break;
        admin.selectedItem = item;
        admin.verifierName = 'Kerala Folklore Academy';
        admin.curatorNotes = 'Verified through local temple trust and community guild records.';
        admin.showApproveDialog = true;
        renderAdminModal();
        break;
      }
      case 'cancel-approve':
        admin.showApproveDialog = false; renderAdminModal(); break;
      case 'confirm-approve':
        if (!admin.selectedItem) break;
        var sid = admin.selectedItem.id;
        admin.showApproveDialog = false;
        admin.selectedItem = null;
        handleModerate(sid, 'verified', admin.curatorNotes, admin.verifierName);
        break;
      case 'reject': {
        var ri = findListing(id);
        if (!ri) break;
        var reason = window.prompt('Enter reason for rejecting this listing (optional):', 'Incomplete location or unverified dates.');
        if (reason !== null) handleModerate(ri.id, 'rejected', reason, '');
        break;
      }
    }
  }

  function onInput(e) {
    if (e.target.id === 'adminVerifier') admin.verifierName = e.target.value;
    else if (e.target.id === 'adminNotes') admin.curatorNotes = e.target.value;
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    state.allListings = window.getInitialListings();
        updateAuthNav();

    buildMap();
    bindMap();
    bindDirectory();
    bindContributionForm();

    updateBadges();
    updateTrailText();
    updateTrailStops();
    updateGateway();
    updateDirectory();

    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeGatewayEventModal();
    });

   // Horizontal district scrolling controls the journey pointer
// Vertical page scrolling controls the journey pointer
window.addEventListener(
  'scroll',
  trailScroll,
  { passive: true }
);

// Recalculate when screen size changes
window.addEventListener('resize', trailScroll);

trailScroll();


bindGatewayScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


