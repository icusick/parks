import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import NavBar from './nav';
import _ from 'lodash'; 
import ScrollToTop from 'react-scroll-up';

const randomNumber = _.sample([0,1,2]);
// const style = {
//     position: 'fixed',
//   bottom: 50,
//   right: 30
// }

export const ParkAPI = {
  parks: [
    { id: 1, name: "Acadia", parkCode: "acad", images: ["../images/acadia_2.jpg", "../images/acadia_3.jpg", "../images/acadia_4.jpg", "../images/acadia_5.jpg", "../images/acadia_6.jpg", "../images/acadia_7.jpg"]},
    { id: 2, name: "Yosemite", parkCode: "yose", images: ["../images/yosemite1.jpg", "../images/yosemite2.jpg", "../images/yosemite3.jpg"]},
    { id: 3, name: "Yellowstone", parkCode: "yell", images: ["../images/yellowstone1.jpg", "../images/yellowstone5.jpg", "../images/yellowstone2.jpg"] },
    { id: 4, name: "Grand Tetons", parkCode: "grte", images: ["../images/grand_tetons1.jpg", "../images/grand_tetons_3.jpg", "../images/grand_tetons_4.kpj.jpg", "../images/grand_tetons_5.jpg.jpg", "../images/grand_tetons_6.jpg"] },
    { id: 5, name: "Grand Canyon", parkCode: "grca", images: ["../images/grand_canyon_1.jpg", "../images/grand_canyon_2.jpg", "../images/grand_canyon_3.jpg", "../images/grand_canyon_4.jpg", "../images/grand_canyon_5.jpg"] },
    { id: 6, name: "Mesa Verde", parkCode: "meve", images: ["../images/mesa1.jpg", "../images/mesa3.jpg", "../images/mesa2.jpg"] }, 
    { id: 7, name: "Arches", parkCode: "Arch", images: ["../images/arches1.jpg", "../images/arches2.jpg", "../images/arches3.jpg", "../images/arches4.jpg"]},
    { id: 8, name: "Badlands", parkCode: "badl", images: ["../images/badlands1.jpg", "../images/badlands2.jpg", "../images/badlands3.jpg"]},
    { id: 9, name: "Big Bend", parkCode: "bibe", images: ["../images/bend1.jpg", "../images/bend2.jpg", "../images/bend3.jpg"]},
    { id: 10, name: "Biscayne", parkCode: "bisc", images: ["../images/biscanye_1.jpg", "../images/biscanye2.jpg", "../images/biscanye3.jpg"]},
    { id: 11, name: "Black Canyon Of The Gunnison", parkCode: "blca", images: ["../images/gunnison_1.jpg", "../images/gunnison2.jpg", "../images/gunnison3.jpg"]},
    { id: 12, name: "Bryce Canyon", parkCode: "brca", images: ["../images/bryce_canyon_1.jpg", "../images/bryce2.jpg", "../images/bryce3.jpg"]},
    { id: 13, name: "Canyonlands", parkCode: "cany", images: ["../images/canyon_lands_2.jpg", "../images/canyonlands1.jpg", "../images/canyonlands3.jpg", "../images/canyonlands2.jpg"]},
    { id: 14, name: "Capitol Reef", parkCode: "care", images: ["../images/capitol_reef_1.jpg", "../images/capitol_reef2.jpg", "../images/capitol_reef3.jpg"]},
    { id: 15, name: "Carlsbad Caverns", parkCode: "cave", images: ["../images/carlsbad_caverns_1.jpg", "../images/carlsbad2.jpg", "../images/carlsbad3.jpg"]},
    { id: 16, name: "Channel Islands", parkCode: "chis", images: ["../images/channel_islands_1.jpg", "../images/channel_islands_2.jpg", "../images/channel1.jpg", "../images/channel2.jpg", "../images/channel3.jpg"]},
    { id: 17, name: "Congaree", parkCode: "cong", images: ["../images/congaree_1.jpg", "../images/congaree_2.jpg", "../images/congaree2.jpg", "../images/congaree3.jpg"]},
    { id: 18, name: "Crater Lake", parkCode: "crla", images: ["../images/crater_lake_1.png", "../images/crater2.jpg", "../images/crater3.jpg"]},
    { id: 19, name: "Cuyahoga Valley", parkCode: "cuva", images: ["../images/cuyahoga_valley_1.jpg", "../images/cuyahoga2.jpg", "../images/cuyahoga3.png"]},
    { id: 20, name: "Death Valley", parkCode: "deva", images: ["../images/death_valley_1.jpg", "../images/death2.jpg", "../images/death3.jpg"]},
    { id: 21, name: "Dry Tortugas", parkCode: "drto", images: ["../images/dry_tortugas_1.jpeg", "../images/dry2.jpg", "../images/dry3.jpg"]},
    { id: 22, name: "Everglades", parkCode: "ever", images: ["../images/everglades_1.jpg", "../images/everglades2.jpg", "../images/everglades3.jpg"]},
    { id: 23, name: "Glacier", parkCode: "glac", images: ["../images/glacier_1.jpg", "../images/glacier2.jpg", "../images/glacier3.jpg"]},
    { id: 24, name: "Great Basin", parkCode: "grba", images: ["../images/great_basin_1.jpeg", "../images/gbasin2.jpg", "../images/gbasin3.jpg"]},
    { id: 25, name: "Great Sand Dunes", parkCode: "grsa", images: ["../images/great_sand_dunes_1.jpg", "../images/gsand_dunes2.jpg", "../images/gsand_dunes3.jpg"]},
    { id: 26, name: "Great Smokey Mountains", parkCode: "grsm", images: ["../images/great_smokey_mt_1.jpg", "../images/gsmoky_mountain2.jpg", "../images/gsmoky_mountain3.jpg"]},
    { id: 27, name: "Guadalupe Mountains", parkCode: "gumo", images: ["../images/guadalupe_1.jpg", "../images/guadalupe2.jpg", "../images/guadalupe3.jpg"]},
    { id: 28, name: "Haleakala", parkCode: "hale", images: ["../images/haleakala_1.jpg", "../images/haleakala_2.jpg", "../images/haleakala_3.jpg"]},
    { id: 29, name: "Hawaii Volcanoes", parkCode: "havo", images: ["../images/hawaii_volcanoes_1.jpg", "../images/hawaii_2.jpg", "../images/hawaii_3.jpg"]},
    { id: 30, name: "Hot Springs", parkCode: "hosp", images: ["../images/hot_springs_1.jpg", "../images/hot_springs2.jpg", "../images/hot_springs3.jpg"]},
    { id: 31, name: "Isle Royale", parkCode: "isro", images: ["../images/isle_royale_1.jpg", "../images/isle2.jpg", "../images/isle3.jpg"]},
    { id: 32, name: "Joshua Tree", parkCode: "jotr", images: ["../images/joshua_tree_1.jpg", "../images/joshua2.jpg", "../images/joshua3.jpg"]},
    { id: 33, name: "Kenai Fjords", parkCode: "kefj", images: ["../images/kenai_fjords_1.jpg", "../images/kenai2.jpg", "../images/kenai3.jpg"]},
    { id: 34, name: "Kobuk Valley", parkCode: "kova", images: ["../images/kobuk_valley_1.jpg", "../images/kobuk2.jpg", "../images/kobuk3.jpg"]},
    { id: 35, name: "Lake Clark", parkCode: "lacl", images: ["../images/lake_clark_1.jpeg", "../images/lake_clark2.jpg", "../images/lake_clark3.jpg"]},
    { id: 36, name: "Lassen Volcanic", parkCode: "lavo", images: ["../images/lassen_1.jpg", "../images/lassen_2.jpg", "../images/lassen_3.jpg"]},
    { id: 37, name: "Mammoth Cave", parkCode: "maca", images: ["../images/mammoth_1.jpg", "../images/mammoth_2.jpg", "../images/mammoth_3.jpg"]},
    { id: 38, name: "Mount Rainier", parkCode: "mora", images: ["../images/rainier_1.jpg", "../images/rainier_2.jpg", "../images/rainier_3.jpg"]},
    { id: 39, name: "North Cascades", parkCode: "noca", images: ["../images/north_1.jpg", "../images/north_2.jpg", "../images/north_3.jpg"]},
    { id: 40, name: "Olympic", parkCode: "olym", images: ["../images/olympic_1.jpg", "../images/olympic_2.jpg", "../images/olympic_3.jpg"]},
    { id: 41, name: "Petrified Forest", parkCode: "pefo", images: ["../images/petrified_forest_1.jpg", "../images/petrified_2.jpg", "../images/petrified_3.jpg"]},
    { id: 42, name: "Pinnacles", parkCode: "pinn", images: ["../images/pinnacles_1.jpeg", "../images/pinnacles_2.jpg", "../images/pinnacles_3.jpg"]},
    { id: 43, name: "Redwood", parkCode: "redw", images: ["../images/redwood_1.jpg", "../images/redwood_2.jpg", "../images/redwood_3.jpg"]},
    { id: 44, name: "Rocky Mountain", parkCode: "romo", images: ["../images/rocky_mountain_1.jpg", "../images/rocky_mountain_2.jpg", "../images/rocky_mountain_3.jpg"]},
    { id: 45, name: "Saguaro", parkCode: "sagu", images: ["../images/saguaro_1.jpg", "../images/saguaro_2.jpg", "../images/saguaro_3.jpg"]},
    { id: 46, name: "Sequoia & Kings Canyon", parkCode: "seki", images: ["../images/sequoia_1.jpg", "../images/sequoia_2.jpg", "../images/sequoia_3.jpg"]},
    { id: 47, name: "Shenandoah", parkCode: "shen", images: ["../images/shenandoah_1.jpg", "../images/shenandoah_2.jpg", "../images/shenandoah_3.png"]},
    { id: 48, name: "Theodore Roosevelt", parkCode: "thro", images: ["../images/teddy_1.jpg", "../images/teddy_2.jpg", "../images/teddy_3.jpg"]},
    { id: 49, name: "Virgin Islands", parkCode: "viis", images: ["../images/vi_1.jpg", "../images/vi_2.jpg", "../images/vi_3.jpg"]},
    { id: 50, name: "Voyageurs", parkCode: "voya", images: ["../images/voyageurs_1.jpg", "../images/voyageurs_2.jpg", "../images/voyageurs_3.jpg"]},
    { id: 51, name: "Wind Cave", parkCode: "wica", images: ["../images/wind_save_1.jpg", "../images/wind_cave_2.jpg", "../images/wind_cave_3.jpg"]},
    { id: 52, name: "Wrangell- St. Elias", parkCode: "wrst", images: ["../images/wrangel_1.jpg", "../images/wrangell_2.jpg", "../images/wrangell_3.jpg"]},
    { id: 53, name: "Zion", parkCode: "zion", images: ["../images/zion_1.jpg", "../images/zion_2.jpg", "../images/zion_3.jpg", "../images/zion_4.jpg", "../images/zion_5.jpg"]},
  ],
  all: function() { return this.parks},
  get: function(id) {
    const isPark = p => p.id === id
    return this.parks.find(isPark)
  }
}

class ParksIndex extends Component { 
  render() {
    return (
      <div>        
            <NavBar />
            {
            ParkAPI.all().map(p => (
              <div className="img_wrap"><Link to={`/parks/${p.id}`}>                
                    <img className="img-thumbnail ind-img col-md-4 thumb" src={p.images[randomNumber]}></img>
                    <p className="img_description">{p.title}</p>               
              </Link></div>
              ))
            }
            <ScrollToTop showUnder={160}>
  <img src="../images/arrow_top.png" className="back-to-top"></img>
</ScrollToTop>
      </div>
    )
  }
}

export default ParksIndex;

