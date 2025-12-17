interface VideoData {
    id: number;
    videoUrl: string;
    heading: string;
    description: string;
    buttons: { text: string; link: string }[];
}

const heroVideosData: VideoData[] = [
    {
    id: 1,
    videoUrl: '/videos/quantum.mp4',
    heading: "Quantum Earbuds",
    description: "Immerse yourself in a new sensation of Spatial Audio Beats with Fawad Khan’s Quantum Earbuds. Equipped with ANC Technology, Quad Mic ENC, and Instant Pairing, the Quantum Earbuds offer a 70-hour battery life. Designed with a two-toned gradient Flybird Design, these earbuds enhance every decibel, delivering crystal clear audio quality for an unmatched listening experience.",
    buttons: [{
        text: "Shop Now",
        link: "/products/quantum-earbuds"
    }]
    },
    {
    id: 2,
    videoUrl: '/videos/arcade800.mp4',
    heading: "Arcade 800 Earbuds",
    description: "Pakistan’s First Gaming Earbuds, making it the ultimate wireless companion for every gamer. Powered with 40M/S Hyper Low Latency, RGB Case & Buds along with 50 Hour Standby Playback time, the Arcade Series is your gaming studio in your pocket.",
    buttons: [{
        text: "Shop Now",
        link: "/products/arcade-800"
    }]
    },{
    id: 3,
    videoUrl: '/videos/zbuds.mp4',
    heading: "Zero Earbuds",
    description: "Introducing Z-Buds: the groundbreaking fashion tech accessory that redefines your audio experience.",
    buttons: [{
        text: "View All Zero Earbuds",
        link: "/collections/earbuds-zbuds"
    }]
    },
]

export default heroVideosData;