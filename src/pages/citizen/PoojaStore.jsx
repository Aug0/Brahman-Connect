import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PoojaStore = () => {
    const navigate = useNavigate();

    const storeData = {
        name: "Mahakaal Pooja Samagri Store",
        location: "https://maps.app.goo.gl/PUakcMnc4Dzr3SWv6 ",
        image: "/assets/Store.png",
        description: [
            "Our Pooja Samagri Store is one stop solution for all your Puja Samagri needs for",
            "more than 20 Years. deals in wide range of Pooja essentials like all types of Yantras,",
            "Japmalas, Murtis, Devotional Photo Frame, Incense and Dhoop Sticks, Daily Pooja",
            "Needs, Hawan Samagri, Marriage and Shradhh items etc .",
        ],
        items: [
            {
                name: "New Brass Puja Thali Set (22 items)",
                price: "₹855.00INR",
                image: "/assets/Neev Brass Pooja.png",
            },
            {
                name: "Hand painted diyas (Pack of 12)",
                price: "₹640.00INR",
                image: "/assets/Hand Painted.png",
            },
            {
                name: "Raksha Sutra (8mtrs)",
                price: "₹120.00INR",
                image: "/assets/Raksha Sutra.png",
            },
            {
                name: "Hand painted diyas (Pack of 5+1)",
                price: "₹ N/A",
                image: "/assets/Hand Painted Dyais.png",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#F8F4EA] text-gray-800">          

            {/* Main Content */}
            <div className="max-w-6xl mx-auto mt-6 p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-gray-500 mb-4 hover:underline"
                >
                    ← Back
                </button>
                <div className="bg-white rounded-xl p-6 shadow border border-[#e4e4e7] flex flex-col lg:flex-row lg:gap-4 gap-4">
                    {/* Left Side */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold text-center">{storeData.name}</h2>
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center text-blue-600 text-sm underline break-all">
                                <MapPin className="w-4 h-4 mr-1 text-orange-600" />
                                <a
                                    href={storeData.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {storeData.location}
                                </a>
                            </div>
                            <div className="text-base leading-snug space-y-1 w-full max-w-[680px]">
                                {storeData.description.map((line, idx) => (
                                    <p key={idx} className="text-left">{line}</p>
                                ))}
                            </div>
                            <img
                                src={storeData.image}
                                alt="Store Front"
                                className="rounded-md border border-[#e4e4e7] w-[520px] h-[260px] object-cover"
                            />
                            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: "#D75A28",
                                        color: "#D75A28",
                                        textTransform: "uppercase",
                                        borderRadius: "7px",
                                        px: 1.5,
                                        py: 0.2,
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        fontFamily: "inherit",
                                        minWidth: "110px",
                                        minHeight: "30px",
                                        "&:hover": {
                                            borderColor: "#D75A28",
                                            color: "#D75A28",        
                                            backgroundColor: "transparent", 
                                        },
                                    }}
                                >
                                    CALL STORE
                                </Button>


                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#D75A28",
                                        color: "#fff",
                                        textTransform: "uppercase",
                                        borderRadius: "7px",
                                        px: 1.5,
                                        py: 0.2,
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        fontFamily: "inherit",
                                        minWidth: "110px",
                                        "&:hover": { backgroundColor: "#c24e1f" },
                                    }}
                                >
                                    ENQUIRY
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-[330px]">
                        <div className="p-0">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h3 className="text-xl font-semibold">Our Items</h3>
                                <span className="text-sm">Count: {storeData.items.length}</span>
                            </div>
                            <div className="space-y-4">
                                {storeData.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 border border-[#D75A28] rounded-xl p-3"
                                    >
                                        {/* Item Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        {/* Item Info */}
                                        <div className="flex-1 flex flex-col text-sm">
                                            <p className="font-medium text-gray-800 leading-snug">
                                                {item.name}
                                            </p>
                                            <span className="text-black font-semibold text-sm mt-1">
                                                {item.price}
                                            </span>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: "#D75A28",
                                                    fontSize: "0.7rem",
                                                    fontFamily: "inherit",
                                                    fontWeight: 600,
                                                    width: "fit-content",
                                                    mt: 1,
                                                    px: 1.5,
                                                    py: 0.2,
                                                    height: 24,
                                                    lineHeight: 1,
                                                    textTransform: "uppercase",
                                                    "&:hover": { backgroundColor: "#c24e1f" },
                                                }}
                                            >
                                                ADD TO CART
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoojaStore;