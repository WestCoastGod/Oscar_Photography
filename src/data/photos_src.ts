const originalPhotos = [
  {
    id: 1,
    src: "/images/photos/頤和園日落.jpg",
    title: "Summer Palace Sunset",desc:"The old kings saw it too."
  },
  {
    id: 2,
    src: "/images/photos/beijing_sky.jpg",
    title: "Beijing Sky",
    desc: "That was a peaceful afternoon in Beijing.",
  },
  {
    id: 3,
    src: "/images/photos/Berlin Tower.JPG",
    title: "Berlin Tower",
    desc: "It saw Berlin being divided into East and West, and reunited.",
  },
  {
    id: 4,
    src: "/images/photos/berlin_riverside.jpg",
    title: "Berlin Riverside",desc:"Imagine you are them and there. Sweet and peaceful.",
  },
  {
    id: 5,
    src: "/images/photos/berlin_stranger.jpg",
    title: "Berlin Pedestrian", desc:"BOOM! Hell yeah!"
  },
  {
    id: 6,
    src: "/images/photos/Berlin_Zoo_Bird.JPG",
    title: "Berlin Zoo Bird",
    desc: "Do you know what is my name?",
  },
  { id: 7, src: "/images/photos/boat.JPG", title: "Boat" , desc:"A rowing boat."},
  {
    id: 8,
    src: "/images/photos/Btyan Steven Monge Serrano.jpg",
    title: "Bryan", desc:"My bestie from Flushing, NYC. 他超棒的！"
  },
  {
    id: 9,
    src: "/images/photos/changbaishan.jpg",
    title: "Changbai Mountain / Paektu Mountain", desc:"Astonishing view."
  },
  {
    id: 10,
    src: "/images/photos/crack_shadow.jpg",
    title: "Crack Shadow", desc:"Time shows on a palace wall."
  },
  {
    id: 11,
    src: "/images/photos/cwc_star.jpg",
    title: "CWC Stars", desc:"Starry starry night."
  },
  {
    id: 12,
    src: "/images/photos/cwc_startrail.jpg",
    title: "CWC Startrail", desc:"Starry starry night. Do not blink your eyes."
  },
  {
    id: 13,
    src: "/images/photos/drink.JPG",
    title: "Drink", desc:"I am not going to tell you that these are ice cubes."
  },
  {
    id: 14,
    src: "/images/photos/Electrical_Scooter.jpg",
    title: "Electrical Scooter", desc:"Visualization of relative motion."
  },
  {
    id: 15,
    src: "/images/photos/fatfat2.jpg",
    title: "Daniel",desc:"He is very handsome (here is star eye emoji)."
  },
  {
    id: 16,
    src: "/images/photos/fengtian.jpg",
    title: "Nathan", desc:"Those with resolve."
  },
  { id: 17, src: "/images/photos/Firework.jpg", title: "Fireworks", desc:"Wowwwww~ But I see more people than fireworks." },
  {
    id: 18,
    src: "/images/photos/forbidden_city_wall.jpg",
    title: "Forbidden City Wall", desc:"Question: How many colors are there?"
  },
  { id: 19, src: "/images/photos/fountain.jpg", title: "Jet d'Eau de Genève", desc:"Pump Pump Pump Pump Pump Pump Pump Pump" },
  { id: 20, src: "/images/photos/geneve_roof.jpg", title: "Geneva Roof", desc:"Salute to Switzerland" },
  { id: 21, src: "/images/photos/Genève.jpg", title: "Geneva", desc:"It's a lake, as beautiful as the sea." },
  {
    id: 23,
    src: "/images/photos/genève_seashore.jpg",
    title: "Summer", desc:""
  },

  { id: 25, src: "/images/photos/Heavy Rain.jpg", title: "Heavy Rain" },
  { id: 26, src: "/images/photos/Island.jpg", title: "Island" },
  {
    id: 27,
    src: "/images/photos/Kasprowy Wierch.jpg",
    title: "Kasprowy Wierch",
  },
  { id: 28, src: "/images/photos/laundry.jpg", title: "Laundry" },
  { id: 29, src: "/images/photos/le tour eiffel.jpg", title: "Le Tour Eiffel" },
  { id: 30, src: "/images/photos/leadtofly_sea.JPG", title: "Lead to Fly Sea" },
  { id: 31, src: "/images/photos/lyon_bird.jpg", title: "Lyon Bird" },
  {
    id: 32,
    src: "/images/photos/lyon_cloud.jpg",
    title: "Lyon Cloud",
  },
  {
    id: 33,
    src: "/images/photos/lyon_early_evening.jpg",
    title: "Lyon Early Evening",
  },
  {
    id: 34,
    src: "/images/photos/lyon_plaza.jpg",
    title: "Lyon Plaza",
  },
  { id: 35, src: "/images/photos/lzh窗景.jpg", title: "LZH Window View" },
  { id: 36, src: "/images/photos/monkey.jpg", title: "Monkey" },
  { id: 37, src: "/images/photos/MOON.jpg", title: "Moon" },
  { id: 38, src: "/images/photos/olympique.jpg", title: "Olympique" },
  { id: 39, src: "/images/photos/paddle.jpg", title: "Paddle" },
  { id: 40, src: "/images/photos/plane_sunset.jpg", title: "Plane Sunset" },
  { id: 41, src: "/images/photos/pontoon.jpg", title: "Pontoon" },
  { id: 42, src: "/images/photos/silence.jpg", title: "Silence" },
  { id: 43, src: "/images/photos/Smile_Baloons.jpg", title: "Smile Balloons" },
  { id: 44, src: "/images/photos/sunset.jpg", title: "Sunset" },
  {
    id: 45,
    src: "/images/photos/temple of heaven.jpg",
    title: "Temple of Heaven",
  },
  { id: 46, src: "/images/photos/tmt_stars.jpg", title: "TMT Stars" },
  { id: 47, src: "/images/photos/top.jpg", title: "Top" },
  { id: 48, src: "/images/photos/Usman.jpg", title: "Usman" },
  { id: 49, src: "/images/photos/八達嶺.jpg", title: "Badaling" },
  {
    id: 50,
    src: "/images/photos/吐露港望大埔.jpg",
    title: "Tolo Harbour View",
  },
  { id: 51, src: "/images/photos/外灘.jpg", title: "The Bund" },
  {
    id: 52,
    src: "/images/photos/大圖路燈下_暖色.jpg",
    title: "Streetlight Warm",
  },
  {
    id: 53,
    src: "/images/photos/天壇牆壁.jpg",
    title: "Temple of Heaven Wall",
  },
  { id: 54, src: "/images/photos/天池.jpg", title: "Heaven Lake" },
  {
    id: 55,
    src: "/images/photos/太和殿.jpg",
    title: "Hall of Supreme Harmony",
  },
  {
    id: 56,
    src: "/images/photos/巷子裡的光-狹縫裡的人.jpg",
    title: "Light in Alley - Him",
  },
  { id: 57, src: "/images/photos/我的眼睛.jpg", title: "My Eyes" },
  { id: 58, src: "/images/photos/故宮貓.jpg", title: "Forbidden City Cat" },
  { id: 59, src: "/images/photos/敬文旁.jpg", title: "Beside Jingwen" },
  { id: 60, src: "/images/photos/昆明湖.jpg", title: "Kunming Lake" },
  { id: 61, src: "/images/photos/景山北.jpg", title: "Jingshan North" },
  { id: 62, src: "/images/photos/月亮.jpg", title: "Moon" },
  {
    id: 63,
    src: "/images/photos/未圓湖的鳥.jpg",
    title: "Bird at Weiyuan Lake",
  },
  {
    id: 64,
    src: "/images/photos/東方明珠塔.jpg",
    title: "Oriental Pearl Tower",
  },
  { id: 65, src: "/images/photos/樓上有人家.jpg", title: "Upstairs Residence" },
  {
    id: 66,
    src: "/images/photos/環回北路夜景.jpg",
    title: "Huanhui North Road Night",
  },
  { id: 67, src: "/images/photos/神武門.jpg", title: "Shenwu Gate" },
  { id: 68, src: "/images/photos/紫荆城.jpg", title: "Forbidden City" },
  { id: 69, src: "/images/photos/脊獸.jpg", title: "Roof Beast" },
  { id: 70, src: "/images/photos/萬春亭.jpg", title: "Wanchun Pavilion" },
  { id: 71, src: "/images/photos/角樓.jpg", title: "Corner Tower" },
  { id: 72, src: "/images/photos/譚仔.jpg", title: "Tam Jai" },
  { id: 73, src: "/images/photos/門縫.jpg", title: "Door Gap" },
  { id: 74, src: "/images/photos/静安寺.JPG", title: "Jing'an Temple" },
  {
    id: 75,
    src: "/images/photos/athony.jpg",
    title: "Athony", desc: "雄爺"
  },
  { id: 76, src: "/images/photos/鴨子與落日.jpg", title: "Duck and Sunset" },
  { id: 77, src: "/images/photos/鸽子.jpg", title: "Pigeon" },
  { id: 78, src: "/images/photos/鼓樓大街.jpg", title: "Drum Tower Street" },
  { id: 79, src: "/images/photos/SLEEP_LOVE.jpg", title: "Sleep Love" },
];

export default originalPhotos;