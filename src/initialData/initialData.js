import Property from "../models/Property.js";
// import getDate from "../utils/getDate.js";

let id = 1;
let nextUserId = 1;

const createData = () => {
  let propertiesArr = [
    new Property(
      id++,
      "Greg Long Conquers Giant Wave",
      300,
      `In this awe-inspiring photo, big wave surfer Greg Long is seen riding a massive wave in what appears to be a moment of pure triumph. The scale of the wave is breathtaking, with the sheer force of the water visible in the towering wall of spray and the roiling mass of white water behind Long. Despite the immense challenge of the wave, Long looks completely at ease and in control, perfectly balanced on his board and showing off his exceptional skill and athleticism. This photo captures the raw power and beauty of surfing at its most extreme, and is sure to inspire anyone who loves the thrill of the ocean.`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzMzA1NDcwMjU2/greg-long.webp",
      "shuki nagar"
    ),
    new Property(
      id++,
      'Grant "Twiggy" Baker Takes on a Heavy Wave',
      400,
      `In this gripping photo, professional surfer Grant "Twiggy" Baker is seen charging down the face of a massive wave with incredible speed and precision. The wave is so large that the bottom appears to be falling away, creating a sense of vertigo-inducing depth and power. Despite the danger and difficulty of the wave, Baker looks completely focused and in control, his concentration evident in the set of his shoulders and the determination in his gaze. This photo captures the intensity and excitement of big wave surfing, and showcases the skill and bravery of one of the sport's top competitors.

`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzNTczMTg0ODE2/grant-twiggy--bake.webp",
      "shuki nagar"
    ),
    new Property(
      id++,
      "Surfer Conquering a Massive Wave",
      350,
      `This incredible photo captures a lone surfer standing confidently behind an enormous wave, ready to take on the challenge. The scale of the wave is stunning, with its towering height and deep blue color creating a sense of awe and wonder. Despite the danger and difficulty of the wave, the surfer appears calm and focused, their eyes fixed on the horizon as they prepare to ride the wave with skill and precision. This photo showcases the courage and determination required to tackle the biggest waves, as well as the raw power and beauty of the ocean.`,
      "https://www.theleader.com.au/images/transform/v1/crop/frm/GJZ5TVpAk84wrTzsQfLQRB/d07c6b07-7d4f-48c4-a44e-fe4b27aa12df.jpg/r46_0_2434_1592_w2480_h1653_fmax.jpg",
      "shuki nagar"
    ),
  ];
  return propertiesArr;
};

const setInitialData = () => {
  let properties = localStorage.getItem("props");
  if (properties) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("nextid", id + "");
  localStorage.setItem("nextUserId", nextUserId + "");
};

setInitialData();
