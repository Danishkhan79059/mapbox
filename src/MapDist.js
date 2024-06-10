import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "mapbox-gl";

const MapDist = () => {
  const mapContainerRef = useRef(null);
  const popup = new Popup();

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoia2hhbmRhbmlzaCIsImEiOiJjbHVqYmJ0cmkwZGVxMnBwaHlrbWF6cG8xIn0.YNX48zrv4Gim-H2GmoZqPA";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/khandanish/clvam8pkn00rj01qp374q8pex",
      center: [78.9629, 23.5937],
      zoom: 4,
    });

    map.addControl(new FullscreenControl(), "top-left");
    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    map.addControl(new NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "top-left");

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.setFog({});

      fetch("./indiandistrict.geojson")
        .then((response) => response.json())
        .then((data) => {
          map.addSource("districts", {
            type: "geojson",
            data,
          });

          map.addLayer({
            id: "districts-layer",
            type: "fill",
            source: "districts",
            layout: {},
            paint: {
              "fill-color": [
                "match",
                ["get", "NAME_2"],
                // Add specific colors for each district in Uttar Pradesh
                "Agra", "#e6194b",
                "Aligarh", "#3cb44b",
                "Allahabad", "#ffe119",
                "Ambedkar Nagar", "#4363d8",
                "Amethi", "#f58231",
                "Amroha", "#911eb4",
                "Auraiya", "#46f0f0",
                "Azamgarh", "#f032e6",
                "Baghpat", "#bcf60c",
                "Bahraich", "#fabebe",
                "Ballia", "#008080",
                "Balrampur", "#e6beff",
                "Banda", "#9a6324",
                "Barabanki", "#fffac8",
                "Bareilly", "#800000",
                "Basti", "#aaffc3",
                "Bhadohi", "#808000",
                "Bijnor", "#ffd8b1",
                "Budaun", "#000075",
                "Bulandshahr", "#808080",
                "Chandauli", "#e6194b",
                "Chitrakoot", "#3cb44b",
                "Deoria", "#ffe119",
                "Etah", "#4363d8",
                "Etawah", "#f58231",
                "Ayodhya", "#911eb4",
                "Farrukhabad", "#46f0f0",
                "Fatehpur", "#f032e6",
                "Firozabad", "#bcf60c",
                "Gautam Buddh Nagar", "#fabebe",
                "Ghaziabad", "#008080",
                "Ghazipur", "#e6beff",
                "Gonda", "#9a6324",
                "Gorakhpur", "#fffac8",
                "Hamirpur", "#800000",
                "Hapur", "#aaffc3",
                "Hardoi", "#808000",
                "Hathras", "#ffd8b1",
                "Jalaun", "#000075",
                "Jaunpur", "#808080",
                "Jhansi", "#e6194b",
                "Kannauj", "#3cb44b",
                "Kanpur Dehat", "#ffe119",
                "Kanpur Nagar", "#4363d8",
                "Kasganj", "#f58231",
                "Kaushambi", "#911eb4",
                "Kushinagar", "#46f0f0",
                "Lakhimpur Kheri", "#f032e6",
                "Lalitpur", "#bcf60c",
                "Lucknow", "#fabebe",
                "Maharajganj", "#008080",
                "Mahoba", "#e6beff",
                "Mainpuri", "#9a6324",
                "Mathura", "#fffac8",
                "Mau", "#800000",
                "Meerut", "#aaffc3",
                "Mirzapur", "#808000",
                "Moradabad", "#ffd8b1",
                "Muzaffarnagar", "#000075",
                "Pilibhit", "#808080",
                "Pratapgarh", "#e6194b",
                "Raebareli", "#3cb44b",
                "Rampur", "#ffe119",
                "Saharanpur", "#4363d8",
                "Sambhal", "#f58231",
                "Sant Kabir Nagar", "#911eb4",
                "Shahjahanpur", "#46f0f0",
                "Shamli", "#f032e6",
                "Shrawasti", "#bcf60c",
                "Siddharthnagar", "#fabebe",
                "Sitapur", "#008080",
                "Sonbhadra", "#e6beff",
                "Sultanpur", "#9a6324",
                "Unnao", "#fffac8",
                "Varanasi", "#800000",
                "Araria", "#4363d8",
                "Arwal", "#f58231",
                "Aurangabad", "#911eb4",
                "Banka", "#46f0f0",
                "Begusarai", "#f032e6",
                "Bhagalpur", "#bcf60c",
                "Bhojpur", "#fabebe",
                "Buxar", "#008080",
                "Darbhanga", "#e6beff",
                "East Champaran", "#9a6324",
                "Gaya", "#fffac8",
                "Gopalganj", "#800000",
                "Jamui", "#aaffc3",
                "Jehanabad", "#808000",
                "Kaimur", "#ffd8b1",
                "Katihar", "#000075",
                "Khagaria", "#808080",
                "Kishanganj", "#e6194b",
                "Lakhisarai", "#3cb44b",
                "Madhepura", "#ffe119",
                "Madhubani", "#4363d8",
                "Munger", "#f58231",
                "Muzaffarpur", "#911eb4",
                "Nalanda", "#46f0f0",
                "Nawada", "#f032e6",
                "Patna", "#bcf60c",
                "Purnia", "#fabebe",
                "Rohtas", "#008080",
                "Saharsa", "#e6beff",
                "Samastipur", "#9a6324",
                "Saran", "#fffac8",
                "Sheikhpura", "#800000",
                "Sheohar", "#aaffc3",
                "Sitamarhi", "#808000",
                "Siwan", "#ffd8b1",
                "Supaul", "#000075",
                "Vaishali", "#808080",
                "West Champaran", "#e6194b",
                "Ahmedabad", "#e6194b",
                "Amreli", "#3cb44b",
                "Anand", "#ffe119",
                "Aravalli", "#4363d8",
                "Banaskantha", "#f58231",
                "Bharuch", "#911eb4",
                "Bhavnagar", "#46f0f0",
                "Botad", "#f032e6",
                "Chhota Udaipur", "#bcf60c",
                "Dahod", "#fabebe",
                "Dang", "#008080",
                "Devbhoomi Dwarka", "#e6beff",
                "Gandhinagar", "#9a6324",
                "Gir Somnath", "#fffac8",
                "Jamnagar", "#800000",
                "Junagadh", "#aaffc3",
                "Kheda", "#808000",
                "Kutch", "#ffd8b1",
                "Mahisagar", "#000075",
                "Mehsana", "#808080",
                "Morbi", "#e6194b",
                "Narmada", "#3cb44b",
                "Navsari", "#ffe119",
                "Panchmahal", "#4363d8",
                "Patan", "#f58231",
                "Porbandar", "#911eb4",
                "Rajkot", "#46f0f0",
                "Sabarkantha", "#f032e6",
                "Surat", "#bcf60c",
                "Surendranagar", "#fabebe",
                "Tapi", "#008080",
                "Vadodara", "#e6beff",
                "Valsad", "#9a6324",
                "Baksa", "#e6194b",
                "Barpeta", "#3cb44b",
                "Biswanath", "#ffe119",
                "Bongaigaon", "#4363d8",
                "Cachar", "#f58231",
                "Charaideo", "#911eb4",
                "Chirang", "#46f0f0",
                "Darrang", "#f032e6",
                "Dhemaji", "#bcf60c",
                "Dhubri", "#fabebe",
                "Dibrugarh", "#008080",
                "Dima Hasao", "#e6beff",
                "Goalpara", "#9a6324",
                "Golaghat", "#fffac8",
                "Hailakandi", "#800000",
                "Hojai", "#aaffc3",
                "Jorhat", "#808000",
                "Kamrup", "#ffd8b1",
                "Kamrup Metropolitan", "#000075",
                "Karbi Anglong", "#808080",
                "Karimganj", "#e6194b",
                "Kokrajhar", "#3cb44b",
                "Lakhimpur", "#ffe119",
                "Majuli", "#4363d8",
                "Morigaon", "#f58231",
                "Nagaon", "#911eb4",
                "Nalbari", "#46f0f0",
                "Sivasagar", "#f032e6",
                "Sonitpur", "#bcf60c",
                "South Salmara-Mankachar", "#fabebe",
                "Tinsukia", "#008080",
                "Udalguri", "#e6beff",
                "West Karbi Anglong", "#9a6324",
                "Bengaluru Urban", "#e6194b",
                "Bengaluru Rural", "#3cb44b",
                // Add more districts and colors as needed for Uttar Pradesh
                // Default color
                "#aaaaaa",
              ],
              "fill-opacity": 0.7,
            },
          });

          map.on("mouseenter", "districts-layer", (e) => {
            map.getCanvas().style.cursor = "pointer";
            const districtName = e.features[0].properties.NAME_2;
            popup.setLngLat(e.lngLat).setHTML(districtName).addTo(map);
          });

          map.on("mouseleave", "districts-layer", () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });
        })
        .catch((error) => console.error("Error fetching GeoJSON:", error));
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      })
    );

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ height: "100vh", width: "100%" }} />;
};

export default MapDist;