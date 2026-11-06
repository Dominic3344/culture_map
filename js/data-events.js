/* Upcoming cultural events per Kerala district */
var M2 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var districtEvents_exports = {};
  __export(districtEvents_exports, {
    DISTRICT_UPCOMING_EVENTS: () => DISTRICT_UPCOMING_EVENTS,
    getEventsForDistrict: () => getEventsForDistrict
  });
  const DISTRICT_UPCOMING_EVENTS = {
    Thrissur: [
      {
        id: "evt-thrissur-01",
        title: "Ilanjithara Melam Percussion Ensemble",
        district: "Thrissur",
        state: "Kerala",
        venue: "Vadakkumnathan Temple, Thekkinkadu Maidan, Thrissur",
        date: "Upcoming Weekend Cycle (Sat & Sun)",
        time: "2:00 PM \u2013 6:30 PM IST",
        artForm: "Temple Percussion & Melam",
        description: "Synchronized traditional acoustic orchestra of 250 master instrumentalists performing traditional Pandi Melam with Chenda, Ilathalam, and Kombu.",
        image: "https://images.unsplash.com/photo-1599818817639-65126860f38b?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Vadakkumnathan+Temple,+Thekkinkadu+Maidan,+Thrissur,+Kerala",
        relatedListingId: "ker-02",
        statusBadge: "Pooram Cycle \xB7 Live Session"
      },
      {
        id: "evt-thrissur-02",
        title: "Kalamandalam Classical Kathakali Rehearsal & Bhava Recital",
        district: "Thrissur",
        state: "Kerala",
        venue: "Kerala Kalamandalam Koothambalam, Cheruthuruthy, Thrissur",
        date: "Upcoming Thursday & Friday",
        time: "9:30 AM \u2013 1:00 PM IST",
        artForm: "Classical Dance & Theatre",
        description: "Master actors and gurukula students in full facial bhava exercises, mudra training, and live vocal Chenda-Maddalam accompaniment.",
        image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kerala+Kalamandalam,+Cheruthuruthy,+Thrissur,+Kerala",
        relatedListingId: "ker-03",
        statusBadge: "Open Gurukula Entry"
      },
      {
        id: "evt-thrissur-03",
        title: "Ammannur Koodiyattam Sanskrit Theatre Performance",
        district: "Thrissur",
        state: "Kerala",
        venue: "Ammannur Chachu Chakyar Smaraka Gurukulam, Irinjalakuda, Thrissur",
        date: "Upcoming Full Moon Evening",
        time: "6:30 PM \u2013 9:30 PM IST",
        artForm: "Classical Dance & Theatre",
        description: "Recognized by UNESCO as Intangible Cultural Heritage: ancient Sanskrit theatre enacting scenes from Bhasa plays with Mizhavu percussion drums.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Ammannur+Chachu+Chakyar+Smaraka+Gurukulam,+Irinjalakuda,+Thrissur,+Kerala",
        relatedListingId: "ker-04",
        statusBadge: "UNESCO Heritage Recital"
      },
      {
        id: "evt-thrissur-04",
        title: "Nadavaramba Bronze Uruli Casting & Foundry Demonstration",
        district: "Thrissur",
        state: "Kerala",
        venue: "Nadavaramba Bell Metal Artisan Guild, Irinjalakuda, Thrissur",
        date: "Monday through Saturday",
        time: "10:00 AM \u2013 4:30 PM IST",
        artForm: "Traditional Craft & Metalwork",
        description: "Living lost-wax casting demonstration where hereditary metal masters pour molten bell-metal alloys to create reverberating Varpu and temple lamps.",
        image: "https://images.unsplash.com/photo-1584697964190-7bb0db32e65c?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Nadavaramba,+Irinjalakuda,+Thrissur,+Kerala",
        relatedListingId: "ker-10",
        statusBadge: "Artisan Workshop Tour"
      }
    ],
    Kannur: [
      {
        id: "evt-kannur-01",
        title: "Muchilot Bhagavathi Theyyam & Fire Rite Invocation",
        district: "Kannur",
        state: "Kerala",
        venue: "Madayi Kavu & Parassini Sacred Groves, Kannur",
        date: "Upcoming Nocturnal Kavu Gathering",
        time: "6:30 PM \u2013 4:00 AM (Overnight) IST",
        artForm: "Ritual Performance",
        description: "Sacred shamanic invocation where the performer transforms into the living deity with blazing torch dances, 30-foot headdress, and roaring Chenda beats.",
        image: "https://images.unsplash.com/photo-1609137144820-2210a56f7efd?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Madayi+Kavu+Temple,+Pazhayangadi,+Kannur,+Kerala",
        relatedListingId: "ker-01",
        statusBadge: "Sacred Kavu Ritual"
      },
      {
        id: "evt-kannur-02",
        title: "Parassini Madappura Muthappan Vellattam Serenade",
        district: "Kannur",
        state: "Kerala",
        venue: "Parassini Madappura Sree Muthappan Temple, Anthoor, Kannur",
        date: "Daily Morning & Evening",
        time: "5:30 AM \u2013 9:30 AM & 5:00 PM \u2013 8:30 PM IST",
        artForm: "Ritual Performance",
        description: "Traditional folk deity ritual offering Payankutti, roasted fish, and toddy in an egalitarian shrine open to all communities without caste restrictions.",
        image: "https://images.unsplash.com/photo-1599818817639-65126860f38b?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Parassini+Madappura+Muthappan+Temple,+Anthoor,+Kannur,+Kerala",
        relatedListingId: "ker-01",
        statusBadge: "Daily Living Rite"
      },
      {
        id: "evt-kannur-03",
        title: "Kannur Handloom Wooden Pit Loom Weaving Guild Tour",
        district: "Kannur",
        state: "Kerala",
        venue: "Payyambalam Handloom Weavers Cooperative, Kannur",
        date: "Monday to Saturday",
        time: "9:00 AM \u2013 5:00 PM IST",
        artForm: "Handloom & Textile",
        description: "Watch master handloom weavers craft pure cotton textiles, jacquard motifs, and natural dyed furnishings on traditional foot-treadle pit looms.",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Payyambalam,+Kannur,+Kerala",
        relatedListingId: "ker-13",
        statusBadge: "Guild Workshop"
      }
    ],
    Alappuzha: [
      {
        id: "evt-alappuzha-01",
        title: "Aranmula Metal Mirror Guild: Secret Alloy Melting Session",
        district: "Alappuzha",
        state: "Kerala",
        venue: "Aranmula Heritage Craft Quarter, Near Parthasarathy Temple, Aranmula",
        date: "Daily Working Hours",
        time: "10:00 AM \u2013 1:00 PM & 2:30 PM \u2013 5:00 PM IST",
        artForm: "Traditional Craft & Metalwork",
        description: "Witness the rare front-surface reflective bronze metallurgy perfected by a single hereditary artisan family without modern glass backings.",
        image: "https://images.unsplash.com/photo-1584697964190-7bb0db32e65c?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Aranmula+Parthasarathy+Temple,+Aranmula,+Kerala",
        relatedListingId: "ker-05",
        statusBadge: "GI Certified Craft Guild"
      },
      {
        id: "evt-alappuzha-02",
        title: "Chundan Vallam Snake Boat Trial Rowing & Vanchipattu Singing",
        district: "Alappuzha",
        state: "Kerala",
        venue: "Punnamada Lake Finishing Point, Alappuzha",
        date: "Upcoming Saturday & Sunday",
        time: "4:30 PM \u2013 6:45 PM IST",
        artForm: "Traditional Craft & Metalwork",
        description: "110 synchronized oarsmen row 100-foot-long snake boats across the backwaters to rhythmic Vanchipattu chants and cadence whistles.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Punnamada+Finishing+Point,+Alappuzha,+Kerala",
        relatedListingId: "ker-06",
        statusBadge: "Live Backwater Regatta"
      },
      {
        id: "evt-alappuzha-03",
        title: "Traditional Coir Water-Retting & Organic Yarn Spinning Walk",
        district: "Alappuzha",
        state: "Kerala",
        venue: "Kavalam & Muhamma Backwater Canals, Alappuzha",
        date: "Daily Morning Walk",
        time: "8:30 AM \u2013 12:30 PM IST",
        artForm: "Handloom & Textile",
        description: "Learn the ecological six-month bio-retting of coconut husks in tidal saline lagoons and see manual two-ply yarn spinning by coastal women artisans.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kavalam,+Kuttanad,+Alappuzha,+Kerala",
        relatedListingId: "ker-07",
        statusBadge: "Community Village Tour"
      }
    ],
    Kozhikode: [
      {
        id: "evt-kozhikode-01",
        title: "Beypore Uru Shipbuilding: Master Khalasi Wooden Dhow Construction",
        district: "Kozhikode",
        state: "Kerala",
        venue: "Beypore Port River Wharf, Chaliyar Estuary, Kozhikode",
        date: "Monday to Saturday",
        time: "9:00 AM \u2013 5:30 PM IST",
        artForm: "Traditional Craft & Metalwork",
        description: "Observe master shipwrights constructing ocean-going teak dhows up to 200 feet in length entirely by hand without blueprints or CAD designs.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Beypore+Port,+Beypore,+Kozhikode,+Kerala",
        relatedListingId: "ker-08",
        statusBadge: "Maritime Heritage Dock"
      },
      {
        id: "evt-kozhikode-02",
        title: "CVN Kalari: Northern Style Kalaripayattu Combat Showcase",
        district: "Kozhikode",
        state: "Kerala",
        venue: "CVN Kalari Sangham, East Hill, Nadakkavu, Kozhikode",
        date: "Upcoming Morning Practice",
        time: "6:30 AM \u2013 8:45 AM & 5:00 PM \u2013 7:30 PM IST",
        artForm: "Martial Arts & Kalari",
        description: "Ancient martial training inside the red-earth pit: high leaps, Urumi flexible swords, staff sparring, and Ayurvedic Marma healing lore.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=CVN+Kalari,+East+Hill,+Kozhikode,+Kerala",
        relatedListingId: "ker-09",
        statusBadge: "Sacred Pit Demonstration"
      },
      {
        id: "evt-kozhikode-03",
        title: "Thirayattam Ancestral Ethnic Dance Theatre & Fire Torch Dance",
        district: "Kozhikode",
        state: "Kerala",
        venue: "Sree Karinkali Kavu Ancestral Sacred Grove, Feroke, Kozhikode",
        date: "Upcoming Saturday Evening",
        time: "7:30 PM \u2013 11:30 PM IST",
        artForm: "Ritual Performance",
        description: "Ethnic tribal ritual theatre honoring Mother Earth and heroic ancestors with blazing resin fire torches and martial acrobatic leaps.",
        image: "https://images.unsplash.com/photo-1609137144820-2210a56f7efd?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Feroke,+Kozhikode,+Kerala",
        relatedListingId: "ker-12",
        statusBadge: "Sacred Grove Night"
      }
    ],
    Palakkad: [
      {
        id: "evt-palakkad-01",
        title: "Tolpava Koothu: Overnight Ramayana Shadow Leather Puppetry",
        district: "Palakkad",
        state: "Kerala",
        venue: "Kavalappara Koothumadom Screen, Koonathara, Shoranur, Palakkad",
        date: "Upcoming Festival Night",
        time: "9:00 PM \u2013 4:00 AM (Overnight) IST",
        artForm: "Folk Theatre & Puppetry",
        description: "Shadow puppetry performed behind a 42-foot white canvas screen lit by 21 coconut-oil half-shells, narrating ancient Kamba Ramayana verses in Tamil-Malayalam.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Koonathara,+Shoranur,+Palakkad,+Kerala",
        relatedListingId: "ker-11",
        statusBadge: "Shadow Puppet Screen"
      },
      {
        id: "evt-palakkad-02",
        title: "Chembai Carnatic Sangeetholsavam Marathon Sabha",
        district: "Palakkad",
        state: "Kerala",
        venue: "Chembai Village Memorial Hall, Kottayi, Palakkad",
        date: "Upcoming Weekend Afternoon",
        time: "4:30 PM \u2013 9:00 PM IST",
        artForm: "Classical Dance & Theatre",
        description: "Non-stop classical Carnatic music recital where veteran maestris and young prodigies perform without competitive pressure in honor of Chembai Vaidyanatha Bhagavatar.",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chembai+Parameswara+Bhagavatar+Memorial,+Kottayi,+Palakkad,+Kerala",
        relatedListingId: "ker-16",
        statusBadge: "Carnatic Sabha Gathering"
      },
      {
        id: "evt-palakkad-03",
        title: "Kavadiyattam Rhythm & Percussion Procession",
        district: "Palakkad",
        state: "Kerala",
        venue: "Chittur Temple Grounds, Palakkad",
        date: "Upcoming Thaipoosam Cycle",
        time: "3:00 PM \u2013 7:30 PM IST",
        artForm: "Ritual Performance",
        description: "Vibrant ritual dance carrying sculpted peacock and flower kavadis balanced on shoulders, synchronized with Thavil, Chenda, and Nadaswaram crescendos.",
        image: "https://images.unsplash.com/photo-1599818817639-65126860f38b?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Chittur,+Palakkad,+Kerala",
        statusBadge: "Folk Rhythm Gathering"
      }
    ],
    Wayanad: [
      {
        id: "evt-wayanad-01",
        title: "Kurichiya Indigenous Archery & Clan Herbal Medicine Lore",
        district: "Wayanad",
        state: "Kerala",
        venue: "Mananthavady & Thirunelly Clan Foothills, Wayanad",
        date: "Upcoming Saturday Morning",
        time: "9:30 AM \u2013 1:30 PM IST",
        artForm: "Martial Arts & Kalari",
        description: "Traditional bamboo bow and poisoned-tip replica archery demonstrations with tribal herbal medicine identification guided by Kurichiya clan elders.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Thirunelly+Temple,+Wayanad,+Kerala",
        relatedListingId: "ker-17",
        statusBadge: "Indigenous Clan Event"
      },
      {
        id: "evt-wayanad-02",
        title: "Edakkal Neolithic Rock Carvings & Heritage Trail",
        district: "Wayanad",
        state: "Kerala",
        venue: "Edakkal Caves Heritage Footpath, Ambukuthi Hills, Sultan Bathery, Wayanad",
        date: "Daily Morning Cycle",
        time: "8:30 AM \u2013 3:30 PM IST",
        artForm: "Heritage Site",
        description: "Explore Stone Age petroglyphs and human-animal pictorial glyphs carved onto prehistoric split granite rock faces overlooking the Western Ghats.",
        image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Edakkal+Caves,+Nenmeni,+Wayanad,+Kerala",
        statusBadge: "Neolithic Rock Art Walk"
      }
    ],
    Pathanamthitta: [
      {
        id: "evt-pathanamthitta-01",
        title: "Kadammanitta Padayani: Bhairavi Kolam Nocturnal Trance Theatre",
        district: "Pathanamthitta",
        state: "Kerala",
        venue: "Kadammanitta Bhagavathi Temple Yard, Pathanamthitta",
        date: "Upcoming Festival Night",
        time: "9:30 PM \u2013 4:00 AM (Overnight) IST",
        artForm: "Ritual Performance",
        description: "Towering areca-palm leaf masks (Kolams) painted with natural vermilion and charcoal, worn in trance-inducing ritual theatre to the thundering Thappu drums.",
        image: "https://images.unsplash.com/photo-1609137144820-2210a56f7efd?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Kadammanitta+Devi+Temple,+Pathanamthitta,+Kerala",
        relatedListingId: "ker-14",
        statusBadge: "Kolam Mask Ritual"
      },
      {
        id: "evt-pathanamthitta-02",
        title: "Aranmula Valla Sadya & Sacred Backwater Feast",
        district: "Pathanamthitta",
        state: "Kerala",
        venue: "Aranmula Sree Parthasarathy Temple Oottupura, Aranmula, Pathanamthitta",
        date: "Upcoming Festive Day",
        time: "11:30 AM \u2013 2:30 PM IST",
        artForm: "Temple Festival",
        description: "Historic mass feast featuring 64 distinct vegetarian delicacies served on banana leaves, requested by oarsmen through rhythmic poetic songs.",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
        googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Aranmula+Parthasarathy+Temple,+Pathanamthitta,+Kerala",
        relatedListingId: "ker-05",
        statusBadge: "64-Course Feast Experience"
      }
    ]
  };
  const getEventsForDistrict = (district) => {
    if (!district || district === "all") {
      return DISTRICT_UPCOMING_EVENTS["Thrissur"] || [];
    }
    const match = Object.keys(DISTRICT_UPCOMING_EVENTS).find(
      (k) => k.toLowerCase() === district.toLowerCase()
    );
    if (match) {
      return DISTRICT_UPCOMING_EVENTS[match];
    }
    return DISTRICT_UPCOMING_EVENTS["Thrissur"] || [];
  };
  return __toCommonJS(districtEvents_exports);
})();
window.DISTRICT_UPCOMING_EVENTS = M2.DISTRICT_UPCOMING_EVENTS; window.getEventsForDistrict = M2.getEventsForDistrict;
